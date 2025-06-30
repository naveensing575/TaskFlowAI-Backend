import express from 'express'
import authRoutes from './routes/authRoutes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'API is healthy ✅' })
})

export default app
