const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  addTask,
  editTask,
  removeTask,
} = require('../controllers/taskController');

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', addTask);
router.put('/:id', editTask);
router.delete('/:id', removeTask);

module.exports = router;
