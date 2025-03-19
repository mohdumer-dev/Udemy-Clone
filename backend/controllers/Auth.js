// signup
// sigin
// Otp
// change password

import { UserModel } from "../models/User.js";
import { OtpModel } from "../models/Otp.js";
import otpGenerator from "otp-generator";
import { sendMail } from "../utils/nodemailer.js";
import SignValidation from "../validators/signup-auth.js";

export const SendOtp = async (req, res) => {
  try {
    // email
    const { email } = req.body;
    // check user exist
    const UserExist = await UserModel.findOne({
      email,
    });
    // user first time signup
    if (!UserExist) {
      const OTP = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      const data = await OtpModel.create({
        email: UserExist.email,
        otp: OTP,
      });
      console.log(data);
      res.status(200).json({ success: true, msg: "Otp send to gthe mail" });
    } else {
      // user already signup
      res.status(404).json({ success: false, msg: "User Already Registered" });
    }
  } catch (err) {
    res.status(502).json({ msg: "Server Down while sending otp" });
  }
};

export const Signup = async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      password,
      confirmPassword,
      accountType,
      image,
    } = req.body;

    if (
      !email ||
      !firstname ||
      !lastname ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !image
    ) {
      return res
        .status(403)
        .json({ success: false, msg: "All filed are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(403)
        .json({ success: false, msg: " Password inCorrect" });
    }
    const User = await UserModel.create({
      email,
      firstname,
      lastname,
      password,
      accountType,
      image,
    });
    res.status(200).json({ msg: "User created Succesfully" });
  } catch (err) {
    res.status(502).json({ msg: "Server Down while Signup" });
  }
};
