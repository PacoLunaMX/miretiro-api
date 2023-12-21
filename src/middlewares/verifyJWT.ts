import { Request, NextFunction, Response } from "express"
import { model } from "mongoose";
const jwt = require('jsonwebtoken');
require("dotenv").config()

const secretKey = process.env.ACCESS_SECRET_KEY

const verifyJWT = (req:Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers["authorization"]
    if(!authHeader) return res.sendStatus(401)
    
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        secretKey,
        (err:any, decoded:any) =>{
            if(err) return res.sendStatus(403);
            req.user = decoded.userId
            next()

        }
    )

}

module.exports = verifyJWT