import { Request, Response } from 'express'
import * as authService from '../services/authService'

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please add all fields' })
    return
  }

  try {
    const { user, token } = await authService.register(name, email, password)

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ messgae: 'Please add all fields' })
    return
  }

  try {
    const { user, token } = await authService.login(email, password) 

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
