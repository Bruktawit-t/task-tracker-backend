import express from 'express';
import { fetchTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all task routes
router.use(authenticateToken);

router.get('/', fetchTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
