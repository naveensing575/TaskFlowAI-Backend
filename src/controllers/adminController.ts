import { Request, Response } from 'express'
import {
  getAllUsersService,
  updateUserRoleService,
  deleteUserService,
  getAllActivityLogsService
} from '../services/adminService'
import User from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'user';
  };
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService()
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUserRole = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { role } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const admin = await User.findById(req.user.id).select("name email");
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const targetUser = await User.findById(req.params.id).select("name email");
    if (!targetUser) {
      res.status(404).json({ message: "Target user not found" });
      return;
    }

    const updatedUser = await updateUserRoleService(
      req.params.id,
      role,
      req.user.id
    );

    res.json({
      message: `${admin.name} updated ${targetUser.name}'s role to ${role}`,
      user: updatedUser,
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const admin = await User.findById(req.user.id).select("name email");
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const targetUser = await User.findById(req.params.id).select("name email");
    if (!targetUser) {
      res.status(404).json({ message: "Target user not found" });
      return;
    }

    await deleteUserService(req.params.id, req.user.id);

    res.json({
      message: `${admin.name} deleted user ${targetUser.name}`,
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllActivityLogs = async (req: Request, res: Response) => {
  try {
    const logs = await getAllActivityLogsService()
    res.json(logs)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
