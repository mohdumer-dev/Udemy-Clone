import mongoose from "mongoose";
const Schema=mongoose.Schema
const ObjectId=mongoose.Schema.ObjectId

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



export const OtpModel=mongoose.model('OTP',OtpSchema)

// no samaj  aya 