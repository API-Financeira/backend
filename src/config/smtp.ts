import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
