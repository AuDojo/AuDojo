import { Request, Response } from "express";
import { sendMail, createMessage } from "./mail";
import dotenv from "dotenv";

const express = require("express");
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  console.log("---------- Mail wird gesendet ----------");

  let subject = req.body.subject;
  let text = createMessage(req);

  if (process.env.MAIL_USERNAME == undefined) {
    res.send("Error!! Mail-Account not found");
    res.status(500).send("Error");
    return;
  } else {
    sendMail(process.env.MAIL_USERNAME, process.env.MAIL_USERNAME, subject, text);
    console.log("Geklappt!!");
  }

  res.status(200).send("Geklappt");
});

module.exports = router;
