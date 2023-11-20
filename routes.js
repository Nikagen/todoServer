const express = require('express');
const router = express.Router();
const {
  getAllLists,
  createTask,
  deleteTask,
  editTask,
  editListTitle,
  getTask,
  toggleCompleteTask
} = require('./controllers');

router.get('/lists/:listId/tasks/:taskId', getTask);

router.get('/lists', getAllLists);

router.post('/lists', createTask);

router.post('/lists/:listId/tasks', createTask);

router.delete('/lists/:listId/tasks/:taskId', deleteTask);

router.put('/lists/:listId/tasks/:taskId', editTask);

router.put('/lists/:listId', editListTitle);

router.put('/lists/:listId/tasks/:taskId/toggle-complete', toggleCompleteTask);


module.exports = router;
