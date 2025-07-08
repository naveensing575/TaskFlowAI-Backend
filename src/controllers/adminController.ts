import { Request, Response } from 'express'
import {
  getAllUsersService,
  updateUserRoleService,
  deleteUserService,
} from '../services/adminService'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService()
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body
    const updatedUser = await updateUserRoleService(req.params.id, role)
    res.json({ message: `User role updated to ${role}`, user: updatedUser })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUserService(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
