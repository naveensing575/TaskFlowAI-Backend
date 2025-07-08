import User from '../models/User'

export const getAllUsersService = async () => {
  return await User.find().select('-password')
}

export const updateUserRoleService = async (id: string, role: 'user' | 'admin') => {
  const user = await User.findById(id)
  if (!user) throw new Error('User not found')

  user.role = role
  await user.save()
  return user
}


export const deleteUserService = async (id: string) => {
  const user = await User.findById(id)
  if (!user) throw new Error('User not found')

  await user.deleteOne()
  return
}
