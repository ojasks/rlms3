import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../AppIcon';

const Sidebar = ({ isOpen, onToggle, isCollapsed, onToggleCollapse }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'normal':
        return [
          {
            label: 'Dashboard',
            path: '/dashboard-home',
            icon: 'LayoutDashboard',
            tooltip: 'Overview and quick actions'
          },
          {
            label: 'Form Listing',
            path: '/form-listing',
            icon: 'FileText',
            tooltip: 'Browse available forms'
          },
          {
            label: 'Form Completion',
            path: '/form-completion',
            icon: 'Edit3',
            tooltip: 'Complete and submit forms'
          }
        ];
      
      case 'group_head':
        return [
          {
            label: 'Dashboard',
            path: '/dashboard-home',
            icon: 'LayoutDashboard',
            tooltip: 'Overview and quick actions'
          },
          {
            label: 'Form Listing',
            path: '/form-listing',
            icon: 'FileText',
            tooltip: 'Browse available forms'
          },
          {
            label: 'Form Completion',
            path: '/form-completion',
            icon: 'Edit3',
            tooltip: 'Complete and submit forms'
          },
          {
            label: 'Response Analytics',
            path: '/response-analytics',
            icon: 'BarChart3',
            tooltip: 'View response data and insights'
          },
          {
            label: 'User Management',
            path: '/user-management',
            icon: 'Users',
            tooltip: 'Manage users and permissions'
          }
        ];
      
      case 'admin':
        return [
          {
            label: 'Dashboard',
            path: '/dashboard-home',
            icon: 'LayoutDashboard',
            tooltip: 'Overview and quick actions'
          },
          {
            label: 'Form Listing',
            path: '/form-listing',
            icon: 'FileText',
            tooltip: 'Browse available forms'
          },
          {
            label: 'Form Completion',
            path: '/form-completion',
            icon: 'Edit3',
            tooltip: 'Complete and submit forms'
          },
          {
            label: 'Response Analytics',
            path: '/response-analytics',
            icon: 'BarChart3',
            tooltip: 'View response data and insights'
          },
          {
            label: 'User Management',
            path: '/user-management',
            icon: 'Users',
            tooltip: 'Manage users and permissions'
          }
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && isOpen) {
      onToggle();
    }
  };

  const handleBackdropClick = () => {
    if (isMobile && isOpen) {
      onToggle();
    }
  };

  const sidebarWidth = isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar';

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-998 lg:hidden"
          onClick={handleBackdropClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-header left-0 h-[calc(100vh-4rem)] bg-surface border-r border-border z-999
          transition-all duration-300 ease-in-out
          ${isMobile 
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-sidebar`
            : `${sidebarWidth} translate-x-0`
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                  <Icon name="Microscope" size={20} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-text-primary">LabSystem</span>
                  <span className="text-xs text-text-secondary">Research Portal</span>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                  <Icon name="Microscope" size={20} color="white" />
                </div>
              </div>
            )}

            {/* Desktop Collapse Toggle */}
            {!isMobile && (
              <button
                onClick={onToggleCollapse}
                className="p-1 rounded-md hover:bg-secondary-100 transition-colors duration-200"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Icon 
                  name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <div key={item.path} className="relative group">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium
                      transition-all duration-200 ease-out
                      ${isActive 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className={isActive ? 'text-white' : 'text-current'}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-secondary-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-secondary-800"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Role Indicator */}
          {!isCollapsed && user && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Shield" size={14} />
                <span className="capitalize">
                  {user.role === 'group_head' ? 'Group Head' : user.role} Access
                </span>
              </div>
            </div>
          )}

          {isCollapsed && user && (
            <div className="p-4 border-t border-border flex justify-center">
              <div className="relative group">
                <Icon name="Shield" size={16} className="text-text-secondary" />
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-secondary-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {user.role === 'group_head' ? 'Group Head' : user.role} Access
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-secondary-800"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;