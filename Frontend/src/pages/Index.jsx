import { motion } from "framer-motion";
import { ArrowRight, LogIn, UserPlus, BookOpen, Sparkles, GraduationCap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import "./Index.css";

export default function Index() {
  return (
    <div className="index-container">
      {/* Animated Background Elements */}
      <div className="index-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="index-hero"
      >
        <div className="flex flex-col items-center">
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="index-icon-badge"
          >
            <BookOpen className="w-10 h-10" style={{ color: '#3B82F6' }} />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="index-title"
          >
            Welcome to <span className="index-title-highlight">EduVerse</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="index-subtitle"
          >
            Your personalized learning platform — sign up today and start exploring
            interactive lessons, progress tracking, and a community of learners.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="index-features"
          >
            <div className="feature-pill">
              <Sparkles className="w-4 h-4" style={{ color: '#60A5FA' }} />
              <span>AI-Powered</span>
            </div>
            <div className="feature-pill">
              <GraduationCap className="w-4 h-4" style={{ color: '#34D399' }} />
              <span>Expert Curated</span>
            </div>
            <div className="feature-pill">
              <TrendingUp className="w-4 h-4" style={{ color: '#A78BFA' }} />
              <span>Track Progress</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link to="/login">
              <AuthButton icon={<LogIn className="w-5 h-5" />} text="Login" primary />
            </Link>

            <Link to="/signup">
              <AuthButton icon={<UserPlus className="w-5 h-5" />} text="Sign Up" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="index-footer"
      >
        © {new Date().getFullYear()} EduVerse. All rights reserved.
      </motion.footer>
    </div>
  );
}

/* -----------------------------------------------------------
   AuthButton Component
----------------------------------------------------------- */
function AuthButton({ icon, text, primary = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={primary ? "index-button-primary" : "index-button-secondary"}
    >
      {icon}
      {text}
      {primary && <ArrowRight className="w-4 h-4" />}
    </motion.button>
  );
}
