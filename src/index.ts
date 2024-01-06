import express, { Express } from "express";
import cors from "cors"
const apicache = require('apicache');

import DBCONNECT from "./database";
import { verifyJWT } from "./middlewares/verifyJWT";
import ErrorHandler from "./middlewares/ErrorHandler";

import UserRouter from './routes/users.routes'
import AuthRouter from './routes/auth.routes'
import AccountRouter from './routes/accounts.routes'
import TransactionRouter from './routes/transactions.route'

DBCONNECT();


const app: Express = express();
// let cache = apicache.middleware;
// app.use(cache('2 minutes'));

const corsOptions = {
	origin: 'http://example.com',
	optionsSuccessStatus: 200
};

app.use(cors())

app.options("*", (req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-Requested-With");
  res.send(200)
})


app.use(express.json())

app.use(express.urlencoded({ extended: false }))



app.use("/api/auth", AuthRouter);


app.use("/api/users", verifyJWT, UserRouter);
app.use("/api/accounts", verifyJWT, AccountRouter);
app.use("/api/transactions", verifyJWT, TransactionRouter);

app.use(ErrorHandler)

export default app; 