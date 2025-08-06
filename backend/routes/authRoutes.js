import express from "express";  
import { logout,login,signup, getMe} from "../controllers/authControllers.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/login",login)
router.post("/logout",logout)
router.post("/signup",signup) 
router.get("/me", protectRoute, (req, res) => { 
  res.json(req.user);
});


 export default router;   