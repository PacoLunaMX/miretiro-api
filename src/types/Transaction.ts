import { IsString, MaxLength, MinLength, IsEmail, IsOptional, IsNumber, IsDate } from 'class-validator';


export type transactionType = 'deposit' | 'withdraw';


export class Transaction{
    _id?: string;
    type: transactionType ;
    amount:number;
    userId:string;
    accountId: string;
    date: Date;
    createdAt?: Date;
    
  }
  

  
export class TransactionCreateDTO implements Pick<Transaction, 'type' | 'userId' | 'accountId' | 'date' > {
    @IsString({
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MinLength(8, {
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MaxLength(20, {
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    type: transactionType;


    @IsString({
        message: 'userId is required',
    })
    userId: string;

    @IsString({
        message: 'userId is required',
    })
    accountId: string;

    @IsDate({
        message: 'Date must be a valid date type',
    })
    date: Date;

    

  }
  

export class TransactionUpdateDTO implements Pick<Transaction, 'type' | 'date'> {
    @IsString({
        message: 'Type must be a valid string between  8 and 45 characters',
      })

    @IsOptional()
      @MinLength(8, {
        message: 'Type must be a valid string between  8 and 45 characters',
      })
      @MaxLength(20, {
        message: 'Type must be a valid string between  8 and 45 characters',
      })
      type: transactionType;
  
  
      @IsDate({
          message: 'Date must be a valid date type',
      })
      @IsOptional()
      date: Date;
  
  }
  



