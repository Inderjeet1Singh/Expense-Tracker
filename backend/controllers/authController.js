import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
// new user account creat
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  // email validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  // password validation
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "password must have 8 characters and contain (a-z,A-Z,0-9,one special characters)",
    });
  }
  // finding duplicate
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  //  password hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(201).json({ token });
};

// user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  // finding id present or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // password checking
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};
