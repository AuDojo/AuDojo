import { Request, Response } from "express";
import { sendMail } from "./mail";
import dotenv from "dotenv";

const express = require("express");
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  console.log("---------- Mail wird gesendet ----------");

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let mail = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;

  let text = firstName + " " + lastName + "\n" + mail + "\n\n" + message;

  if (process.env.MAIL_USERNAME == undefined) {
    res.send("Error!! Mail-Account not found");
    console.log("Error!");
    return;
  } else {
    sendMail(process.env.MAIL_USERNAME, process.env.MAIL_USERNAME, subject, text);
    console.log("Geklappt!!");
  }

  res.send("hello world");
});

module.exports = router;
