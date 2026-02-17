import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "benjamindestiny449@gmail.com", // replace with your Gmail to receive test
      subject: "Railway Test Email",
      html: "<h3>This is a test email from Railway deployment!</h3>",
    });
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendTestEmail();
