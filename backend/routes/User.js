import { Router } from "express";
const User = Router();
import { Signup, SendOtp, LogIn } from "../controllers/Auth.js";
import { ValidateSignup } from "../middleware/signup-auth-md.js";
import { LoginMd } from "../middleware/login-auth-md.js";

User.post("/signup",ValidateSignup,Signup);
User.post("/otp", SendOtp);
User.post('/login',LoginMd,LogIn)

export default User;
