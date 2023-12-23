

export interface Account{
    _id?: string;
    type: string;
    userId: string;
    balance: number;
    name:string;
    createdAt?: Date;
    
}
export interface AccountUpdate {
    _id?: string;
    type?: string;
    userId?: string;
    balance?: number;
    name?: string;
    createdAt?: Date;
  }


