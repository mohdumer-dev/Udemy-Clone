import mongoose from "mongoose";

import env from 'dotenv'
env.config()

export const ConnectDb=async () => {
    await mongoose.connect(process.env.MONGOOSE_DB)
    .then(()=>{
        console.log('Connection To Database Established')
    }).catch((err)=>{
        console.error(err)
        process.exit(1)
    })
}