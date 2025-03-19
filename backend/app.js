import express from 'express'
import cookieParser from 'cookie-parser'
const  app =express()

// Middlewares
app.use(express.json())
app.use(cookieParser())


//  Routes
import User from './routes/User.js'
app.use('/api/v1',User)


// Port
app.listen(4000,()=>{
    console.log("Server Working fine")
})


// Database
import {ConnectDb} from './config/db.js'
ConnectDb()
