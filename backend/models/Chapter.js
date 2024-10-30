const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);
