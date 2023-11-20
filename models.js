const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const listSchema = new mongoose.Schema({
  title: String,
  tasks: [taskSchema] || [],
});

module.exports = mongoose.model('List', listSchema);
