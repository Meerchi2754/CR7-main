import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertCircle, Compass, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 -top-[20%] -left-[10%] animate-pulse" />
          <div className="absolute w-[600px] h-[600px] bg-purple-500 rounded-full blur-[120px] opacity-20 -bottom-[20%] -right-[10%] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[120px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      {/* 404 Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Icon & Number */}
            <motion.div
              className="space-y-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <AlertCircle className="w-24 h-24 text-blue-400 relative z-10" />
                </div>
              </div>
              
              <motion.div
                className="text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                404
              </motion.div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#E2E8F0]">
                Page Not Found
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={handleGoHome}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                Go to Home
              </motion.button>
              
              <motion.button
                onClick={handleGoBack}
                className="bg-[#1E293B] hover:bg-[#334155] border border-[#475569] text-[#E2E8F0] px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </motion.button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-[#1E293B] border border-[#475569] rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-[#E2E8F0]">
                    Quick Navigation
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link
                    to="/"
                    className="bg-[#334155] hover:bg-[#475569] text-slate-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-center"
                  >
                    Home
                  </Link>
                  <Link
                    to="/courses"
                    className="bg-[#334155] hover:bg-[#475569] text-slate-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-center"
                  >
                    Courses
                  </Link>
                  <Link
                    to="/history"
                    className="bg-[#334155] hover:bg-[#475569] text-slate-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-center"
                  >
                    History
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-[#334155] hover:bg-[#475569] text-slate-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-center"
                  >
                    Contact
                  </Link>
                </div>

                {/* Help Section */}
                <div className="mt-8 pt-6 border-t border-[#475569]">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Search className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-400">
                      Still can't find what you're looking for?
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors inline-flex items-center gap-1"
                  >
                    Contact Support
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Error Path Info */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-xs text-slate-600">
                Attempted path: <code className="bg-[#1E293B] px-2 py-1 rounded text-slate-400">{location.pathname}</code>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;