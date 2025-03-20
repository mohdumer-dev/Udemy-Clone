//  reset passsword token
//  reset password

import { UserModel } from "../models/User.js";
import { sendMail } from "../utils/nodemailer.js";
import bcrypt from "bcrypt";

export const ResetToken = async (req, res) => {
  // token generate along with expiry in db
  // send email of link to reset password
  // make res

  try {
    // email
    const { email } = req.body;

    // validate email
    if (!email) {
      return res.status(404).json({ msg: "Please enter your Email" });
    }

    //find User
    const UserData = await UserModel.findOne({ email });


    // check  User
    if (!UserData) {
      return res
        .status(400)
        .json({ success: false, msg: "Ther is no User Signed Up" });
    }

    // create token
    const token = crypto.randomUUID();

    // update the value in db

    UserData.token = token;
    UserData.expiresToken = new Date() + 5 * 60 * 1000;
    await UserData.save();

    // make url with token
    const url = `http://localhost/api/v1/resetPassword/${token}`;

    // send token through email
    sendMail(
      UserData.email,
      "Reset password link ",
      `Your Reset Password Link is ${url}`
    );
    // send response
    res
      .status(200)
      .json({ success: true, msg: "Link has been send to you Email ", url });
  } catch (err) {
    res
      .status(500)
      .json({ succes: false, msg: "Server Problem while Resetting Token" });
  }
};

export const ResetPassword = async (req, res) => {

  try {
    // get  data , token , password , confirmPassword
    const { password, confirmPassword, token } = req.body;

    // no token
    if (!token) {
      return res
        .status(400)
        .json({ succes: false, msg: "Please Click on Reset Paassword" });
    }
    // find User using token stored in Db
    const UserDetails = await UserModel.findOne({ token });
    //  if no UserDetails has been found
    if (!UserDetails) {
      return res
        .status(400)
        .json({ succes: false, msg: "Link has been expired " });
    }
    // validate the token from the user adn Db
    if (UserDetails.token !== token) {
      return res
        .status(400)
        .json({ success: false, msg: "Token is not Valid " });
    }
    // validate the expiry as we have store the expiry of Date + 5 min
    //  if the expirestoken time is greater than current time , it meant token has been expired
    else if (UserDetails.expiresToken > Date.now()) {
      return res
        .status(400)
        .json({ success: false, msg: " Token has been expired  " });
    }
    // validate the password
    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Please Fill the Details" });
    }
    // validate the password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Password Donot Match" });
    }
    // create a hash password
    const hashedpassword = await bcrypt.hash(password, 6);
    //  store the hash password inside Db
    UserDetails.password = hashedpassword;
    UserDetails.token=null
    UserDetails.expiresToken=null
    // store the new Datagit 
    await UserDetails.save();
    // send the repsonse
    res.status(200).json({ success: true, msg: " Password has been changed" });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Down while resetting the password",
    });
  }
};
