const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
  comments: [
    {
      user: String,
      comment: String,
      replies: [{ user: String, reply: String }],
      likes: { type: Number, default: 0 },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);
