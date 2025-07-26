import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import StatsCard from './components/StatsCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock stats data based on user role
  const getStatsData = (userRole) => {
    const baseStats = [
      {
        id: 1,
        title: "Pending Forms",
        value: userRole === 'normal' ? 3 : userRole === 'group_head' ? 12 : 47,
        change: "+2 from yesterday",
        trend: "up",
        icon: "FileText",
        color: "warning"
      },
      {
        id: 2,
        title: "Completed Forms",
        value: userRole === 'normal' ? 28 : userRole === 'group_head' ? 156 : 892,
        change: "+15% this month",
        trend: "up",
        icon: "CheckCircle",
        color: "success"
      },
      {
        id: 3,
        title: "Completion Rate",
        value: userRole === 'normal' ? "94%" : userRole === 'group_head' ? "87%" : "91%",
        change: "+3% from last month",
        trend: "up",
        icon: "TrendingUp",
        color: "primary"
      }
    ];

    if (userRole === 'group_head') {
      baseStats.push({
        id: 4,
        title: "Team Members",
        value: 8,
        change: "2 new this quarter",
        trend: "up",
        icon: "Users",
        color: "accent"
      });
    }

    if (userRole === 'admin') {
      baseStats.push(
        {
          id: 4,
          title: "Active Users",
          value: 124,
          change: "+8 this month",
          trend: "up",
          icon: "Users",
          color: "accent"
        },
        {
          id: 5,
          title: "System Health",
          value: "99.8%",
          change: "Excellent uptime",
          trend: "stable",
          icon: "Activity",
          color: "success"
        }
      );
    }

    return baseStats;
  };

  const statsData = getStatsData(user?.role);

  const handleLogout = () => {
    logout();
    navigate('/login-screen');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Calculate main content margin based on sidebar state
  const getMainContentClass = () => {
    if (window.innerWidth < 768) {
      return 'ml-0'; // Mobile: no margin
    }
    return isSidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar';
  };

  const [mainContentClass, setMainContentClass] = useState(getMainContentClass());

  useEffect(() => {
    const handleResize = () => {
      setMainContentClass(getMainContentClass());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarCollapsed]);

  useEffect(() => {
    setMainContentClass(getMainContentClass());
  }, [isSidebarCollapsed]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Main Content */}
      <main className={`pt-header transition-all duration-300 ${mainContentClass}`}>
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Welcome back, {user?.name?.split(' ')[1] || 'User'}
                </h1>
                <p className="text-text-secondary">
                  {user?.role === 'normal' && "Here's your personal dashboard overview"}
                  {user?.role === 'group_head' && "Monitor your team's progress and submissions"}
                  {user?.role === 'admin' && "System-wide analytics and management overview"}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Calendar" size={16} />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat) => (
              <StatsCard key={stat.id} {...stat} />
            ))}
          </div>

          {/* Main Dashboard Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <RecentActivity userRole={user?.role} />
            </div>

            {/* Quick Actions - Takes 1 column */}
            <div className="lg:col-span-1">
              <QuickActions userRole={user?.role} />
            </div>
          </div>

          {/* Additional Dashboard Sections for Different Roles */}
          {user?.role === 'group_head' && (
            <div className="mt-8">
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Team Overview</h3>
                  <button
                    onClick={() => navigate('/response-analytics')}
                    className="text-sm text-primary hover:text-primary-700 font-medium"
                  >
                    View Details →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary rounded-md">
                        <Icon name="Users" size={20} color="white" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Active Team Members</p>
                        <p className="text-xl font-semibold text-text-primary">8</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent rounded-md">
                        <Icon name="FileCheck" size={20} color="white" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Assigned Form Type</p>
                        <p className="text-lg font-semibold text-text-primary">
                          {user?.formAccess ? user.formAccess.replace('form', 'Form ').toUpperCase() : 'Not Assigned'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user?.role === 'admin' && (
            <div className="mt-8">
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">System Status</h3>
                  <button
                    onClick={() => navigate('/user-management')}
                    className="text-sm text-primary hover:text-primary-700 font-medium"
                  >
                    Manage System →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-success-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-success rounded-md">
                        <Icon name="Server" size={20} color="white" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Server Status</p>
                        <p className="text-lg font-semibold text-success">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-secondary rounded-md">
                        <Icon name="Database" size={20} color="white" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Database</p>
                        <p className="text-lg font-semibold text-text-primary">Healthy</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-accent-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent rounded-md">
                        <Icon name="Shield" size={20} color="white" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Security</p>
                        <p className="text-lg font-semibold text-text-primary">Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border bg-surface">
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>© {new Date().getFullYear()} SecureLab Dashboard</span>
                <span>•</span>
                <span>Research Lab Management System</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>Version 2.1.0</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>Secure Connection</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardHome;