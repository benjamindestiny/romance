import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // temporary default sender
      to,
      subject,
      html,
    });

    return data;
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
};
