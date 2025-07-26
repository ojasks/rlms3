import React from 'react';
import Icon from '../../../components/AppIcon';

const FormCard = ({ 
  form, 
  userRole, 
  isSelected, 
  onSelect, 
  onAction, 
  showCheckbox = false 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success-50 border-success-100';
      case 'in_progress':
        return 'text-warning bg-warning-50 border-warning-100';
      case 'overdue':
        return 'text-error bg-error-50 border-error-100';
      case 'not_started':
        return 'text-secondary-500 bg-secondary-50 border-secondary-100';
      default:
        return 'text-secondary-500 bg-secondary-50 border-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in_progress':
        return 'Clock';
      case 'overdue':
        return 'AlertTriangle';
      case 'not_started':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'overdue':
        return 'Overdue';
      case 'not_started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error-50';
      case 'medium':
        return 'text-warning bg-warning-50';
      case 'low':
        return 'text-success bg-success-50';
      default:
        return 'text-secondary-500 bg-secondary-50';
    }
  };

  const getActionButton = () => {
    if (userRole === 'normal') {
      switch (form.status) {
        case 'completed':
          return {
            text: 'View Submission',
            action: 'view',
            icon: 'Eye',
            className: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          };
        case 'in_progress':
          return {
            text: 'Continue Form',
            action: 'continue',
            icon: 'Play',
            className: 'bg-warning text-white hover:bg-warning-600'
          };
        case 'overdue':
          return {
            text: 'Complete Now',
            action: 'continue',
            icon: 'AlertTriangle',
            className: 'bg-error text-white hover:bg-error-600'
          };
        default:
          return {
            text: 'Start Form',
            action: 'start',
            icon: 'Play',
            className: 'bg-primary text-white hover:bg-primary-700'
          };
      }
    } else {
      return {
        text: 'View Responses',
        action: 'view',
        icon: 'BarChart3',
        className: 'bg-accent text-white hover:bg-accent-600'
      };
    }
  };

  const formatDeadline = (deadline) => {
    const now = new Date();
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const actionButton = getActionButton();

  return (
    <div className={`
      bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200
      ${isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''}
    `}>
      {/* Header with checkbox and priority */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          {showCheckbox && (
            <button
              onClick={() => onSelect(form.id)}
              className="mt-1 p-1 rounded hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon 
                name={isSelected ? "CheckSquare" : "Square"} 
                size={16} 
                className={isSelected ? "text-primary" : "text-secondary-400"} 
              />
            </button>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
              {form.title}
            </h3>
          </div>
        </div>
        
        <div className={`
          px-2 py-1 rounded-full text-xs font-medium capitalize
          ${getPriorityColor(form.priority)}
        `}>
          {form.priority}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {form.description}
      </p>

      {/* Status and Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`
            flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border
            ${getStatusColor(form.status)}
          `}>
            <Icon name={getStatusIcon(form.status)} size={12} />
            <span>{getStatusText(form.status)}</span>
          </div>
          
          {form.progress > 0 && (
            <span className="text-xs text-text-secondary">
              {form.progress}% complete
            </span>
          )}
        </div>

        {form.progress > 0 && (
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${form.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Form Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="HelpCircle" size={12} />
            <span>{form.questionsCount} questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{form.estimatedTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{form.submissionCount} submissions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={12} />
            <span>{form.completionRate}% completion rate</span>
          </div>
        </div>

        {form.lastSubmitted && (
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <Icon name="Calendar" size={12} />
            <span>
              Last submitted: {form.lastSubmitted.toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Deadline */}
      <div className={`
        flex items-center space-x-2 text-xs mb-4 p-2 rounded-md
        ${form.status === 'overdue' ?'bg-error-50 text-error' :'bg-secondary-50 text-text-secondary'
        }
      `}>
        <Icon 
          name={form.status === 'overdue' ? "AlertTriangle" : "Calendar"} 
          size={12} 
        />
        <span>{formatDeadline(form.deadline)}</span>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onAction(form.id, actionButton.action)}
        className={`
          w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md
          text-sm font-medium transition-colors duration-200
          ${actionButton.className}
        `}
      >
        <Icon name={actionButton.icon} size={16} />
        <span>{actionButton.text}</span>
      </button>
    </div>
  );
};

export default FormCard;