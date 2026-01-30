
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";


// generate jwt token
const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};

//register user
export const registerUser = async (req, res) => {
  try {
  const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
if (existingUser) {
  return res.status(400).json({ message: "User already exists", success: false });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal Server error", success: false });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    generateToken(res, { id: user._id, role: user.isAdmin ? "admin" : "user" });

    return res.json({
      message: "User logged in successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server error", success: false });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check credentials
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Generate JWT
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Admin logged in successfully",
      success: true,
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal server error", success: false });
  }
};


export const getProfile = async (req,res) => {
  try {
    
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
      return res.status(404).json({message:"User not found",success:false})
    }
    res.json(user)
  } catch (error) {
     return res.json({ message: "Internal server error", success: false });
  }
}
