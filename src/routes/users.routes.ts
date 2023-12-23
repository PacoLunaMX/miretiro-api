import express, { Request, Response } from "express";
import * as UsersController from '../controllers/users.controllers'

const router = express.Router();

router.route("/").get((req: Request, res: Response) => {

  const user = req.user
  res.json({ user });

});

router.route("/balance").get(UsersController.getUserBalance);



export default router