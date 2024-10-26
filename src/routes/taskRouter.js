const express = require('express');
const { scheduleTask , getAllTasks , getTasksByTeam } = require('../services/taskService');

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

router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/team/:team', async (req, res) => {
  const { team } = req.params;
  try {
    const tasks = await getTasksByTeam(team);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;