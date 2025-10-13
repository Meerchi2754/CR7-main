import { motion } from "framer-motion";
import { ArrowRight, LogIn, UserPlus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import "./Index.css";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-full shadow-md mb-6">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">EduVerse</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Your personalized learning platform — sign up today and start exploring
            interactive lessons, progress tracking, and a community of learners.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <AuthButton icon={<LogIn className="w-5 h-5" />} text="Login" primary />
            </Link>

            <Link to="/signup">
              <AuthButton icon={<UserPlus className="w-5 h-5" />} text="Sign Up" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-16 text-sm text-gray-500"
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
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-sm
        ${primary
          ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
        }`}
    >
      {icon}
      {text}
      {primary && <ArrowRight className="w-4 h-4" />}
    </motion.button>
  );
}
