import { protect } from './../middlewares/authMiddleware'
import { Router } from 'express'
import { loginUser, registerUser, getMe } from '../controllers/authController'

const router = Router()

router.post('/register', registerUser)
router.post('/login', protect, loginUser)
router.get("/me", protect, getMe);

export default router
