import express, { Request, Response } from "express";
import * as AccountsController from '../controllers/accounts.controller'

const router = express.Router();

router.route("/").get(AccountsController.getAllAccountsFromUser);

router.route("/").post(AccountsController.createAccount);


export default router