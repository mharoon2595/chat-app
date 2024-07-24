import jwt from "jsonwebtoken"
import { Response } from 'express'


const generateToken=(uid: String, res:Response)=>{
    const token=jwt.sign({uid},process.env.SECRET_KEY!,{
        expiresIn:'1h'
    })

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:60*60*1000,
        sameSite:"none",
        // secure:process.env.NODE_ENV!=="development"
    })
    
    return token
}


export default generateToken

