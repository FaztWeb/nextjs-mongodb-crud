import { dbConnect } from "utils/mongoose";
import User from "models/User";
import { serialize } from "cookie";

dbConnect();

export default async function registerHandler(req, res) {
  const { body, method } = req;

  if (method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { name, lastname, email, password, confirmPassword } = body;

  if (!name || !lastname || !email || !password || !confirmPassword) {
    return res.status(400).json({
      message: "Name, lastname, email and password are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({
      name,
      lastname,
      email,
      password,
    });
    console.log(user);

    await user.encryptPassword();

    await user.save();

    const token = user.generateToken();

    const serialized = serialize("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "User registered",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
