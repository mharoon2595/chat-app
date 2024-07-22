import express from "express"

const router=express.Router();

router.get("/convos",(req,res)=>{
    res.send("Message sent");
} )

export default router


