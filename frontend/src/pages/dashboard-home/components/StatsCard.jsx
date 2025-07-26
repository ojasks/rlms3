import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, trend, icon, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary',
        text: 'text-primary',
        lightBg: 'bg-primary-50'
      },
      success: {
        bg: 'bg-success',
        text: 'text-success',
        lightBg: 'bg-success-50'
      },
      warning: {
        bg: 'bg-warning',
        text: 'text-warning',
        lightBg: 'bg-warning-50'
      },
      error: {
        bg: 'bg-error',
        text: 'text-error',
        lightBg: 'bg-error-50'
      },
      accent: {
        bg: 'bg-accent',
        text: 'text-accent',
        lightBg: 'bg-accent-50'
      }
    };
    return colorMap[colorType] || colorMap.primary;
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'TrendingUp';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      case 'stable':
        return 'text-text-secondary';
      default:
        return 'text-success';
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.lightBg}`}>
          <Icon name={icon} size={24} className={colors.text} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className={`text-xs ${getTrendColor()}`}>{change}</p>
      </div>
    </div>
  );
};

export default StatsCard;