import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";
import { ENV } from "../config/env.js";
import { ApiResponse } from "../utils/api-response.js";

// Signup
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser(name, email, hashedPassword);

    const token = jwt.sign({ id: userId }, ENV.JWT_SECRET);

    res.status(201).json(new ApiResponse(200,token, { message: "user created" }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, ENV.JWT_SECRET);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { signup, login };