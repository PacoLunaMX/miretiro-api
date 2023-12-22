import mongoose from 'mongoose';
import Transaction from '../types/Transaction'

const TransactionSchema = new mongoose.Schema<Transaction>({
  
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  accountId: { type: String, required: true },
  date: { type: Date, required: true},
  createdAt: { type: Date, default: Date.now },

});

const TransactionModel = mongoose.model<Transaction>('Transaction', TransactionSchema);

export default TransactionModel;