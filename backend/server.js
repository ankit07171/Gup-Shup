import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoute.js";

import connectToMongoDB from "./db/mongooseConnection.js";
import { app, server } from "./socket/socket.js";

dotenv.config(); 

const __dirname = path.resolve(); 
const PORT = process.env.PORT || 5000;

app.use(express.json());  
app.use(cookieParser()); 

app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes); 
 

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, async() => {
    try {
    await connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
});
