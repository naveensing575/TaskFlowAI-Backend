import { Request, Response } from 'express'
import * as authService from '../services/authService'
import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please add all fields' })
      return
    }

    const { user, token } = await authService.register(name, email, password)

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    })
  },
)

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Please add all fields' })
    return
  }

  const { user, token } = await authService.login(email, password)

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  })
})

export const getMe = (req: any, res: Response) => {
  const user = req.user;
  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
  });
};
