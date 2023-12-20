import mongoose from 'mongoose';
import User from '../types/User'

const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;