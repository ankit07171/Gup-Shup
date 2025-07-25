import User from "../models/userModel.js";

const userHandler = async(req,res)=> {
 try {
    const userLoggedIn = req.user._id;
    const allUsers =await User.find({_id : {$ne : userLoggedIn}}).select("-password")
      res.status(200).json(allUsers)
 } catch (error) {
    console.log("Error in userHandler",error);
    res.status(500).json({"Error":"Internal Server Error",error})
    
 } 
}
export default userHandler;