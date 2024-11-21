import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = emailRegex.test(email);
    if (!isCheckEmail) {
      return res.status(400).json({
        success: false,
        message: "Invalid email!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters!",
      });
    }

    const checkEmailExisted = await User.findOne({ email: email });
    if (checkEmailExisted) {
      return res.status(400).json({
        success: false,
        message: "This email already exist!",
      });
    }

    const checkUsernameExisted = await User.findOne({ username: username });
    if (checkUsernameExisted) {
      return res.status(400).json({
        success: false,
        message: "This username already exist!",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_AVT = [
      "/avatar-1.png",
      "/avatar-2.png",
      "/avatar-3.png",
      "/avatar-4.png",
    ];
    const image = PROFILE_AVT[Math.floor(Math.random() * PROFILE_AVT.length)];

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    // Remove password from res
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
}

export async function login(req, res) {
  res.send("login route");
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
}
