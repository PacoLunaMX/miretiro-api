import { Request, Response } from "express";
const AuthService = require('../services/authServices');


async function register(req:Request, res:Response) {
  try {
    const newUser = await AuthService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
}

async function login(req:Request, res:Response) {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

async function logout(req:Request, res:Response) {
  // Perform logout actions, e.g., invalidate the token if using JWT
  res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
  register,
  login,
  logout,
};
