import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, GraduationCap, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-blue-600">
                <GraduationCap className="w-6 h-6" />
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Browse Courses
              </a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 404 Content */}
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-md">
          {/* 404 Illustration */}
          <div className="space-y-6">
            <div className="text-8xl font-bold text-blue-200">404</div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGoHome}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </button>
            <button 
              onClick={handleGoBack}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              You might be looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Home
              </a>
              <a
                href="/courses"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Browse Courses
              </a>
              <a
                href="/about"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Additional Help */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you believe this is an error, please contact our support team.
            </p>
            <a
              href="/contact"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;