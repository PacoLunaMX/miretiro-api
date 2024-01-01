import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
const AuthService = require('../services/authServices');
import { ErrorException } from "../error-handler/error-exception";
import { ErrorCode } from "../error-handler/error-code";
import { UserCreateDTO, UserLoginDTO } from "../types/User";
import { plainToClass } from 'class-transformer';

export async function register(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const userData = plainToClass(UserCreateDTO, req.body);
    const validationResult = await validate(userData);
    
    
    if(validationResult.length > 0){
      next(new ErrorException(ErrorCode.ValidationError, validationResult));

    }else{
      
      const newUser = await AuthService.register(req.body);
      res.status(201).json(newUser);

    }

  } catch (error) {
    
    next(error)

  }
}


export async function login(req:Request, res:Response, next: NextFunction) {
  try {

    const userData = plainToClass(UserLoginDTO, req.body);
    const validationResult = await validate(userData);
    
    
    if(validationResult.length > 0){
      next(new ErrorException(ErrorCode.ValidationError, validationResult));

    }else{
      
      const token = await AuthService.login(req.body);
      res.status(200).json({ token  });

    }



  } catch (error) {
     
    next(error)
  }
}

export async function logout(req:Request, res:Response) {
  
  res.status(200).json({ message: 'Logged out successfully' });

}


