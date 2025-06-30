import express from 'express'
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'
import { errorHandler } from './middlewares/errorMiddleware'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)
app.use(errorHandler)

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'API is healthy ✅' })
})

export default app
