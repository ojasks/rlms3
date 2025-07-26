import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/AppIcon';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Updated mock credentials with form assignments for group heads
  const mockCredentials = {
    'admin@securelab.com': { 
      password: 'admin123', 
      role: 'admin', 
      name: 'Dr. Sarah Johnson',
      formAccess: 'all'
    },
    'grouphead1@securelab.com': { 
      password: 'group123', 
      role: 'group_head', 
      name: 'Prof. Michael Chen',
      formAccess: 'form1'
    },
    'grouphead2@securelab.com': { 
      password: 'group123', 
      role: 'group_head', 
      name: 'Dr. Alice Thompson',
      formAccess: 'form2'
    },
    'grouphead3@securelab.com': { 
      password: 'group123', 
      role: 'group_head', 
      name: 'Prof. Robert Wilson',
      formAccess: 'form3'
    },
    'user@securelab.com': { 
      password: 'user123', 
      role: 'normal', 
      name: 'Dr. Emily Rodriguez',
      formAccess: null
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = mockCredentials[formData.email];
      
      if (user && user.password === formData.password) {
        // Store user data with role-based access
        const userData = {
          email: formData.email,
          name: user.name,
          role: user.role,
          formAccess: user.formAccess,
          macAddress: '00:1B:44:11:3A:B7',
          ipAddress: '192.168.1.100',
          network: 'SecureLab-Network',
          loginTime: new Date().toISOString()
        };
        
        login(userData);
        
        // Role-based navigation
        if (user.role === 'normal') {
          navigate('/dashboard-home');
        } else if (user.role === 'group_head' || user.role === 'admin') {
          navigate('/response-analytics');
        }
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Please contact your system administrator for password reset.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-accent-50 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-surface rounded-lg shadow-lg border border-border p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-lg mx-auto mb-4">
              <Icon name="Microscope" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">SecureLab Dashboard</h1>
            <p className="text-text-secondary text-sm">
              Sign in to access your research lab portal
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-error-50 border border-error-200 rounded-md p-3 flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error-500 flex-shrink-0" />
                <span className="text-sm text-error-700">{errors.general}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.email ? 'border-error-300 bg-error-50' : 'border-border bg-surface'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
                <Icon 
                  name="Mail" 
                  size={18} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    errors.email ? 'text-error-400' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.password ? 'border-error-300 bg-error-50' : 'border-border bg-surface'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <Icon 
                  name="Lock" 
                  size={18} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    errors.password ? 'text-error-400' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  disabled={isLoading}
                />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Role Information */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-text-secondary mb-3">Access Levels Available:</p>
              <div className="flex justify-center space-x-4 text-xs mb-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-text-secondary">Normal User</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                  <span className="text-text-secondary">Group Head</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-text-secondary">Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-accent-50 border border-accent-200 rounded-md p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent-800 mb-1">Demo Credentials:</p>
              <div className="space-y-1 text-accent-700">
                <p><strong>Admin:</strong> admin@securelab.com / admin123</p>
                <p><strong>Group Head 1:</strong> grouphead1@securelab.com / group123</p>
                <p><strong>Group Head 2:</strong> grouphead2@securelab.com / group123</p>
                <p><strong>Normal User:</strong> user@securelab.com / user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
          <button className="hover:text-text-primary transition-colors duration-200">
            Contact Support
          </button>
          <span>•</span>
          <button className="hover:text-text-primary transition-colors duration-200">
            Privacy Policy
          </button>
          <span>•</span>
          <span>© {new Date().getFullYear()} SecureLab Systems</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginScreen;