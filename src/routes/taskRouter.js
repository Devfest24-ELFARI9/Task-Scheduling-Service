const express = require('express');
const { scheduleTask } = require('../services/taskService');

const router = express.Router();

router.post('/schedule', async (req, res) => {
  const { title, team, date } = req.body;
  try {
    const task = await scheduleTask(title, team, date);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;