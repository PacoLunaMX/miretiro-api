import express, { Express } from "express";
const cors = require("cors")
const v1Router =  require("./routes/index")
const authRouter =  require("./routes/authRoutes")
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(cors())
app.options("*", (req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-Requested-With");
  res.send(200)
})

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 3000;

app.use("/api/", v1Router);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});