import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { JWT_SECRET } from '../config/envConfig'

interface CustomRequest extends Request {
  user?: any
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, JWT_SECRET || '') as {
        id: string
      }

      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        res.status(401).json({ message: 'User not found' })
        return
      }

      next()
    } catch (err: any) {
      console.error(err)
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}
