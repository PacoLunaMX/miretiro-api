import { Request, Response, NextFunction } from "express";
import CreateError from "../Utils/Error";
const AuthService = require('../services/authServices');


export async function register(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const newUser = await AuthService.register(req.body);
    res.status(201).json(newUser);

  } catch (error:any) {
    console.log(error)
    const statusCode = error.statusCode || 401
    const newErr = CreateError(`${error}`, statusCode)
    
    next(newErr)

  }
}


export async function login(req:Request, res:Response, next: NextFunction) {
  try {
    const token = await AuthService.login(req.body);
    
    res.status(200).json({ token  });

  } catch (error) {

    const  newErr = CreateError(`${error}`, 401)
    
    next(newErr)
  }
}

export async function logout(req:Request, res:Response) {
  
  res.status(200).json({ message: 'Logged out successfully' });

}


