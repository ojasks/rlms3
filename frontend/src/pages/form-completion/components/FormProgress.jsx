import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ 
  currentSection, 
  totalSections, 
  progressPercentage, 
  estimatedTimeRemaining, 
  isAutoSaving, 
  lastSaved 
}) => {
  const formatLastSaved = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Progress Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Section {currentSection} of {totalSections}
            </span>
            <span className="text-sm text-text-secondary">
              {progressPercentage}% Complete
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary-200 rounded-full h-2 mb-3">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>
                  {estimatedTimeRemaining > 0 
                    ? `~${estimatedTimeRemaining} min remaining`
                    : 'Almost done!'
                  }
                </span>
              </div>
              
              {/* Auto-save Status */}
              <div className="flex items-center space-x-1">
                {isAutoSaving ? (
                  <>
                    <div className="animate-spin">
                      <Icon name="Loader2" size={14} />
                    </div>
                    <span>Saving...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <Icon name="Check" size={14} className="text-success" />
                    <span>Saved {formatLastSaved(lastSaved)}</span>
                  </>
                ) : (
                  <>
                    <Icon name="Save" size={14} />
                    <span>Auto-save enabled</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-6 lg:ml-8">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {Math.round((progressPercentage / 100) * 25)}
            </div>
            <div className="text-xs text-text-secondary">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {25 - Math.round((progressPercentage / 100) * 25)}
            </div>
            <div className="text-xs text-text-secondary">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgress;