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


// Unprotected Route

User.post("/signup", ValidateSignup, Signup);
User.post("/otp", SendOtp);
User.post("/login", ValidateLogin, LogIn);


// Protected Route
User.get("/", Authentication, IsStudent, Route);
User.post("/changePassword", Authentication, ChangePassword);

export default User;
