import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Header = ({ user, onLogout, onToggleSidebar, isSidebarCollapsed }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-header bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Sidebar Toggle */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} />
          </button>
        </div>

        {/* Center Section - System Title (Hidden on mobile) */}
        <div className="hidden md:flex items-center">
          <h1 className="text-lg font-semibold text-text-primary">
            Research Lab Management System
          </h1>
        </div>

        {/* Right Section - User Context */}
        <div className="flex items-center space-x-4">
          {/* Time Display */}
          <div className="hidden sm:flex flex-col items-end text-sm">
            <span className="font-data text-text-primary">{formatTime(currentTime)}</span>
            <span className="text-xs text-text-secondary">{formatDate(currentTime)}</span>
          </div>

          {/* User Info Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-text-primary">
                  {user?.name || 'User Name'}
                </span>
                <span className="text-xs text-text-secondary capitalize">
                  {user?.role || 'User'}
                </span>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 border-b border-border">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Name:</span>
                    <span className="text-sm font-medium text-text-primary">
                      {user?.name || 'User Name'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Role:</span>
                    <span className="text-sm font-medium text-text-primary capitalize">
                      {user?.role || 'User'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">MAC:</span>
                    <span className="text-sm font-data text-text-primary">
                      {user?.macAddress || '00:00:00:00:00:00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">IP:</span>
                    <span className="text-sm font-data text-text-primary">
                      {user?.ipAddress || '192.168.1.1'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Network:</span>
                    <span className="text-sm font-data text-text-primary">
                      {user?.network || 'Lab-Network'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error-50 rounded-md transition-colors duration-200"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;