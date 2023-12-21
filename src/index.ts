import express, { Express } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "./middlewares/verifyJWT";
import cors from "cors"

import UserRouter from './routes/users.routes'
import AuthRouter from './routes/auth.routes'

dotenv.config(); 



const app: Express = express();


const port = process.env.PORT || 3000;

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
app.use("/api/", UserRouter);

app.use(verifyJWT)
app.get("/protected",(req, res)=>{
  res.send("201")
} )

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});