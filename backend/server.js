import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
  connectDB();
  console.log(`Server running on port http://localhost:${port}`);
});
