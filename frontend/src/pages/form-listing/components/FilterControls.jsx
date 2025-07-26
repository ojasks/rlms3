import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ selectedFilters, onFilterChange, formsData }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getUniqueTypes = () => {
    const types = [...new Set(formsData.map(form => form.type))];
    return types.map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
    }));
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'not_started', label: 'Not Started' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    ...getUniqueTypes()
  ];

  const deadlineOptions = [
    { value: 'all', label: 'All Deadlines' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'due_soon', label: 'Due Soon (7 days)' },
    { value: 'due_later', label: 'Due Later' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'completion', label: 'Completion' }
  ];

  const FilterSelect = ({ label, value, options, onChange, icon }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-8 pr-8 py-2 text-sm bg-surface border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon 
          name={icon} 
          size={14} 
          className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
        />
        <Icon 
          name="ChevronDown" 
          size={14} 
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
      <FilterSelect
        label="Status"
        value={selectedFilters.status}
        options={statusOptions}
        onChange={(value) => handleFilterChange('status', value)}
        icon="CheckCircle"
      />

      <FilterSelect
        label="Type"
        value={selectedFilters.type}
        options={typeOptions}
        onChange={(value) => handleFilterChange('type', value)}
        icon="Tag"
      />

      <FilterSelect
        label="Deadline"
        value={selectedFilters.deadline}
        options={deadlineOptions}
        onChange={(value) => handleFilterChange('deadline', value)}
        icon="Calendar"
      />

      <FilterSelect
        label="Sort By"
        value={selectedFilters.sortBy}
        options={sortOptions}
        onChange={(value) => handleFilterChange('sortBy', value)}
        icon="ArrowUpDown"
      />

      {/* Clear Filters Button */}
      {Object.values(selectedFilters).some(filter => filter !== 'all' && filter !== 'name') && (
        <button
          onClick={() => onFilterChange({
            status: 'all',
            type: 'all',
            deadline: 'all',
            sortBy: 'name'
          })}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200"
        >
          <Icon name="X" size={14} />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
};

export default FilterControls;