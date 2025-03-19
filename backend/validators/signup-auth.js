import {  z } from "zod";

const SignValidation=z.object({
    email:z.string().email().max(70).min(15).trim(),
    firstname:z.string().max(40).min(2).trim(),
    lastname:z.string().max(40).min(2).trim(),
    accountType:z.enum(['Student','Instructor','Admin']),
    image:z.string().url(),
    password:z.string().min(5).max(24).trim(),
    confirmPassword:z.string().min(5).max(24).trim()
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password Donot Match",
    path:['confirmPassword']
})

export default SignValidation