import { Request, Response, NextFunction } from "express";
import * as UserServices from '../services/userService'
import { ErrorCode } from "../error-handler/error-code";
import { ErrorException } from "../error-handler/error-exception";
import { UserUpdateDTO } from "../types/User";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";



export async function updateUser(req:Request, res:Response, next:NextFunction) {
  
  try {
    const userData = plainToClass(UserUpdateDTO, req.body);
    const validationResult = await validate(userData);

    if(validationResult.length > 0){
      next(new ErrorException(ErrorCode.ValidationError, validationResult));

    }else{
      
      const updatedUser = await UserServices.updateUser(req.body);
      res.status(201).json(updatedUser);

    }


  } catch (error) {
    
        next(error)

  }
}


export async function getUserBalance(req:Request, res:Response, next: NextFunction){

  try {
    const userId = req.user?._id
    if(!userId){

      throw new ErrorException(ErrorCode.Unauthenticated , {message:"Unauthenticated"})
    }
    const userBalance = await UserServices.getUserBalance(userId);
    res.status(201).json(userBalance);

  } catch (error) {
    
        next(error)

  }
}

