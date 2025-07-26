import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import BulkActions from './components/BulkActions';
import FilterControls from './components/FilterControls';

const UserManagement = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    department: 'all'
  });

  // Role-based user data filtering
  const getAllUsers = () => {
    return [
      {
        id: 1,
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@securelab.com',
        role: 'normal',
        department: 'Chemistry',
        status: 'active',
        lastActive: '2024-01-20',
        formsCompleted: 28,
        formAccess: null
      },
      {
        id: 2,
        name: 'Prof. Michael Chen',
        email: 'grouphead1@securelab.com',
        role: 'group_head',
        department: 'Chemistry',
        status: 'active',
        lastActive: '2024-01-19',
        formsCompleted: 45,
        formAccess: 'form1'
      },
      {
        id: 3,
        name: 'Dr. Alice Thompson',
        email: 'grouphead2@securelab.com',
        role: 'group_head',
        department: 'Physics',
        status: 'active',
        lastActive: '2024-01-18',
        formsCompleted: 32,
        formAccess: 'form2'
      },
      {
        id: 4,
        name: 'Dr. Sarah Johnson',
        email: 'admin@securelab.com',
        role: 'admin',
        department: 'Administration',
        status: 'active',
        lastActive: '2024-01-20',
        formsCompleted: 156,
        formAccess: 'all'
      },
      {
        id: 5,
        name: 'Dr. James Wilson',
        email: 'james.wilson@securelab.com',
        role: 'normal',
        department: 'Biology',
        status: 'inactive',
        lastActive: '2024-01-15',
        formsCompleted: 12,
        formAccess: null
      },
      {
        id: 6,
        name: 'Prof. Robert Wilson',
        email: 'grouphead3@securelab.com',
        role: 'group_head',
        department: 'Biology',
        status: 'active',
        lastActive: '2024-01-17',
        formsCompleted: 38,
        formAccess: 'form3'
      }
    ];
  };

  const getFilteredUsers = () => {
    const allUsers = getAllUsers();
    
    // Filter based on user role
    let filteredUsers = allUsers;
    
    if (user?.role === 'group_head') {
      // Group heads can only see normal users and themselves
      filteredUsers = allUsers.filter(u => 
        u.role === 'normal' || u.id === user.id
      );
    }
    // Admin can see all users (no filtering needed)
    
    return filteredUsers;
  };

  const [users, setUsers] = useState(getFilteredUsers());

  const handleLogout = () => {
    logout();
    navigate('/login-screen');
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...userData } : u));
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1,
        lastActive: new Date().toISOString().split('T')[0],
        formsCompleted: 0
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'activate':
        setUsers(users.map(u => 
          selectedUsers.includes(u.id) ? { ...u, status: 'active' } : u
        ));
        break;
      case 'deactivate':
        setUsers(users.map(u => 
          selectedUsers.includes(u.id) ? { ...u, status: 'inactive' } : u
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          setUsers(users.filter(u => !selectedUsers.includes(u.id)));
        }
        break;
      default:
        break;
    }
    setSelectedUsers([]);
  };

  // Apply search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesDepartment = filters.department === 'all' || user.department === filters.department;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Permission checks
  const canAddUsers = user?.role === 'admin';
  const canEditUser = (targetUser) => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'group_head') return targetUser.role === 'normal' || targetUser.id === user.id;
    return false;
  };
  const canDeleteUser = (targetUser) => {
    if (user?.role === 'admin') return targetUser.role !== 'admin';
    if (user?.role === 'group_head') return targetUser.role === 'normal';
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main className={`
        pt-header transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)]
        ${isSidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar'}
      `}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">User Management</h1>
              <p className="text-text-secondary">
                {user?.role === 'admin' && 'Manage all system users and their permissions'}
                {user?.role === 'group_head' && 'Manage normal users in your scope'}
              </p>
              {user?.role === 'group_head' && (
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-warning-50 text-warning-700 text-sm rounded-full">
                  <Icon name="Shield" size={14} className="mr-1" />
                  Limited Access: Normal Users Only
                </div>
              )}
            </div>
            {canAddUsers && (
              <button
                onClick={handleAddUser}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200 mt-4 sm:mt-0"
              >
                <Icon name="Plus" size={16} />
                <span>Add User</span>
              </button>
            )}
          </div>

          {/* Filters and Search */}
          <div className="mb-6">
            <FilterControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={setFilters}
              userRole={user?.role}
            />
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mb-6">
              <BulkActions
                selectedCount={selectedUsers.length}
                onBulkAction={handleBulkAction}
                userRole={user?.role}
              />
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-text-primary">{filteredUsers.length}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-success">
                    {filteredUsers.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-success-50 rounded-lg">
                  <Icon name="UserCheck" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Group Heads</p>
                  <p className="text-2xl font-bold text-warning">
                    {filteredUsers.filter(u => u.role === 'group_head').length}
                  </p>
                </div>
                <div className="p-3 bg-warning-50 rounded-lg">
                  <Icon name="Crown" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Inactive Users</p>
                  <p className="text-2xl font-bold text-error">
                    {filteredUsers.filter(u => u.status === 'inactive').length}
                  </p>
                </div>
                <div className="p-3 bg-error-50 rounded-lg">
                  <Icon name="UserX" size={24} className="text-error" />
                </div>
              </div>
            </div>
          </div>

          {/* User Table */}
          <UserTable
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onSelectionChange={setSelectedUsers}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            canEditUser={canEditUser}
            canDeleteUser={canDeleteUser}
            userRole={user?.role}
          />
        </div>
      </main>

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowUserModal(false)}
          onSave={handleSaveUser}
          userRole={user?.role}
        />
      )}
    </div>
  );
};

export default UserManagement;