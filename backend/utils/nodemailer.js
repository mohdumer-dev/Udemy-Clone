import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

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

// email , title , body
const mailOption = (email, title, body) => ({
  from: {
    name: "StudyNass",
    address: process.env.MAILER_USER,
  },
  to: email,

  text: title,
  html: body,
});

export const sendMail = async (email, title, body) => {
  try {
    const info = await transporter.sendMail(mailOption(email, title, body));
    console.log("Email sent  successfully : %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
