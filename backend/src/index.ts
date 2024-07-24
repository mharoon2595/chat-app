import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { Request,Response, NextFunction } from "express";
import cors from "cors"
import { app, server } from "./socket/socket.js";
import cookieParser from "cookie-parser";


app.use(cookieParser())
app.use(cors({
  origin:true,
  credentials: true,
}))

app.use(express.json())


app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)

app.use((req, res, next) => {
  const error = new Error("Unsupported route");
  throw error;
});

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
  
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});

server.listen(3000, () => {
	console.log("Server is running on port " + 3000);
});

