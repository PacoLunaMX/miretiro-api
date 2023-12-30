import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../error-handler/error-code";
import { ErrorException } from "../error-handler/error-exception";
import { ErrorModel } from "../error-handler/error-model";


const ErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
    console.log('Error handling middleware called.');
    console.log('Path:', req.path);
    console.error('Error occured:', err);
    
    if (err instanceof ErrorException) {
        console.log('Error is known.');
        res.status(err.status).json({
            err
        });

      } else {
        // For unhandled errors.
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
      }
    
}

export default ErrorHandler