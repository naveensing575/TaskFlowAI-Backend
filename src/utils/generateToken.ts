import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/envConfig'

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET || '', {
    expiresIn: '1d',
  })
}
