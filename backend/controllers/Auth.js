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
import User from "../routes/User.js";

const JWT_USER = "3403284903hjfhfuwefhwuiehbjksdflhifhwe8934";



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
      //   otp
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

    //Otp Field
    const Otp_Data = await OtpModel.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

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
        UserExist.token = token_value;
        UserExist.password = null;

        // creating a cookie
        res
          .cookie("token", token_value, {
            maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          })
          .status(200)
          .json({ msg: "Token Generated  Successfully" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Down");
  }
};

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
      await OtpModel.create({
        email: UserExist.email,
        otp: OTP,
      });
      res.status(200).json({ success: true, msg: "Otp send to the mail" });
    } else {
      // user already signup
      res.status(404).json({ success: false, msg: "User Already Registered" });
    }
  } catch (err) {
    res.status(502).json({ msg: "Server Down while sending otp" });
  }
};

export const ChangePassword = async (req, res) => {
  try {
    // email frrom middleware
    const email = req.email;
    // getting data from middleware
    const { previous_Pass, newPassword, confirmPassword } = req.body;
    if (!previous_Pass || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Please Fill all the Forms" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Passwords Donot Match" });
    }
    // gettiing User Details
    const UserDetails = await UserModel.findOne({ email });
    // checking previous Password
    const HashingPassword = await bcrypt.compare(
      previous_Pass,
      UserDetails.password
    );
    
    if (HashingPassword) {
        // creating new hashed Password to store in db 
      const HashedPassword = await bcrypt.hash(newPassword, 6);
      UserDetails.password = HashedPassword;
      await UserDetails.save();
      //  showing the result 
      res.status(200).json({ msg: "Password Changed" });
    } else {
      res.status(400).json({ msg: "Password Incorrect" });
    }
  } catch (err) {
    res.status(500).json("Server went down while changing password");
  }
};

export const Route = async (req, res) => {
  const User_email = req.email;
const User=await UserModel.findOne({email:User_email}).populate("additionalDetails")
res.json({User})
};
