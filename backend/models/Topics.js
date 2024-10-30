const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  attachments: [{ type: String }], // Array of attachment URLs
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
