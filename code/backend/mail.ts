import { Request, Response } from "express";
import nodemailer from "nodemailer";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export function createMessage(req: Request): string {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let mail = req.body.email;
  let message = req.body.message;

  let text: string = "";

  text += "Liebes AuDojo Team,\n\n";
  text += message + "\n\n";
  text += "Liebe Grüße, \n";
  text += firstName + " " + lastName + "\n";
  text += mail;

  return text;
}

export const sendMail = async (from: string, to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  logger.info(`Sending mail to - ${to}`);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};
