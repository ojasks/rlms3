import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsFilters = ({ selectedFilters, onFilterChange, userRole }) => {
  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const formTypeOptions = [
    { value: 'all', label: 'All Forms' },
    { value: 'safety_compliance', label: 'Safety Compliance' },
    { value: 'equipment_check', label: 'Equipment Check' },
    { value: 'chemical_inventory', label: 'Chemical Inventory' },
    { value: 'lab_access', label: 'Lab Access' },
    { value: 'training_record', label: 'Training Record' },
    { value: 'incident_report', label: 'Incident Report' },
    { value: 'maintenance_log', label: 'Maintenance Log' },
    { value: 'research_protocol', label: 'Research Protocol' },
    { value: 'data_backup', label: 'Data Backup' }
  ];

  const userGroupOptions = [
    { value: 'all', label: 'All Groups' },
    { value: 'chemistry_team', label: 'Chemistry Team' },
    { value: 'physics_team', label: 'Physics Team' },
    { value: 'biology_team', label: 'Biology Team' },
    { value: 'engineering_team', label: 'Engineering Team' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const handleClearFilters = () => {
    onFilterChange('dateRange', 'last30days');
    onFilterChange('formType', 'all');
    onFilterChange('userGroup', 'all');
    onFilterChange('status', 'all');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date Range
          </label>
          <select
            value={selectedFilters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Form Type Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Form Type
          </label>
          <select
            value={selectedFilters.formType}
            onChange={(e) => onFilterChange('formType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {formTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* User Group Filter - Only for Admins */}
        {userRole === 'admin' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              User Group
            </label>
            <select
              value={selectedFilters.userGroup}
              onChange={(e) => onFilterChange('userGroup', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {userGroupOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Status
          </label>
          <select
            value={selectedFilters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Quick Filters
          </label>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
              <Icon name="Clock" size={16} className="text-warning" />
              <span>Overdue Forms</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span>High Completion Rate</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span>Low Response Rate</span>
            </button>
          </div>
        </div>

        {/* Applied Filters Summary */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-2">Applied Filters</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([key, value]) => {
              if (value === 'all') return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary text-xs rounded-md"
                >
                  <span>{value.replace('_', ' ')}</span>
                  <button
                    onClick={() => onFilterChange(key, 'all')}
                    className="hover:text-primary-700"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;