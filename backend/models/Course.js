// models/Course.js
const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  attachments: { type: [String] }, // Array to hold URLs or file paths of attachments
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topics: [TopicSchema], // Embed topics within chapters
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxLength: 2000 },
  category: { type: String, required: true },
  level: { type: String },
  duration: { type: String }, // e.g., "4 weeks"
  chapters: [ChapterSchema], // Embed chapters within courses
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  faq: { type: [String] }, // Array of FAQs
});

module.exports = mongoose.model('Course', CourseSchema);
