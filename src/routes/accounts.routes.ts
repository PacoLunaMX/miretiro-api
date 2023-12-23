import express, { Request, Response } from "express";
import * as AccountsController from '../controllers/accounts.controller'

const router = express.Router();

router.route("/").get(AccountsController.getAllAccountsFromUser);

router.route("/").post(AccountsController.createAccount);

router.route("/:id").put(AccountsController.updateAccount);

router.route("/:id").delete(AccountsController.deleteAccount);


export default router