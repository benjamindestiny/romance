// ====================== sendEmail.js (NOW WITH FULL DEBUG LOGS) ======================
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("📧 Loading Gmail settings...");
console.log("EMAIL_USER =", process.env.EMAIL_USER ? "✅ SET" : "❌ MISSING");
console.log("EMAIL_PASSWORD =", process.env.EMAIL_PASSWORD ? "✅ SET" : "❌ MISSING");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test connection on startup (this will show exact error)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ GMAIL TRANSPORTER FAILED:", error.message);
    console.error("   → Possible causes: Wrong App Password, 2FA not enabled, or .env not loaded on Railway");
  } else {
    console.log("✅ Gmail is READY and working!");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(`📤 Attempting to send email to: ${to}`);

    const info = await transporter.sendMail({
      from: `"Romance App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ EMAIL SENT SUCCESSFULLY to ${to} | Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ EMAIL FAILED for", to);
    console.error("   Error code:", error.code);
    console.error("   Error message:", error.message);
    console.error("   Full error:", error);
    throw error;
  }
};