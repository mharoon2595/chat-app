import jwt, { JwtPayload } from "jsonwebtoken"
import { Response,Request, NextFunction } from "express"
import prisma from "../../db/prisma.js"

interface DecodedToken extends JwtPayload{
    uid:string
}

declare global {
    namespace Express{
export interface Request{
    user:{
        id:string
    }
}
    }
}

const verifyUser=async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Not authortized."})
        }
        const validateUser=jwt.verify(token,process.env.SECRET_KEY!) as DecodedToken

        if(!validateUser){
            return res.status(401).json({error:"Not authortized."})
        }

        const user=await prisma.user.findUnique({where:{id:validateUser.uid}, select:{id:true, username:true, fullname:true}})

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        req.user=user;

      
        next()
    }
    catch(err:any){
        console.log(err)
    }
}

export default verifyUser