const mongoose = require('mongoose');

// Mini timeline for subtopics (no detail field, just year + label)
const subtopicTimelineEventSchema = new mongoose.Schema({
  year: String,
  label: String
});

const subtopicSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,

  // NEW: per-subtopic teaching helpers
  realWorldAnalogy: String,  // short HTML/text for that specific subtopic
  memoryHooks: [String],     // array of short phrases for that subtopic
  timeline: [subtopicTimelineEventSchema] // 0–3 simple { year, label }
});

const timelineEventSchema = new mongoose.Schema({
  year: String,
  label: String,
  detail: String
});

const figureSchema = new mongoose.Schema({
  name: String,
  role: String,
  note: String
});

const topicSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  description: String,
  html: String,
  subtopics: [subtopicSchema],
  keyPoints: [String],

  // Existing topic-level fields
  realWorldAnalogy: String,       // brief HTML/text
  discoveryTimeline: [timelineEventSchema],
  importantFigures: [figureSchema],
  memoryHooks: [String]           // these will be rendered in italics
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
