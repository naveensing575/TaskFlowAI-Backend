import { Request, Response } from 'express';
import * as authService from '../services/authService';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import bcrypt from 'bcrypt';
import supabase from '../utils/supabase';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const registerUser = [
  upload.single('avatar'),
  asyncHandler(async (req: any, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please add all fields' });
      return;
    }

    let profileImage;
    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `avatars/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, req.file.buffer, {
          upsert: true,
          contentType: req.file.mimetype,
        });

      if (error) throw new Error(error.message);

      const { data: publicUrl } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName);

      profileImage = publicUrl.publicUrl;
    }

    const { user, token } = await authService.register(
      name,
      email,
      password,
      profileImage
    );

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token,
    });
  }),
];

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Please add all fields' });
    return;
  }

  const { user, token } = await authService.login(email, password);

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    token,
  });
});

export const getMe = (req: any, res: Response) => {
  const user = req.user;
  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  });
};

export const updateProfile = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { name, email, password, profileImage } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (name) user.name = name;
  if (email) user.email = email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  });
});
