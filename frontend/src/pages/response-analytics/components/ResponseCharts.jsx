import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const ResponseCharts = ({ trendsData, formTypeData }) => {
  const [activeChart, setActiveChart] = useState('trends');

  const chartTabs = [
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'distribution', label: 'Distribution', icon: 'PieChart' },
    { id: 'comparison', label: 'Comparison', icon: 'BarChart3' }
  ];

  const renderTrendsChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={trendsData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="month" 
          stroke="#64748B"
          fontSize={12}
        />
        <YAxis 
          stroke="#64748B"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="completed" 
          stroke="#2563EB" 
          strokeWidth={3}
          dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
          name="Completed"
        />
        <Line 
          type="monotone" 
          dataKey="pending" 
          stroke="#D97706" 
          strokeWidth={3}
          dot={{ fill: '#D97706', strokeWidth: 2, r: 4 }}
          name="Pending"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={formTypeData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {formTypeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formTypeData.slice(0, 6)}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="name" 
          stroke="#64748B"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#64748B"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#2563EB"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'trends':
        return renderTrendsChart();
      case 'distribution':
        return renderDistributionChart();
      case 'comparison':
        return renderComparisonChart();
      default:
        return renderTrendsChart();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-0">
          Response Analytics
        </h3>
        
        {/* Chart Type Tabs */}
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
          {chartTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeChart === tab.id
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full">
        {renderActiveChart()}
      </div>

      {/* Chart Legend for Distribution */}
      {activeChart === 'distribution' && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {formTypeData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-text-secondary truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Insights */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">↗ 15%</div>
          <div className="text-sm text-text-secondary">Response Rate Increase</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">8.5 min</div>
          <div className="text-sm text-text-secondary">Avg Completion Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">23</div>
          <div className="text-sm text-text-secondary">Forms Due Today</div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCharts;