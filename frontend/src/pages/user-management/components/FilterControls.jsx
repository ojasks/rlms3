import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterControls = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  users
}) => {
  const departments = [...new Set(users.map(user => user.department))];
  
  const activeFiltersCount = Object.values(filters).filter(value => value !== 'all').length;

  const clearFilters = () => {
    onFiltersChange({
      role: 'all',
      status: 'all',
      department: 'all'
    });
    onSearchChange('');
  };

  return (
    <div className="bg-surface p-6 rounded-lg border border-border mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-text-secondary">Role:</label>
            <select
              value={filters.role}
              onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="group_head">Group Head</option>
              <option value="normal">Normal User</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-text-secondary">Status:</label>
            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-text-secondary">Department:</label>
            <select
              value={filters.department}
              onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {(activeFiltersCount > 0 || searchTerm) && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200"
            >
              <Icon name="X" size={16} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Indicator */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Active filters:</span>
          <div className="flex items-center space-x-2">
            {filters.role !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-primary-100 text-primary-600 rounded-full">
                Role: {filters.role.replace('_', ' ')}
                <button
                  onClick={() => onFiltersChange({ ...filters, role: 'all' })}
                  className="ml-1 hover:text-primary-800"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-success-100 text-success-600 rounded-full">
                Status: {filters.status}
                <button
                  onClick={() => onFiltersChange({ ...filters, status: 'all' })}
                  className="ml-1 hover:text-success-800"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.department !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-accent-100 text-accent-600 rounded-full">
                Dept: {filters.department}
                <button
                  onClick={() => onFiltersChange({ ...filters, department: 'all' })}
                  className="ml-1 hover:text-accent-800"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;