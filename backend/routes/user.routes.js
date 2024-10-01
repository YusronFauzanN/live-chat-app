import express from "express";
import { authenticationMiddleware } from "../middleware/authentication.middleware.js";
import { getUsersChatWith } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authenticationMiddleware, getUsersChatWith);

export default router;
