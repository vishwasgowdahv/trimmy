import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: ENV.MAIL_HOST,
  port: ENV.MAIL_PORT,
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS,
  },
});

// Email Verification
async function sendVerificationEmail(email, token) {
  const link = `${ENV.BASE_URL}/api/v1/auth/verify-email?token=${token}`;
 
  await transporter.sendMail({
    from: ENV.MAIL_FROM,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome to Trimmy 🚀</h2>
      <p>Please verify your email:</p>
      <a href="${link}">${link}</a>
    `,
  });
}

// Password Reset
async function sendResetEmail(email, token) {
  const link = `${ENV.BASE_URL}/api/v1/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: ENV.MAIL_FROM,
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${link}">${link}</a>
    `,
  });
};


export { sendVerificationEmail, sendResetEmail };