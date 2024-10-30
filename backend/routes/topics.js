const express = require('express');
const Topic = require('../models/Topics');
const router = express.Router();

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all topics for a chapter
router.get('/:chapterId', async (req, res) => {
  const topics = await Topic.find({ chapterId: req.params.chapterId });
  res.json(topics);
});

module.exports = router;
