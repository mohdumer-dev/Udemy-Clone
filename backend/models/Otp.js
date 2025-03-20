import mongoose from "mongoose";
const Schema=mongoose.Schema
import { sendMail } from "../utils/nodemailer.js";

const OtpSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60
    }

})


// before saving the doc do this 

OtpSchema.pre('save',async function(next) {
    await sendMail(this.email,"Verification Otp from StudyNass",`<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">Verify Your Account</h2>
      <p>Dear User,</p>
      <p>Your One-Time Password (OTP) for account verification is:</p>
      <p style="font-size: 24px; font-weight: bold; color: #007bff;">${this.otp}</p>
      <p>Please enter this code to complete your verification. This OTP is valid for a limited time.</p>
      <p>If you did not request this, please ignore this email.</p>
      <hr>
      <p style="color: #777;">Best regards,</p>
      <p style="font-weight: bold;">[Your Company Name]</p>
    </div>`)
    next()
})


export const OtpModel=mongoose.model('OTP',OtpSchema)

