import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Create task & get all tasks
router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

// Update task
router.put('/:id', protect, updateTask);

// Delete task
router.delete('/:id', protect, deleteTask);

export default router;
