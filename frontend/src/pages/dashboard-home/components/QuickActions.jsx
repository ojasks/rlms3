import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ userRole }) => {
  const navigate = useNavigate();

  // Define actions based on user role
  const getActionsData = (role) => {
    const baseActions = [
      {
        id: 1,
        title: 'Browse Forms',
        description: 'View available forms and requirements',
        icon: 'FileText',
        color: 'primary',
        path: '/form-listing',
        roles: ['normal', 'group_head', 'admin']
      },
      {
        id: 2,
        title: 'Complete Form',
        description: 'Fill out and submit required forms',
        icon: 'Edit3',
        color: 'success',
        path: '/form-completion',
        roles: ['normal', 'group_head', 'admin']
      }
    ];

    const roleSpecificActions = [
      {
        id: 3,
        title: 'View Analytics',
        description: 'Access response data and insights',
        icon: 'BarChart3',
        color: 'accent',
        path: '/response-analytics',
        roles: ['group_head', 'admin']
      },
      {
        id: 4,
        title: 'Manage Users',
        description: 'User management and permissions',
        icon: 'Users',
        color: 'warning',
        path: '/user-management',
        roles: ['admin']
      },
      {
        id: 5,
        title: 'System Reports',
        description: 'Generate comprehensive reports',
        icon: 'FileBarChart',
        color: 'secondary',
        action: 'generate_report',
        roles: ['admin']
      },
      {
        id: 6,
        title: 'Team Overview',
        description: 'Monitor team form submissions',
        icon: 'Users',
        color: 'accent',
        action: 'team_overview',
        roles: ['group_head']
      }
    ];

    const allActions = [...baseActions, ...roleSpecificActions];
    return allActions.filter(action => action.roles.includes(role));
  };

  const actions = getActionsData(userRole);

  const getColorClasses = (colorType) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary',
        hover: 'hover:bg-primary-700',
        text: 'text-white'
      },
      success: {
        bg: 'bg-success',
        hover: 'hover:bg-success-600',
        text: 'text-white'
      },
      warning: {
        bg: 'bg-warning',
        hover: 'hover:bg-warning-600',
        text: 'text-white'
      },
      accent: {
        bg: 'bg-accent',
        hover: 'hover:bg-accent-600',
        text: 'text-white'
      },
      secondary: {
        bg: 'bg-secondary',
        hover: 'hover:bg-secondary-600',
        text: 'text-white'
      }
    };
    return colorMap[colorType] || colorMap.primary;
  };

  const handleActionClick = (action) => {
    if (action.path) {
      navigate(action.path);
    } else if (action.action) {
      // Handle custom actions
      switch (action.action) {
        case 'generate_report':
          // Mock report generation
          alert('System report generation initiated. You will be notified when ready.');
          break;
        case 'team_overview':
          // Navigate to analytics with team filter
          navigate('/response-analytics?view=team');
          break;
        default:
          console.log('Action not implemented:', action.action);
      }
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-accent" />
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const colors = getColorClasses(action.color);
          
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`w-full flex items-center space-x-4 p-4 rounded-md ${colors.bg} ${colors.hover} ${colors.text} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex-shrink-0">
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium mb-1">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <div className="flex-shrink-0">
                <Icon name="ChevronRight" size={16} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional Info Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-3 text-sm text-text-secondary">
          <Icon name="Info" size={16} />
          <span>
            {userRole === 'normal' && "Complete pending forms to maintain compliance"}
            {userRole === 'group_head' && "Monitor your team's form completion progress"}
            {userRole === 'admin' && "Oversee system-wide form management and analytics"}
          </span>
        </div>
      </div>

      {/* Shortcuts for frequent actions */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Keyboard Shortcuts</h4>
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex justify-between">
            <span>Browse Forms</span>
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl + F</kbd>
          </div>
          <div className="flex justify-between">
            <span>Quick Complete</span>
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl + E</kbd>
          </div>
          {(userRole === 'group_head' || userRole === 'admin') && (
            <div className="flex justify-between">
              <span>View Analytics</span>
              <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl + A</kbd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;