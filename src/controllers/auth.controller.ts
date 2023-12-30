import { Request, Response, NextFunction } from "express";
const AuthService = require('../services/authServices');
import { ErrorException } from "../error-handler/error-exception";
import { ErrorCode } from "../error-handler/error-code";


export async function register(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const newUser = await AuthService.register(req.body);
    res.status(201).json(newUser);

  } catch (error) {
    
    next(error)

  }
}


export async function login(req:Request, res:Response, next: NextFunction) {
  try {
    const token = await AuthService.login(req.body);
    
    res.status(200).json({ token  });

  } catch (error) {
     
    next(error)
  }
}

export async function logout(req:Request, res:Response) {
  
  res.status(200).json({ message: 'Logged out successfully' });

}


