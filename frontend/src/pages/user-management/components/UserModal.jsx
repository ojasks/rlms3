import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'normal',
    department: '',
    status: 'active',
    groupAssignments: []
  });
  const [errors, setErrors] = useState({});

  const departments = [
    'Biochemistry',
    'Chemistry', 
    'Biology',
    'Physics',
    'Administration'
  ];

  const groupOptions = [
    'Protein Research',
    'Lab Safety',
    'Organic Chemistry',
    'Cell Biology',
    'Quantum Physics',
    'Enzyme Research',
    'Molecular Biology',
    'System Administration'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'normal',
        department: user.department || '',
        status: user.status || 'active',
        groupAssignments: user.groupAssignments || []
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        id: user?.id || Date.now()
      });
    }
  };

  const handleGroupToggle = (group) => {
    setFormData(prev => ({
      ...prev,
      groupAssignments: prev.groupAssignments.includes(group)
        ? prev.groupAssignments.filter(g => g !== group)
        : [...prev.groupAssignments, group]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-md transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
                  errors.name ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
                  errors.email ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Role and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                <option value="normal">Normal User</option>
                <option value="group_head">Group Head</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
                  errors.department ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-error">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Account Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Group Assignments */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Group Assignments
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {groupOptions.map(group => (
                <label key={group} className="flex items-center space-x-3 p-3 border border-border rounded-md hover:bg-secondary-50 cursor-pointer transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={formData.groupAssignments.includes(group)}
                    onChange={() => handleGroupToggle(group)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{group}</span>
                </label>
              ))}
            </div>
          </div>

          {/* User Information (Edit Mode) */}
          {user && (
            <div className="bg-secondary-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-text-primary mb-3">Current User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">User ID:</span>
                  <span className="ml-2 text-text-primary">{user.id}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Join Date:</span>
                  <span className="ml-2 text-text-primary">
                    {user.joinDate?.toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">MAC Address:</span>
                  <span className="ml-2 font-data text-text-primary">{user.macAddress}</span>
                </div>
                <div>
                  <span className="text-text-secondary">IP Address:</span>
                  <span className="ml-2 font-data text-text-primary">{user.ipAddress}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Network:</span>
                  <span className="ml-2 font-data text-text-primary">{user.network}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Forms Completed:</span>
                  <span className="ml-2 text-text-primary">{user.formCompletions}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;