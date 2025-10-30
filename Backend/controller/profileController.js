const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// Get user profile by email
const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      // Return a default profile when user isn't present in DB
      const defaultProfile = {
        username: email.split('@')[0] || "",
        email,
        phone: "",
        country: "",
        education: "",
        profilePhoto: ""
      };

      return res.status(200).json({
        success: true,
        message: "Profile retrieved successfully (default)",
        data: defaultProfile
      });
    }

    // Return user data without password
    const userData = {
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      country: user.country || "",
      education: user.education || "",
      profilePhoto: user.profilePhoto || ""
    };

    res.status(200).json({ 
      success: true, 
      message: "Profile retrieved successfully", 
      data: userData 
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching profile", 
      error: error.message 
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const { username, phone, country, education, profilePhoto } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create user if not exists to support profile upsert from UI-only auth flow
      const tempPassword = await bcrypt.hash(`${email}-${Date.now()}`, 10);
      user = new User({
        username: username || (email.split('@')[0] || ""),
        email,
        password: tempPassword,
        phone: phone || "",
        country: country || "",
        education: education || "",
        profilePhoto: profilePhoto || "",
      });
      await user.save();
    }

    // Update only provided fields
    if (username !== undefined) user.username = username;
    if (phone !== undefined) user.phone = phone;
    if (country !== undefined) user.country = country;
    if (education !== undefined) user.education = education;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;

    await user.save();

    // Return updated user data without password
    const userData = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      country: user.country,
      education: user.education,
      profilePhoto: user.profilePhoto
    };

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully", 
      data: userData 
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating profile", 
      error: error.message 
    });
  }
};

module.exports = { getUserProfile, updateUserProfile };
