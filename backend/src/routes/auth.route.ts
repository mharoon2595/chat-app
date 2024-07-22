import express from "express"
import verifyUser from "../middleware/verifyUser.js";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/login", login)

router.post("/logout", logout)

router.post("/signup", signup)

router.get("/me",verifyUser,getMe)

export default router