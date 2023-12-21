import { Request, Response, NextFunction } from "express";
const AuthService = require('../services/authServices');


export async function register(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const newUser = await AuthService.register(req.body);
    res.status(201).json(newUser);

  } catch (error) {
    
    next(error)

  }
}


export async function login(req:Request, res:Response) {
  try {
    const token = await AuthService.login(req.body);
    // res.cookie("jwt", re)
    res.status(200).json({ token  });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

export async function logout(req:Request, res:Response) {
  // Perform logout actions, e.g., invalidate the token if using JWT
  res.status(200).json({ message: 'Logged out successfully' });
}


