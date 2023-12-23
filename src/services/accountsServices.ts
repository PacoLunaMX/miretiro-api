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

export async function deleteAccount(_id: string){

    const account = await AccountModel.find({_id: _id}).exec()

    if(account.length > 0 ){
        throw new Error(`Account with the id: ${_id} does not exist`)
    }else{
        await AccountModel.deleteOne(account)
    }


}

export async function updateAccount(account: Account){

    const updatedAcc = await AccountModel.findOneAndUpdate({ _id: account._id }, account)

    return updatedAcc

}



