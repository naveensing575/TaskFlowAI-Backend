import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

export const MONGO_URI = process.env.MONGO_URI as string;

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY as string;


if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables.');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

if (!OPENROUTER_API_KEY) {
  console.warn('OPENROUTER_API_KEY is not defined. AI Task Breakdown will not work.');
}
