import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/conversations", verifyUser, getUsersForSidebar);
router.get("/:id", verifyUser, getMessages);
router.post("/send/:id", verifyUser, sendMessage);

export default router;

