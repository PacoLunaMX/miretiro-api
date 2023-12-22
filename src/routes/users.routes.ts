import express, { Request, Response } from "express";
import * as UserService from '../services/userService'

const router = express.Router();

router.route("/").get((req: Request, res: Response) => {

  const user = req.user
  res.json({ user });

});



export default router