import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCards = ({ data }) => {
  const cards = [
    {
      title: 'Total Forms',
      value: data.totalForms,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Completed',
      value: data.completedForms,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Pending',
      value: data.pendingForms,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Completion Rate',
      value: `${data.completionRate}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success-50',
      change: '+3%',
      changeType: 'positive'
    },
    {
      title: 'Avg Response Time',
      value: `${data.avgResponseTime} min`,
      icon: 'Timer',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      change: '-2 min',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${card.bgColor} rounded-lg`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={card.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{card.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">
              {card.value.toLocaleString ? card.value.toLocaleString() : card.value}
            </h3>
            <p className="text-sm text-text-secondary">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;