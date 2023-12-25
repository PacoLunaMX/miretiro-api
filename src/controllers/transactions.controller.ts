import { Request, Response, NextFunction } from "express";
import * as TransactionsService from '../services/transactionsServices'


export async function createTransaction(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const newTransaction = await TransactionsService.makeTransaction(req.body)
    res.status(201).json({ newTransaction });

  } catch (error) {
    
        next(error)

  }
}


export async function getAllTransactionsFromUser(req:Request, res: Response, next: NextFunction){

  try {
    
    const userId = req?.user?._id
    if(userId){
        const allTransactionsFromUser = await TransactionsService.getAllTransactionsFromUser(userId)
        res.status(201).json({ allTransactionsFromUser });
    }
 
  } catch (error) {
    
        next(error)

  }


}

export async function getAllTransactionsFromAnAccount(req:Request, res: Response, next: NextFunction){

  try {
    
    const accountId = req.params.accountId
    if(accountId){
        const allTransactions = await TransactionsService.getAllTransactionsFromAnAccount(accountId)
        res.status(201).json({ allTransactions });
    }
 
  } catch (error) {
    
        next(error)

  }


}



export async function deleteTransaction(req:Request, res:Response, next: NextFunction){
  try {

    const transactionId = req.params.id

    await TransactionsService.rollbackTransaction(transactionId)
    res.json(201)

  } catch (error) {
    
        next(error)

  }

}