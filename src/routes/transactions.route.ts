import express, { Request, Response } from "express";
import * as TransactionsController from '../controllers/transactions.controller'

const router = express.Router();

router.route("/user/:id").get(TransactionsController.getAllTransactionsFromUser);

router.route("/account/:id").get(TransactionsController.getAllTransactionsFromAnAccount);

router.route("/").post(TransactionsController.createTransaction);

router.route("/:id").delete(TransactionsController.deleteTransaction);


export default router