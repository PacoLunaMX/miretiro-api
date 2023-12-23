import mongoose from 'mongoose';
import { Account } from '../types/Account'

const AccountSchema = new mongoose.Schema<Account>({
  
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  balance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },

});

const AccountModel = mongoose.model<Account>('Account', AccountSchema);

export default AccountModel;