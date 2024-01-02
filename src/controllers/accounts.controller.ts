import { Request, Response, NextFunction } from "express";
import * as AccountService from '../services/accountsServices'
import { plainToClass } from 'class-transformer';
import { AccountCreateDTO, AccountUpdateDTO } from "../types/Account";
import { validate } from "class-validator";
import { ErrorException } from "../error-handler/error-exception";
import { ErrorCode } from "../error-handler/error-code";


export async function createAccount(req:Request, res:Response, next:NextFunction) {
  
  try {

    const accountData = plainToClass(AccountCreateDTO, req.body);
    const validationResult = await validate(accountData);
    
    
    if(validationResult.length > 0){
      next(new ErrorException(ErrorCode.ValidationError, validationResult));

    }else{
      
      const newAccount = await AccountService.createAccount(req.body)
      res.status(201).json({ newAccount });

    }


  } catch (error) {
    
      next(error)

  }
}


export async function getAllAccountsFromUser(req:Request, res: Response, next: NextFunction){

  try {
    
    const userId = req?.user?._id
    if(userId){
        const allAccounts = await AccountService.getAllAccountsFromUser(userId)
        res.status(201).json({ allAccounts });
    }
 
  } catch (error) {
    
        next(error)

  }


}

export async function updateAccount(req:Request, res: Response, next: NextFunction){
    try {
      
      const accountData = plainToClass(AccountUpdateDTO, req.body);
      const validationResult = await validate(accountData);
      
      
      if(validationResult.length > 0){
          next(new ErrorException(ErrorCode.ValidationError, validationResult));
  
      }else{
        
        const accountId = req.params.id
        const updatedAccount = await AccountService.updateAccount(accountId, req.body)
        res.status(201).json({ updatedAccount });
  
      }



    
      } catch (error) {
        
            next(error)
    
      }

}

export async function deleteAccount(req:Request, res:Response, next: NextFunction){
  try {

    const accountId = req.params.id

    await AccountService.deleteAccount(accountId)
    res.json(201)

  } catch (error) {
    
        next(error)

  }

}