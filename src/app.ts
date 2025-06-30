import express from 'express'
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'API is healthy ✅' })
})

export default app
