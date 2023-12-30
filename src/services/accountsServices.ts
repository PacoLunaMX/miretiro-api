import AccountModel from "../models/Account";
import { Account } from "../types/Account";
import { ErrorCode } from "../error-handler/error-code";
import { ErrorException } from "../error-handler/error-exception";


export async function getAllAccountsFromUser(user_id:string): Promise<Account[]>{

    const allAccounts = await AccountModel.find({ userId: user_id })

    return allAccounts

}


export async function createAccount(account: Account): Promise<Account>{

    const newAccount = await AccountModel.create(account)
    
    return newAccount
}

export async function deleteAccount(_id: string){

    const account = await AccountModel.findOne({_id: _id}).exec()
    if(!account){
        throw new ErrorException(ErrorCode.NotFound ,{"message":`Account with the id: ${_id} does not exist`})
    }else{
        await AccountModel.deleteOne({_id: _id})
    }


}

export async function updateAccount(_id:string, account: Account){

    const accountToUpdate = await AccountModel.find({  _id: _id })
    
    if(accountToUpdate.length>0){

        await AccountModel.updateOne({_id: _id}, account ).exec()
        
        const updatedAcc  = await AccountModel.find({ _id: _id }, account)
        
        return updatedAcc

    }else{
        
        throw new ErrorException(ErrorCode.NotFound ,{"message":`Account with the id: ${_id} does not exist`})
        

    }


}



