interface Transaction{
    
    _id?: string;
    type: 'deposit' | 'withdraw';
    amount:number;
    userId:string;
    accountId: string;
    date: Date;
    createdAt?: Date;
    
}

export default Transaction;