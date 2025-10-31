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
        profilePhoto: "",
        bio: "",
        occupation: "",
        dateOfBirth: ""
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
      profilePhoto: user.profilePhoto || "",
      bio: user.bio || "",
      occupation: user.occupation || "",
      dateOfBirth: user.dateOfBirth || "",
      linkedinUrl: user.linkedinUrl || "",
      githubUrl: user.githubUrl || "",
      portfolioUrl: user.portfolioUrl || ""
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
    const { username, phone, country, education, profilePhoto, bio, occupation, dateOfBirth, linkedinUrl, githubUrl, portfolioUrl } = req.body;
    
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
        bio: bio || "",
        occupation: occupation || "",
        dateOfBirth: dateOfBirth || "",
        linkedinUrl: linkedinUrl || "",
        githubUrl: githubUrl || "",
        portfolioUrl: portfolioUrl || "",
      });
      await user.save();
    }

    // Validate bio length if provided
    if (bio !== undefined && bio.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Bio must be less than 500 characters"
      });
    }

    // Update only provided fields
    if (username !== undefined) user.username = username;
    if (phone !== undefined) user.phone = phone;
    if (country !== undefined) user.country = country;
    if (education !== undefined) user.education = education;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;
    if (bio !== undefined) user.bio = bio;
    if (occupation !== undefined) user.occupation = occupation;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;
    if (githubUrl !== undefined) user.githubUrl = githubUrl;
    if (portfolioUrl !== undefined) user.portfolioUrl = portfolioUrl;

    await user.save();

    // Return updated user data without password
    const userData = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      country: user.country,
      education: user.education,
      profilePhoto: user.profilePhoto,
      bio: user.bio,
      occupation: user.occupation,
      dateOfBirth: user.dateOfBirth,
      linkedinUrl: user.linkedinUrl,
      githubUrl: user.githubUrl,
      portfolioUrl: user.portfolioUrl
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

// Update user password
const updatePassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters"
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    // Hash new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      success: false,
      message: "Error updating password",
      error: error.message
    });
  }
};

module.exports = { getUserProfile, updateUserProfile, updatePassword };
