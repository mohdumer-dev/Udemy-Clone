// jwt verify
// is Student
// is Instructor
// is Admin

import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_USER = "3403284903hjfhfuwefhwuiehbjksdflhifhwe8934";

export const Authentication = async (req, res, next) => {
  try {
    // geet token from cookie or header
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ","");
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

export const IsStudent =async (req,res,next) => {
    try{
        // check the role by authentication md by  req.role
        const accountType=req.role
        if(accountType==='Student'){
            next()
        }else{
            return res.status(400).json({sucess:false,msg:"Protected Student Route"})
        }

    }catch(err){
        res.status(400).json({msg:"Server Down  For Student Md"})
    }
    
}

export const isInstructor =async (req,res,next) => {
    try{
           // check the role by authentication md by  req.role
        const accountType=req.role
        if(accountType==='Instructor'){
            next()
        }else{
            return res.status(400).json({sucess:false,msg:"Protected Instructor Route"})
        }

    }catch(err){
        res.status(400).json({msg:"Server Down  For Instrcutor Md"})
    }
    
}