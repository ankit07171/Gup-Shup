import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const maleAvatars = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Max",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Kai",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Tom",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sam",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jay",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Eli",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Ben"
];

const femaleAvatars = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Ava",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Nora",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Aria",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Ella",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Ivy",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Rose"
];

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
 
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password mismatch" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const randomAvatar =
      gender === "male"
        ? maleAvatars[Math.floor(Math.random() * maleAvatars.length)]
        : femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashPass,
      gender,
      profilePic: randomAvatar,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
    });
    
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body; 
    const user = await User.findOne({ username });

    if (!user) {return res.status(400).json({ error: "Invalid credentials" });}
 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {return res.status(400).json({ error: "Invalid credentials" });}

     
    generateToken(user._id, res);

    return res.status(200).json({
      msg: "User verified successfully",
      user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,   
        profilePic: user.profilePic
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = (req, res) => {
	try {
		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "Lax", // or "None" if you're using cross-origin
			secure: process.env.NODE_ENV, // true in production (HTTPS)
		});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const getMe = async (req, res) => {
	try {
		const user = req.user; 
		res.status(200).json({ user });
	} catch (err) {
		console.error("Error in /me route:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
