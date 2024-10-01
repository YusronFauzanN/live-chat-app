import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { authenticationMiddleware } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/send/:userId", authenticationMiddleware, sendMessage);
router.get("/:userId", authenticationMiddleware, getMessages);

export default router;
