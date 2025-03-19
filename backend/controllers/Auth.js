// signup
// sigin
// Otp
// change password

import { UserModel } from "../models/User.js";
import { OtpModel } from "../models/Otp.js";
import otpGenerator from "otp-generator";
import { sendMail } from "../utils/nodemailer.js";
import { ProfileModel } from "../models/Profile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_USER = "3403284903hjfhfuwefhwuiehbjksdflhifhwe8934";

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
      phone_number,
    } = req.body;

    if (
      !email ||
      !firstname ||
      !lastname ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res
        .status(403)
        .json({ success: false, msg: "All filed are required" });
    }
    // check password
    if (password !== confirmPassword) {
      return res
        .status(403)
        .json({ success: false, msg: " Password inCorrect" });
    }

    // user already register
    const ExistingUser = await UserModel.findOne({ email });
    if (ExistingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already register" });
    }

    //Otp Field pending here

    //hased the pasword
    const hashedPassword = await bcrypt.hash(confirmPassword, 6);
    console.log(hashedPassword);

    // Additional Details
    const Profile = await ProfileModel.create({
      contactNumber: phone_number,
      dateofbirth: null,
      gender: null,
    });

    // create the user
    const User = await UserModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      accountType,
      additionalDetails: Profile._id,
      image: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random`,
    });
    res.status(200).json({ User, msg: "User created Succesfully" });
  } catch (err) {
    res.status(502).json({ msg: "Server Down while Signup" });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User already exist
    const UserExist = await UserModel.findOne({ email });

    if (!UserExist) {
      return res
        .status(400)
        .json({ success: false, msg: "Please Signup in order to Login" });
    }

    if (UserExist) {

        // hashing password
      const passwordHash = await bcrypt.compare(password, UserExist.password);
      if (!passwordHash) {
        return res
          .status(400)
          .json({ succes: false, msg: "Email or Password is Incorrect" });
      } else {

        // creating a packet for jwt
        const packet = { _id: UserExist._id };

        // creating token  
        const token_value = jwt.sign(packet, JWT_USER, { expiresIn: "7d" });

        // creating a cookie 
        res
          .cookie("token", token_value, {
            maxAge: Date.now() + 60 * 60 * 7 * 1000,
            httpOnly: true,
          })
          .json({ msg: "Token Generated  Successfully" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Down");
  }
};
