import { Request } from "express";
import nodemailer from "nodemailer";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

/**
 * Creates the Message of the body of the mail with the passed Data
 * @param req Posesses the separated information of the user from the frontend
 * - firstName,
 * - lastName,
 * - mail,
 * - message
 * @returns Text with all the information
 */
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

/**
 * Sends the Mail to our in the .env file specified email
 * @param from The Sender Mail
 * @param to The Receiver Mail
 * @param subject The subject of the Mail
 * @param text The body of the Mail
 */
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
  }); //TODO: Return some kind of error Message to handle in the response to frontend, if mail could not be send
};
