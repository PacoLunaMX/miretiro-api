import { Request, Response, NextFunction } from "express";
import * as AccountService from '../services/accountsServices'


export async function createAccount(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const newAccount = await AccountService.createAccount(req.body)
    console.log(newAccount)
    res.status(201).json({ newAccount });

  } catch (error) {
        console.log(error)
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
        const accountId = req.params.id
        const updatedAccount = await AccountService.updateAccount(accountId, req.body)
        res.status(201).json({ updatedAccount });
    
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