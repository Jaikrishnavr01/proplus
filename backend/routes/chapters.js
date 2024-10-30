const express = require('express');
const Chapter = require('../models/Chapter');
const router = express.Router();

// Create a new chapter
router.post('/', async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all chapters for a course
router.get('/:courseId', async (req, res) => {
  const chapters = await Chapter.find({ courseId: req.params.courseId });
  res.json(chapters);
});

module.exports = router;
