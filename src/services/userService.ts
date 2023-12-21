import UserModel from '../models/User';
import User from '../types/User';


async function createUser(userData: User){

    const user = await UserModel.find({ email: userData.email }).exec();
    
    if(user){
      throw new Error("User already exists!")
    }

    const newUser =  UserModel.create(userData)

    return newUser

}

async function updateUser(userData: User){

    const user = await UserModel.findByIdAndUpdate(userData._id, userData ).exec();
    
    return user

}