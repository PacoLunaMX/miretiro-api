import { Request, Response, NextFunction } from "express";
import * as AccountService from '../services/accountsServices'


export async function createAccount(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const newAccount = await AccountService.createAccount(req.body)
    res.status(201).json({ newAccount });

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
    
        const updatedAccount = await AccountService.updateAccount(req.body)
        res.status(201).json({ updatedAccount });
    
      } catch (error) {
        
            next(error)
    
      }

}

export async function deleteAccount(req:Request, res:Response, next: NextFunction){
  try {
    const accountId = req.params._id

    await AccountService.deleteAccount(accountId)
    res.json(201)

  } catch (error) {
    
        next(error)

  }

}