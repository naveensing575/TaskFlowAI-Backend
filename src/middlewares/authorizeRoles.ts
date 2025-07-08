import { Response, NextFunction } from 'express'

export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        message: `Role '${req.user?.role}' is not authorized to access this resource`,
      })
      return
    }
    next()
  }
}
