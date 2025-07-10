import User from '../models/User'
import ActivityLog from '../models/ActivityLog'

export const getAllUsersService = async () => {
  return await User.find().select('-password')
}

export const updateUserRoleService = async (
  id: string,
  role: 'user' | 'admin',
  adminId: string
) => {
  const user = await User.findById(id)
  if (!user) throw new Error('User not found')

  user.role = role
  await user.save()

  // Log the action
  await ActivityLog.create({
    admin: adminId,
    action: `Updated role to ${role}`,
    targetUser: user._id
  })

  return user
}

export const deleteUserService = async (
  id: string,
  adminId: string
) => {
  const user = await User.findById(id)
  if (!user) throw new Error('User not found')

  await user.deleteOne()

  // Log the action
  await ActivityLog.create({
    admin: adminId,
    action: 'Deleted user',
    targetUser: user._id
  })

  return
}

export const getAllActivityLogsService = async () => {
  return await ActivityLog.find()
    .populate('admin', 'name email')
    .populate('targetUser', 'name email')
    .sort({ timestamp: -1 })
}
