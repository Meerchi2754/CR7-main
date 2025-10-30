import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, LogOut } from "lucide-react";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    // Redirect to index page
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#0F172A] border-b border-[#475569] sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center gap-1 text-blue-500">
              <GraduationCap className="w-6 h-6" />
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-[#E2E8F0]">EduVerse</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="/home" 
              className={`${
                isActive('/home') 
                  ? 'text-blue-500 font-semibold' 
                  : 'text-[#E2E8F0] hover:text-blue-400'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="/courses" 
              className={`${
                isActive('/courses') 
                  ? 'text-blue-500 font-semibold' 
                  : 'text-slate-300 hover:text-blue-400'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Courses
            </motion.a>
            <motion.a 
              href="/history" 
              className={`${
                isActive('/history') 
                  ? 'text-blue-500 font-semibold' 
                  : 'text-slate-300 hover:text-blue-400'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              History
            </motion.a>
            <motion.a 
              href="/profile" 
              className={`${
                isActive('/profile') 
                  ? 'text-blue-500 font-semibold' 
                  : 'text-slate-300 hover:text-blue-400'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Profile
            </motion.a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/30"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            ) : (
              <>
                <motion.a
                  href="/login"
                  className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
