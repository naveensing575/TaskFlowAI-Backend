import mongoose from 'mongoose'
import { MONGO_URI } from './envConfig'


const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI || '')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`)
    process.exit(1)
  }
}

export default ConnectDB
