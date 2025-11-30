const express = require("express");
const router = express.Router();   // ✅ THIS WAS MISSING
const auth = require("../middleware/auth.middleware");
const QuizResult = require("../models/quizResult.model");
const User = require("../models/user.model");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("username");
    const results = await QuizResult.find({ user: req.user.userId });

    let totalScore = 0;
    let totalQuestions = 0;
    const topicMap = {};

    results.forEach(r => {
      totalScore += r.score;
      totalQuestions += r.total;

      if (!topicMap[r.topicId]) {
        topicMap[r.topicId] = {
          attempts: 0,
          totalScore: 0,
          totalQuestions: 0
        };
      }

      topicMap[r.topicId].attempts++;
      topicMap[r.topicId].totalScore += r.score;
      topicMap[r.topicId].totalQuestions += r.total;
    });

    const attemptedTopics = Object.entries(topicMap).map(([topicId, data]) => {
      const percent = Math.round(
        (data.totalScore / data.totalQuestions) * 100
      );

      return {
        id: topicId,
        title: topicId.replace(/-/g, " "),
        score: percent,
        attempts: data.attempts,
        weak: percent < 75
      };
    });

    const weakAreas = attemptedTopics
      .filter(t => t.weak)
      .map(t => t.id);

    const accuracy = totalQuestions
      ? Math.round((totalScore / totalQuestions) * 100)
      : 0;

    res.json({
      name: user?.username || "User",
      totalScore,
      topicsStudied: attemptedTopics.length,
      quizzesTaken: results.length,
      streak: 1,
      accuracy,
      weakAreas,
      attemptedTopics
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard load failed" });
  }
});

module.exports = router;   // ✅ ALSO REQUIRED
