import express from 'express';
import {
  fetchTasks,
  addTask,
  editTask,
  removeTask,
} from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes below with JWT auth middleware
router.use(authenticateToken);

router.get('/', fetchTasks);
router.post('/', addTask);
router.put('/:id', editTask);
router.delete('/:id', removeTask);

export default router;
