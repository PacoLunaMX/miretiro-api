import { IsString, MaxLength, MinLength, IsEmail, IsOptional, IsNumber } from 'class-validator';


  export class Account{
    _id?: string;
    type: string;
    userId: string;
    balance: number;
    name:string;
    createdAt?: Date;
    
  }
  
  
  
export class AccountCreateDTO implements Pick<Account, 'type' | 'userId' | 'balance' | 'name' > {
    @IsString({
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MinLength(8, {
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MaxLength(45, {
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    type: string;

    @IsString({
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MinLength(8, {
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MaxLength(45, {
      message: 'Type must be a valid string between  8 and 45 characters',
    })
    name: string;

    @IsString({
        message: 'userId is required',
    })
    userId: string;

    @IsNumber()
    balance:number;


    

  }
  

  export class AccountUpdateDTO implements Pick<Account, 'type'  | 'name'> {
    @IsString({
        message: 'Type must be a valid string between  8 and 45 characters',
    })
    @IsOptional()
    @MinLength(8, {
        message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MaxLength(45, {
        message: 'Type must be a valid string between  8 and 45 characters',
    })
    type: string;
  
    
    @IsString({
        message: 'Type must be a valid string between  8 and 45 characters',
      })
    @IsOptional()
    @MinLength(8, {
        message: 'Type must be a valid string between  8 and 45 characters',
    })
    @MaxLength(45, {
        message: 'Type must be a valid string between  8 and 45 characters',
    })
    name: string;
  
  }
  
