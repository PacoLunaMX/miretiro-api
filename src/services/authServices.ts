const UserService = require('./userService');
const bcrypt = require('bcrypt');
import User from '../types/User'
import { Credentials } from '../types/Auth';


const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = process.env.ACCESS_SECRET_KEY

async function register(userData: User) {

  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
  return await UserService.createUser({ ...userData, password: hashedPassword });

}

async function login(credentials: Credentials) {
  const user = await UserService.getUserByEmail(credentials.email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(credentials.password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = {
  register,
  login,
};
