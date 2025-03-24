import { Router } from "express";
const User = Router();
import {
  Signup,
  SendOtp,
  LogIn,
  Route,
  ChangePassword,
} from "../controllers/Auth.js";
import { ValidateSignup } from "../middleware/signup-auth-md.js";
import { ValidateLogin } from "../middleware/login-auth-md.js";
import { Authentication, IsStudent } from "../middleware/Auth.js";
import { ResetToken, ResetPassword } from "../controllers/resetPassword.js";

//  Admin Category
import { createCategory } from "../controllers/Category.js";


// Unprotected Route

User.post("/signup", ValidateSignup, Signup);
User.post("/otp", SendOtp);
User.post("/login", ValidateLogin, LogIn);
User.post("/resetToken", ResetToken);
User.post("/resetPassword", ResetPassword);

// Protected Route
User.get("/", Authentication, IsStudent, Route);
User.post("/changePassword", Authentication, ChangePassword);

// Category Admin
User.post("/Category",createCategory );


export default User;
