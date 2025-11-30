const QuizResult = require("../models/quizResult.model");
const { questionsStore, userStats } = require("../quizStore");

exports.submitQuiz = async (req, res) => {
  try {
    const { topicId, answers } = req.body;
    const userId = req.user?.userId || 'anonymous';

    const questions = questionsStore[topicId];
    if (!questions) return res.status(400).json({ error: 'No questions found' });

    let correct = 0;
    const wrongSubtopics = {};

    answers.forEach(ans => {
      const q = questions.find(qq => qq.id === ans.questionId);
      if (!q) return;

      let isCorrect = false;

      if (q.type === 'mcq') {
        isCorrect = ans.selected === q.correctIndex;
      } else if (q.type === 'fill') {
        const given = String(ans.selected || '').trim().toLowerCase();
        const expectedArray = Array.isArray(q.answer)
          ? q.answer.map(a => String(a).trim().toLowerCase())
          : [String(q.answer).trim().toLowerCase()];
        isCorrect = expectedArray.includes(given);
      }

      if (isCorrect) {
        correct++;
      } else if (q.subtopicKey) {
        wrongSubtopics[q.subtopicKey] = (wrongSubtopics[q.subtopicKey] || 0) + 1;
      }
    });

    const weakAreas = Object.keys(wrongSubtopics);

    const resultDoc = await QuizResult.create({
      user: userId,
      topicId,
      score: correct,
      total: questions.length,
      weakAreas
    });

    // Update in-memory stats similar to server.js logic
    const statsKey = `${userId}_${topicId}`;
    const prevStats = userStats[statsKey] || { correct: 0, total: 0, weakAreas: [], subtopicStats: {} };

    userStats[statsKey] = {
      correct: prevStats.correct + correct,
      total: prevStats.total + questions.length,
      weakAreas: weakAreas.length ? weakAreas : prevStats.weakAreas,
      subtopicStats: {
        ...(prevStats.subtopicStats || {}),
        ...Object.fromEntries(
          Object.entries(wrongSubtopics).map(([key, value]) => {
            const prev = (prevStats.subtopicStats || {})[key] || { wrong: 0, seen: 0 };
            return [key, {
              wrong: prev.wrong + value,
              seen: prev.seen + value
            }];
          })
        )
      }
    };

    res.json({
      success: true,
      score: correct,
      total: questions.length,
      weakAreas,
      suggestions: weakAreas.map(w => `Review subtopic: ${w}`),
      result: resultDoc
    });

  } catch (err) {
    console.error("Quiz Submit Error:", err);
    res.status(500).json({ message: "Quiz saving failed" });
  }
};
