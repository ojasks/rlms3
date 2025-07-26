import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ userRole }) => {
  // Mock activity data based on user role
  const getActivityData = (role) => {
    const baseActivities = [
      {
        id: 1,
        type: 'form_completed',
        title: 'Safety Compliance Form',
        description: 'Completed quarterly safety assessment',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        icon: 'CheckCircle',
        color: 'success',
        user: role === 'normal' ? 'You' : 'Dr. Sarah Johnson'
      },
      {
        id: 2,
        type: 'form_submitted',
        title: 'Equipment Maintenance Log',
        description: 'Submitted monthly equipment inspection report',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        icon: 'FileText',
        color: 'primary',
        user: role === 'normal' ? 'You' : 'Dr. Michael Chen'
      },
      {
        id: 3,
        type: 'reminder',
        title: 'Chemical Inventory Due',
        description: 'Annual chemical inventory form due in 3 days',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        icon: 'AlertCircle',
        color: 'warning',
        user: 'System'
      }
    ];

    if (role === 'group_head') {
      baseActivities.unshift(
        {
          id: 4,
          type: 'team_update',
          title: 'Team Member Added',
          description: 'New researcher joined your safety compliance team',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          icon: 'UserPlus',
          color: 'accent',
          user: 'HR System'
        },
        {
          id: 5,
          type: 'analytics_ready',
          title: 'Weekly Report Generated',
          description: 'Safety compliance analytics report is ready for review',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          icon: 'BarChart3',
          color: 'primary',
          user: 'Analytics Engine'
        }
      );
    }

    if (role === 'admin') {
      baseActivities.unshift(
        {
          id: 6,
          type: 'system_update',
          title: 'System Maintenance',
          description: 'Scheduled maintenance completed successfully',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          icon: 'Settings',
          color: 'success',
          user: 'System Admin'
        },
        {
          id: 7,
          type: 'user_management',
          title: 'User Permissions Updated',
          description: 'Updated access permissions for 3 group heads',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          icon: 'Shield',
          color: 'accent',
          user: 'You'
        }
      );
    }

    return baseActivities.slice(0, 6); // Show max 6 activities
  };

  const activities = getActivityData(userRole);

  const getColorClasses = (colorType) => {
    const colorMap = {
      primary: 'text-primary bg-primary-50',
      success: 'text-success bg-success-50',
      warning: 'text-warning bg-warning-50',
      error: 'text-error bg-error-50',
      accent: 'text-accent bg-accent-50'
    };
    return colorMap[colorType] || colorMap.primary;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-secondary-50 transition-colors duration-200">
            <div className={`p-2 rounded-md ${getColorClasses(activity.color)}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-text-primary truncate">
                  {activity.title}
                </h4>
                <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-1">
                {activity.description}
              </p>
              
              <div className="flex items-center space-x-2 text-xs text-text-tertiary">
                <Icon name="User" size={12} />
                <span>{activity.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary">No recent activity to display</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;