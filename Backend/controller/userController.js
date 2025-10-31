const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const axios = require("axios"); // 👈 For sending webhook request

// Use environment variable for flexibility
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "https://miiet.app.n8n.cloud/webhook/user-login";

// ✅ Helper: Generate JWT Token and send response
const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(statusCode).json({
    success: true,
    message,
    token,
    userId: user._id,
  });
};

// ✅ Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Error creating user", error });
  }
};

// ✅ Login User (with n8n webhook trigger)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid password" });

    // ✅ Non-blocking n8n webhook trigger
    (async () => {
      try {
        console.log("Sending login info to n8n webhook...");
        const response = await axios.post(
          N8N_WEBHOOK_URL,
          {
            userId: user._id,
            name: user.username,
            email: user.email,
            loginTime: new Date().toISOString(),
          },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 5000, // avoid long hang times
          }
        );
        console.log("n8n webhook triggered:", response.status, response.data);
      } catch (err) {
        console.error("n8n webhook failed:", err.response?.data || err.message);
      }
    })();

    // ✅ Send response to frontend
    generateToken(user, "Login Successful!", 200, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

// ✅ Logout User
const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now()),
    });
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging out user",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
