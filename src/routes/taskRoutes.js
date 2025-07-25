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
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    // Task not found — respond 404
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});


module.exports = router;
