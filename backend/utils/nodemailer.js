import nodemailer from "nodemailer";
import env from 'dotenv'
env.config()

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_HOST,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOption = (email, otp) => ({
  from: {
    name: "StudyNass",
    address: process.env.MAILER_USER,
  },
  to: email,

  text: "Verification Otp from StudyNass",
  html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  <h2 style="color: #333;">Verify Your Account</h2>
  <p>Dear User,</p>
  <p>Your One-Time Password (OTP) for account verification is:</p>
  <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
  <p>Please enter this code to complete your verification. This OTP is valid for a limited time.</p>
  <p>If you did not request this, please ignore this email.</p>
  <hr>
  <p style="color: #777;">Best regards,</p>
  <p style="font-weight: bold;">[Your Company Name]</p>
</div>
`,
});

export const sendMail = async (email, otp) => {
  try {
    const info = await transporter.sendMail(mailOption(email, otp));
    console.log("Email sent  successfully : %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err
  }
};


