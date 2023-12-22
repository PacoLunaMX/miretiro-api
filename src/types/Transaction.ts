interface Transaction{
    
    _id?: string;
    type: string;
    amount:number;
    userId:string;
    accountId: string;
    date: Date;
    createdAt?: Date;
    
}

export default Transaction;