import express from "express";
import userHandler from "../controllers/userHandler.js"
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router()

router.get("/",protectRoute,userHandler); 

export default router;

