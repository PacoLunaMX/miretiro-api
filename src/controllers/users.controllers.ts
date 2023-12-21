import { Request, Response, NextFunction } from "express";
const UserService = require('../services/userService');


async function updateUser(req:Request, res:Response, next:NextFunction) {
  
  try {
    
    const updatedUser = await UserService.updateUser(req.body);
    res.status(201).json(updatedUser);

  } catch (error) {
    
        next(error)

  }
}


