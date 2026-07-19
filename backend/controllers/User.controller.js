import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// * Register - /api/user/register
export async function register(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.json({ success: false, message: "Missing Field" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return response.json({ success: false, message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, message: error.message });
  }
}

// * Login - /api/user/login
export async function login(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password)
      return response.json({ success: false, message: "Missing Field" });

    const user = await User.findOne({ email });

    if (!user)
      return response.json({
        success: false,
        message: "User not registered",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return response.json({ success: false, message: "Incorrect Password." });

    const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, message: error.message });
  }
}

// * Check Auth - /api/user/is-auth
export async function isAuth(request, response) {
  try {
    const { userId } = request.body;
    const user = await User.findById(userId).select("-password");
    return response.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, message: error.message });
  }
}

export async function logout(request, response) {
  try {
    response.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "strict",
    });
    return response.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, message: error.message });
  }
}
