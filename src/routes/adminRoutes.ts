import express from 'express'
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllActivityLogs
} from '../controllers/adminController'

import { protect } from '../middlewares/authMiddleware'
import { authorizeRoles } from '../middlewares/authorizeRoles'

const router = express.Router()

router.get('/', protect, authorizeRoles('admin'), getAllUsers)
router.patch('/:id/role', protect, authorizeRoles('admin'), updateUserRole)
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser)

// Get all activity logs
router.get('/activity', protect, authorizeRoles('admin'), getAllActivityLogs)

export default router
