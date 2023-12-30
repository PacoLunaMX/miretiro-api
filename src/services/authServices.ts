const UserService = require('./userService');
const bcrypt = require('bcrypt');
import User from '../types/User'
import { Credentials } from '../types/Auth';
import { ErrorException } from '../error-handler/error-exception';
import { ErrorCode } from '../error-handler/error-code';

const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = process.env.ACCESS_SECRET_KEY

async function register(userData: User) {
  

  try {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    return await UserService.createUser({ ...userData, password: hashedPassword });
    
  } catch (error) {

    throw new ErrorException(ErrorCode.Unauthenticated)    
  }

}

async function login(credentials: Credentials) {
  
  const user = await UserService.getUserByEmail(credentials.email);
  
  if (!user) {
    throw new ErrorException(ErrorCode.Unauthenticated, {"message": "Invalid credentials"})  
  }

  const passwordMatch = await bcrypt.compare(credentials.password, user.password);
  
  if (!passwordMatch) {
    throw new ErrorException(ErrorCode.Unauthenticated, {"message": "Invalid credentials"})
  }

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

  return token;
}

module.exports = {
  register,
  login,
};
