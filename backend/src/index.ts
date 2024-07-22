import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app=express();
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("api/messages", messageRoutes)

app.listen(3000,()=>{
 console.log("Server is running!")
})

