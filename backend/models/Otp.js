import mongoose from "mongoose";
const Schema=mongoose.Schema
const ObjectId=mongoose.Schema.ObjectId
import { sendMail } from "../utils/nodemailer.js";

const OtpSchema=new Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }

})


// before saving the doc do this 

OtpSchema.pre('save',async (next) => {
    await sendMail(this.email,this.otp)
    next()
})


export const OtpModel=mongoose.model('OTP',OtpSchema)

