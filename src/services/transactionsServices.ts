import mongoose from "mongoose";
import TransactionModel from "../models/Transaction";
import Transaction from "../types/Transaction";
import AccountModel from "../models/Account";


export async function getAllTransactionsFromUser(user_id:string): Promise<Transaction[]>{

    const allTransactions = await TransactionModel.find({ userId: user_id })

    return allTransactions

}


export async function getAllTransactionsFromAnAccount( accountId:string ): Promise<Transaction[]>{

    const allTransactions = await TransactionModel.find({ accountId: accountId })

    return allTransactions

}


export async function makeTransaction(transaction: Transaction): Promise<Transaction>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const transactionType = transaction.type
    
    const accountFromUser = await AccountModel.findOne({ _id: transaction.accountId, userId: transaction.userId })
    if(!accountFromUser){
        throw new Error(`There is no account from the user`)
    }

    try {
        const newTransaction = await TransactionModel.create(transaction)
    
        if(transactionType == "withdraw"){
            if(accountFromUser.balance < transaction.amount){
                throw new Error("The balance is not enough to make a withdraw")
            }
    
            const newBalance = accountFromUser.balance  - transaction.amount
            await AccountModel.updateOne({ _id: transaction.accountId }, { balance: newBalance })
    
    
        }else if(transactionType == "deposit"){
            
            const newBalance = accountFromUser.balance  + transaction.amount
            await AccountModel.updateOne({ _id: transaction.accountId }, { balance: newBalance })
    
    
        }else{
            throw new Error("Transaction type not supported")
        }
    
        await session.commitTransaction();
        session.endSession();
        return newTransaction

    } catch (error) {

        await session.abortTransaction();
        session.endSession();
        throw error;

    }
    

}


export async function rollbackTransaction(_id: string){

    const session = await mongoose.startSession();
    session.startTransaction();

    const transaction = await TransactionModel.findById(_id)
    if(!transaction){
        throw new Error(`There isn't a transaction with the id: ${_id}`)
    }
    
    const transactionType = transaction.type
    
    const accountFromUser = await AccountModel.findOne({ _id: transaction.accountId, userId: transaction.userId })
    if(!accountFromUser){
        throw new Error(`There is no account from the user`)
    }

    try {
    
        if(transactionType == "withdraw"){

            const newBalance = accountFromUser.balance  +  transaction.amount
            await AccountModel.updateOne({ _id: transaction.accountId }, { balance: newBalance })
    
    
        }else if(transactionType == "deposit"){
            if(accountFromUser.balance < transaction.amount){
                throw new Error("The balance is not enough to revert the transaction")
            }

            const newBalance = accountFromUser.balance  -  transaction.amount
            await AccountModel.updateOne({ _id: transaction.accountId }, { balance: newBalance })
    
    
        }else{
            throw new Error("Transaction type not supported")
        }
    
        await TransactionModel.deleteOne({_id: _id}).exec()

        await session.commitTransaction();
        session.endSession();
        

    } catch (error) {

        await session.abortTransaction();
        session.endSession();
        throw error;

    }

}





