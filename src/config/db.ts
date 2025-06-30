import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`)
    process.exit(1)
  }
}

export default ConnectDB
