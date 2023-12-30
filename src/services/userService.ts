import AccountModel from '../models/Account';
import UserModel from '../models/User';
import User from '../types/User';
import { ErrorCode } from '../error-handler/error-code';
import { ErrorException } from '../error-handler/error-exception';

export async function createUser(userData: User){

    const user = await UserModel.find({ email: userData.email }).exec();
    
    if(user.length > 0){

      throw new ErrorException(ErrorCode.BadRequest ,{message:"User already exists!"})
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
      
      throw new ErrorException(ErrorCode.NotFound ,{message:`There is no user with the id: ${_id}`})
      
    }
    
}

export async function getUserByEmail(email: string): Promise<User> {

    const user = await UserModel.findOne({ email: email})
    if(user){
      return user
    }else{
      
      throw new ErrorException(ErrorCode.NotFound ,{message:`There is no user with the email: ${email}`,})
      
    }
    
}

export async function getUserBalance(userId: string):Promise<Number>{

  const user = await UserModel.findById(userId)
  if(!user){
    
    throw new ErrorException(ErrorCode.NotFound ,{message:`There is no user with the id: ${userId}`})
    
  }
  const accountsFromUser = await AccountModel.find({userId: user._id}).exec()
  
  if (!accountsFromUser || accountsFromUser.length === 0) {
      return 0; 
  }

const totalBalance = accountsFromUser.reduce((sum, account) => sum + account.balance, 0);
return totalBalance;

}