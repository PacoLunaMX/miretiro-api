import AccountModel from "../models/Account";
import Account from "../types/Account";


export async function getAllAccountsFromUser(user_id:string){

    const allAccounts = await AccountModel.find({ userId: user_id })

    return allAccounts

}


export async function createAccount(account: Account){

    const newAccount = await AccountModel.create(account)
    
    return newAccount
}

export async function deleteAccount(){

}

export async function updateAccount(account: Account){

    const updatedAcc = await AccountModel.findOneAndUpdate({ _id: account._id }, account)

    return updatedAcc

}

