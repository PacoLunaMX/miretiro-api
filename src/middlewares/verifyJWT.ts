import { Request, NextFunction, Response } from "express"
import * as UserService from '../services/userService'
import UserModel from "../models/User";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config(); 

const secretKey = process.env.ACCESS_SECRET_KEY || "";


const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    
    const token = authHeader.split(" ")[1];
    try {
        const decoded: any = jwt.verify(token, secretKey);
        const userId = decoded.userId
        const user = await UserService.getUserById(userId)
        if (!user) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};

export {verifyJWT}