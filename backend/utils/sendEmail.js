import { Resend } from "resend";

console.log("API KEY:", process.env.RESEND_API_KEY);


if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
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
