import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: ENV.MAIL_HOST,
  port: ENV.MAIL_PORT,
  secure: false,
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
  // Point to the Frontend UI page
  const link = `${ENV.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: ENV.MAIL_FROM,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">Password Reset 🔒</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
          We received a request to reset your password for your Trimmy account. 
          Click the button below to set a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 12px;">
          If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} Trimmy. All rights reserved.
        </p>
      </div>
    `,
  });
}

export { sendVerificationEmail, sendResetEmail };
