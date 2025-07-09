import express from 'express'
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'
import { errorHandler } from './middlewares/errorMiddleware'
import morgan from 'morgan';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes';

const app = express()

app.use(express.json())


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/admin/users', adminRoutes)
app.use(errorHandler)

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'API is healthy ✅' })
})

export default app
