import { IsString, MaxLength, MinLength, IsEmail, IsOptional } from 'class-validator';

export class User{

    _id?:string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}



export class UserCreateDTO implements Pick<User, 'username' | 'email' | 'password'> {
  @IsString({
    message: 'Username must be a valid string between  8 and 45 characters',
  })
  @MinLength(8, {
    message: 'Username must be a valid string between  8 and 45 characters',
  })
  @MaxLength(45, {
    message: 'Username must be a valid string between  8 and 45 characters',
  })
  username: string;
  

  @IsEmail()
  @MinLength(8,
    {
      message: 'Username must be a valid email between  8 and 40 characters',
    })
  @MaxLength(40,{
      message: 'Username must be a valid email between  8 and 40 characters',
    })
  email: string;


  @IsString()
  @MinLength(8,
    {
      message: 'Password must be a valid string between  8 and 40 characters',
    })
  @MaxLength(45,{
    message: 'Password must be a valid string between  8 and 40 characters',
  })
  password: string;
}

export class UserUpdateDTO implements Pick<User, 'username' | 'email' | 'password'> {
  @IsString({
    message: 'Username must be a valid string between  8 and 45 characters',
  })
  @IsOptional()
  @MinLength(8, {
    message: 'Username must be a valid string between  8 and 45 characters',
  })
  @MaxLength(45, {
    message: 'Username must be a valid string between  8 and 45 characters',
  })
  username: string;
  

  @IsEmail()
  @IsOptional()
  @MinLength(8,
    {
      message: 'Username must be a valid email between  8 and 40 characters',
    })
  @MaxLength(40,{
      message: 'Username must be a valid email between  8 and 40 characters',
    })
    
  email: string;


  @IsString()
  @IsOptional()
  @MinLength(8,
    {
      message: 'Password must be a valid string between  8 and 40 characters',
    })
  @MaxLength(45,{
    message: 'Password must be a valid string between  8 and 40 characters',
  })
  password: string;
}

export class UserLoginDTO implements Pick<User,'email' | 'password'>  {
  @IsEmail()
  @MinLength(8,
    {
      message: 'Username must be a valid email between  8 and 40 characters',
    })
  @MaxLength(40,{
      message: 'Username must be a valid email between  8 and 40 characters',
    })
  email: string;


  @IsString()
  @MinLength(8,
    {
      message: 'Password must be a valid string between  8 and 40 characters',
    })
  @MaxLength(45,{
    message: 'Password must be a valid string between  8 and 40 characters',
  })
  password: string;
}