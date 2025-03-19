// jwt verify
// is Student
// is Instructor
// is Admin

import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_USER = "3403284903hjfhfuwefhwuiehbjksdflhifhwe8934";

export const Authentication = async (req, res, next) => {
  try {
    // geet token fro cookie
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ succes: false, msg: "Please Signin " });
    }
    // verify token in order to get the data
    const tokenVerify = jwt.verify(token, JWT_USER);
    if (!tokenVerify) {
      return res.status(400).json({ msg: "Sigin in again" });
    }
    // get UserDetails
    const UserDetails = await UserModel.findOne({ _id: tokenVerify._id });

    //change the request object for your middleware

    req.role = UserDetails.accountType;
    req.email = UserDetails.email;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Sever went Down " });
  }
};
