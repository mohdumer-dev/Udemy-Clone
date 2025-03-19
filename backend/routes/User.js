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
import { LoginMd } from "../middleware/login-auth-md.js";
import { Authentication } from "../middleware/Auth.js";

User.post("/signup", ValidateSignup, Signup);
User.post("/otp", SendOtp);
User.post("/login", LoginMd, LogIn);
User.get("/", Authentication, Route);
User.post("/changePassword", Authentication, ChangePassword);

export default User;
