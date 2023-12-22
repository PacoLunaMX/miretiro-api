

interface Account{
    _id?: string;
    type: string;
    userId: string;
    balance: number;
    name:string;
    createdAt?: Date;
    
}

export default Account;