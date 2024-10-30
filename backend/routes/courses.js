// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Create a new course
router.post('/', async (req, res) => {
  const { title, description, category, level, duration, faq, price, discount } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      category,
      level,
      duration,
      faq,
      price,
      discount,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Add a new chapter to a course
router.post('/:courseId/chapters', async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    course.chapters.push({ title });
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add chapter' });
  }
});

// Add a new topic to a chapter in a course
router.post('/:courseId/chapters/:chapterId/topics', async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description, content, attachments } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const chapter = course.chapters.id(chapterId);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

    chapter.topics.push({ title, description, content, attachments });
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add topic' });
  }
});

module.exports = router;
