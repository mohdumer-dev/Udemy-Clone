import { Router } from "express";
const User = Router();
import { Signup, SendOtp } from "../controllers/Auth.js";
import { ValidateSignup } from "../middleware/signup-auth-md.js";

User.post("/signup",ValidateSignup,Signup);
User.post("/otp", SendOtp);

export default User;
