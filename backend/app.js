import express from 'express'
import cookieParser from 'cookie-parser'
const  app =express()

// Middlewares
app.use(express.json())
app.use(cookieParser())


//  Routes

//user//
import User from './routes/User.js'
app.use('/api/v1',User)

// instrcutor//
import Instrcutor from './routes/Instrcutor.js'
app.use('/api/v1',Instrcutor)


// Port
app.listen(4000,()=>{
    console.log("Server Working fine")
})


// Database
import {ConnectDb} from './config/db.js'
ConnectDb()
