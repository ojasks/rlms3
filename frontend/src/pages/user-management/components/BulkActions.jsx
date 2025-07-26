import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onBulkAction }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const actions = [
    { id: 'activate', label: 'Activate Users', icon: 'UserCheck', color: 'text-success' },
    { id: 'deactivate', label: 'Deactivate Users', icon: 'UserX', color: 'text-warning' },
    { id: 'role_normal', label: 'Set as Normal User', icon: 'User', color: 'text-secondary' },
    { id: 'role_group_head', label: 'Set as Group Head', icon: 'Users', color: 'text-primary' },
    { id: 'role_admin', label: 'Set as Admin', icon: 'Shield', color: 'text-accent' },
    { id: 'delete', label: 'Delete Users', icon: 'Trash2', color: 'text-error' }
  ];

  const handleAction = (actionId) => {
    onBulkAction(actionId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            <Icon name="Settings" size={16} />
            <span>Bulk Actions</span>
            <Icon name="ChevronDown" size={16} />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-md shadow-lg z-20">
                <div className="py-1">
                  {actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.id)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-secondary-50 transition-colors duration-200"
                    >
                      <Icon name={action.icon} size={16} className={action.color} />
                      <span className="text-text-primary">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkActions;