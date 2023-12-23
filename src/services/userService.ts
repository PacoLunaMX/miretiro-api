import AccountModel from '../models/Account';
import UserModel from '../models/User';
import User from '../types/User';


export async function createUser(userData: User){

    const user = await UserModel.find({ email: userData.email }).exec();
    console.log(user)
    
    if(user.length > 0){
      throw new Error("User already exists!")
    }

    const newUser =  UserModel.create(userData)

    return newUser

}

export async function updateUser(userData: User){

    const user = await UserModel.findByIdAndUpdate(userData._id, userData ).exec();
    
    return user

}

export async function getUserById(_id: string): Promise<User> {

    const user = await UserModel.findById(_id)
    if(user){
      return user
    }else{
      throw new Error(`There is no user with the id: ${_id}`, )
    }
    
}

export async function getUserByEmail(email: string): Promise<User> {

    const user = await UserModel.findOne({ email: email})
    if(user){
      return user
    }else{
      throw new Error(`There is no user with the id: ${email}`, )
    }
    
}

export async function getUserBalance(userId: string):Promise<Number>{

  const user = await UserModel.findById(userId)
  if(!user){
    throw new Error(`There is not an user with the id ${userId}`)
  }
  const accountsFromUser = await AccountModel.find({userId: user._id}).exec()
  
  if (!accountsFromUser || accountsFromUser.length === 0) {
      return 0; 
  }

const totalBalance = accountsFromUser.reduce((sum, account) => sum + account.balance, 0);
return totalBalance;

}