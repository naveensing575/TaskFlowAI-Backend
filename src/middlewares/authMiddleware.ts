import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { JWT_SECRET } from '../config/envConfig'

interface DecodedToken {
  id: string
}

interface AuthenticatedRequest extends Request {
  user?: any 
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET not defined')
      }

      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken

      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' })
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
