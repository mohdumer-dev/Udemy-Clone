import express from 'express'
const  app =express()

app.use(express.json())


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
