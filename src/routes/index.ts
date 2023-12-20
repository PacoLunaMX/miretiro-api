import express, { Request, Response } from "express";

const router = express.Router();

router.route("/").get((req: Request, res: Response) => {
    console.log("si")

  res.send("Express + TypeScript Server");

});

module.exports = router;

