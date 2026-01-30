import nodemailer from "nodemailer";
import { env } from "../config";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const sendEmail = async (
  email: string,
  subject: string,
  html: string,
  text: string,
) => {
  const info = await transporter.sendMail({
    from: '"Bloom" <noreply@bloom.com>',
    to: email,
    subject: subject,
    text: text, // Plain-text version of the message
    html: html, // HTML version of the message
  });
};

export default sendEmail;
