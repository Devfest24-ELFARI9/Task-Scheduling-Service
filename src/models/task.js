// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  team: { type: String, required: true },
  date: { type: Date, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;