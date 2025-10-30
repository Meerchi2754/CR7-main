import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  Camera,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    education: "",
    profilePhoto: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Prefer localStorage; fallback to sessionStorage
      const userEmail =
        localStorage.getItem("userEmail") ||
        sessionStorage.getItem("userEmail");

      if (!userEmail) {
        setMessage({
          type: "error",
          text: "User email not found. Please login again.",
        });
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/profile/${encodeURIComponent(userEmail)}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        setProfileData(result.data);
        setPreviewImage(result.data.profilePhoto || "");
        // Rehydrate localStorage if missing
        if (!localStorage.getItem("userEmail") && result.data.email) {
          localStorage.setItem("userEmail", result.data.email);
        }
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to fetch profile",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage({ type: "error", text: "Error loading profile data" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage({ type: "", text: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setMessage({ type: "error", text: "Please select a valid image file" });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "Image size should be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewImage(base64String);
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!profileData.username.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }

    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const userEmail =
        localStorage.getItem("userEmail") ||
        sessionStorage.getItem("userEmail") ||
        profileData.email;
      if (!userEmail) {
        setMessage({
          type: "error",
          text: "User email not found. Please login again.",
        });
        setSaving(false);
        return;
      }
      const response = await fetch(
        `http://localhost:3000/api/v1/profile/${encodeURIComponent(userEmail)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        // Update session storage with new username
        sessionStorage.setItem("userName", profileData.username);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Error updating profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-15 -top-[10%] -left-[10%] animate-pulse" />
          <div
            className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px] opacity-15 -bottom-[15%] -right-[15%] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-[#E2E8F0] mb-2">My Profile</h1>
          <p className="text-slate-400">
            Manage your personal information and preferences
          </p>
        </motion.div>

        {/* Message Alert */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p>{message.text}</p>
          </motion.div>
        )}

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1E293B] border border-[#475569] rounded-xl shadow-xl overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            {/* Profile Photo Section */}
            <div className="p-8 border-b border-[#475569]">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-700 border-4 border-blue-500/30">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profilePhoto"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 p-3 rounded-full cursor-pointer transition-colors shadow-lg"
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-[#E2E8F0] mb-2">
                    Profile Photo
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Upload a photo to personalize your profile
                  </p>
                  <p className="text-slate-500 text-xs">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-8 space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#E2E8F0] mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-[#334155] text-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#E2E8F0] mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    className="w-full pl-11 pr-4 py-3 bg-[#1E293B] text-slate-400 border border-[#475569] rounded-xl cursor-not-allowed"
                    disabled
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#E2E8F0] mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-[#334155] text-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-[#E2E8F0] mb-2"
                >
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-[#334155] text-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="United States"
                  />
                </div>
              </div>

              {/* Education Background */}
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-[#E2E8F0] mb-2"
                >
                  Education Background
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <textarea
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-11 pr-4 py-3 bg-[#334155] text-[#F1F5F9] border border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                    placeholder="Bachelor's in Computer Science, Master's in Data Science, etc."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 py-6 bg-[#0F172A] border-t border-[#475569] flex justify-end gap-4">
              <motion.button
                type="button"
                onClick={() => navigate("/home")}
                className="px-6 py-3 border border-[#475569] text-slate-300 rounded-xl hover:bg-[#334155] transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={
                  !saving
                    ? {
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
                      }
                    : {}
                }
                whileTap={!saving ? { scale: 0.98 } : {}}
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
