import React from 'react';
import Icon from '../../../components/AppIcon';

const UserTable = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onSort,
  sortConfig,
  onEditUser,
  onDeleteUser,
  onResetPassword
}) => {
  const formatLastLogin = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-accent-100 text-accent-600';
      case 'group_head': return 'bg-primary-100 text-primary-600';
      case 'normal': return 'bg-secondary-100 text-secondary-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-600';
      case 'inactive': return 'bg-error-100 text-error-600';
      case 'pending': return 'bg-warning-100 text-warning-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('email')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Email</span>
                  <Icon name={getSortIcon('email')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('role')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Role</span>
                  <Icon name={getSortIcon('role')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('department')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Department</span>
                  <Icon name={getSortIcon('department')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('lastLogin')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Last Login</span>
                  <Icon name={getSortIcon('lastLogin')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-secondary-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full text-sm font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary">{user.name}</div>
                      <div className="text-sm text-text-secondary">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">{user.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {formatLastLogin(user.lastLogin)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      title="Edit user"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onResetPassword(user.id)}
                      className="p-1 text-text-secondary hover:text-warning transition-colors duration-200"
                      title="Reset password"
                    >
                      <Icon name="Key" size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                      title="Delete user"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {users.map((user) => (
          <div key={user.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                  className="rounded border-border text-primary focus:ring-primary mt-1"
                />
                <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full text-sm font-medium">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{user.name}</div>
                  <div className="text-xs text-text-secondary">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEditUser(user)}
                  className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-text-secondary">Role:</span>
                <span className={`ml-1 px-2 py-1 rounded-full ${getRoleColor(user.role)}`}>
                  {user.role.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Status:</span>
                <span className={`ml-1 px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                  {user.status.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Department:</span>
                <span className="ml-1 text-text-primary">{user.department}</span>
              </div>
              <div>
                <span className="text-text-secondary">Last Login:</span>
                <span className="ml-1 text-text-primary">{formatLastLogin(user.lastLogin)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;