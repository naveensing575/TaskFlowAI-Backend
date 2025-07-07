import connectDB from './config/db'
import app from './app'
import { PORT } from './config/envConfig'

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
