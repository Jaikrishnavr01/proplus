const express = require('express');
const Discussion = require('../models/Discussion');
const router = express.Router();

// Create a new discussion
router.post('/', async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a comment to a discussion
router.post('/:discussionId/comments', async (req, res) => {
  const { discussionId } = req.params;
  const { user, comment } = req.body;

  try {
    const discussion = await Discussion.findById(discussionId);
    discussion.comments.push({ user, comment });
    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
