import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// 1️⃣ Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// 2️⃣ Send a test email
transporter.sendMail(
  {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // send to yourself for testing
    subject: "Test Email from NodeMailer",
    html: "<h1>Hello!</h1><p>This is a test email.</p>",
  },
  (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  }
);
