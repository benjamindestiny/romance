// ====================== sendEmail.js (UPDATED with Nodemailer + Gmail) 
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter once (best practice)
const transporter = nodemailer.createTransport({
  service: "gmail",                    
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test transporter on startup (helps catch errors early)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail transporter error:", error);
  } else {
    console.log("✅ Gmail email service is ready!");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Romance App" <${process.env.EMAIL_USER}>`, // pretty sender name
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to} | Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Nodemailer error:", error);
    throw error;
  }
};