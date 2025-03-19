import LoginAuthenication from "../validators/login-auth.js"

export const ValidateLogin=async (req,res,next) => {
    try{
        const {success,error}=await LoginAuthenication.safeParseAsync(req.body)
        if(!success){
            return res.status(400).json({success:false,msg:error.errors})
        }
        next()

    }catch{
        res.status(500).json({msg:"Server Down"})
    }
}