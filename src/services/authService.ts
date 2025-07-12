import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/generateToken';

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.id);

  return { user, token };
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found. Please register first.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password. Please try again.');
  }

  const token = generateToken(user.id);

  return { user, token };
};
