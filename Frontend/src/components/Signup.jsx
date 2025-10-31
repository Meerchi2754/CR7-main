import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import './Signup.css';

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const passwordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: 'bg-red-500' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 1) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (strength === 2) return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (strength === 3) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setServerError('');

    try {
      // Make actual API call to backend
      const response = await fetch('http://localhost:3000/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Registration successful, now auto-login the user
      const loginResponse = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error('Registration successful but auto-login failed. Please login manually.');
      }

      // Store token and user info from login response
      sessionStorage.setItem('token', loginData.token);
      sessionStorage.setItem('userId', loginData.userId);
      sessionStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);
      sessionStorage.setItem('userEmail', formData.email);

      // Navigate to home page
      navigate('/home');

    } catch (error) {
      setServerError(error.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Start your learning journey today</p>
        </div>

        {serverError && (
          <div className="signup-error">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F87171' }} />
            <p className="signup-error-text">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="signup-label">
              Full Name
            </label>
            <div className="signup-input-wrapper">
              <div className="signup-input-icon">
                <User className="h-5 w-5" style={{ color: '#94A3B8' }} />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`signup-input ${errors.name ? 'signup-input-error' : 'signup-input-normal'}`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="password-error">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="signup-label">
              Email Address
            </label>
            <div className="signup-input-wrapper">
              <div className="signup-input-icon">
                <Mail className="h-5 w-5" style={{ color: '#94A3B8' }} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`signup-input ${errors.email ? 'signup-input-error' : 'signup-input-normal'}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="password-error">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="signup-label">
              Password
            </label>
            <div className="signup-input-wrapper">
              <div className="signup-input-icon">
                <Lock className="h-5 w-5" style={{ color: '#94A3B8' }} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`signup-input ${errors.password ? 'signup-input-error' : 'signup-input-normal'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="signup-eye-button"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" style={{ color: '#94A3B8' }} />
                ) : (
                  <Eye className="h-5 w-5" style={{ color: '#94A3B8' }} />
                )}
              </button>
            </div>

            {formData.password && (
              <div className="password-strength">
                <div className="password-bar-container">
                  <div className="password-bar">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.strength}%` }}
                    />
                  </div>
                  <span className="password-text">{strength.text}</span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="password-error">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="signup-label">
              Confirm Password
            </label>
            <div className="signup-input-wrapper">
              <div className="signup-input-icon">
                <Lock className="h-5 w-5" style={{ color: '#94A3B8' }} />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`signup-input ${errors.confirmPassword ? 'signup-input-error' : 'signup-input-normal'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="signup-eye-button"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" style={{ color: '#94A3B8' }} />
                ) : (
                  <Eye className="h-5 w-5" style={{ color: '#94A3B8' }} />
                )}
              </button>
            </div>

            {formData.confirmPassword &&
              !errors.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <p className="password-match">
                  <CheckCircle2 className="w-4 h-4" />
                  Passwords match
                </p>
              )}
            {errors.confirmPassword && (
              <p className="password-error">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="signup-terms">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="signup-checkbox"
              required
            />
            <label htmlFor="terms" className="signup-terms-label">
              I agree to the{' '}
              <a href="/terms" className="signup-footer-link">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="signup-footer-link">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="signup-button"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="signup-spinner" />
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="signup-divider">
          <div className="signup-divider-line">
            <div className="signup-divider-border" />
          </div>
        </div>

        {/* Footer */}
        <div className="signup-footer">
          <p className="signup-footer-text">
            Already have an account?{' '}
            <a href="/login" className="signup-footer-link">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;