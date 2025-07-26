import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import FormCard from './components/FormCard';
import FilterControls from './components/FilterControls';
import SearchBar from './components/SearchBar';

const FormListing = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    type: 'all',
    deadline: 'all',
    sortBy: 'name'
  });
  const [selectedForms, setSelectedForms] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "admin", // Can be 'normal', 'group_head', 'admin'
    email: "sarah.johnson@researchlab.com",
    macAddress: "00:1B:44:11:3A:B7",
    ipAddress: "192.168.1.45",
    network: "ResearchLab-Secure"
  };

  // Mock forms data
  const formsData = [
    {
      id: 1,
      title: "FORM 1",
      description: "Mandatory safety assessment covering laboratory protocols, emergency procedures, and equipment handling standards for all research personnel.",
      type: "safety",
      status: "completed",
      progress: 100,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      submissionCount: 3,
      lastSubmitted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      questionsCount: 15,
      estimatedTime: "10-15 minutes",
      priority: "high",
      assignedTo: "all",
      completionRate: 85
    },
    {
      id: 2,
      title: "FORM 2",
      description: "Comprehensive evaluation of data handling practices, cybersecurity awareness, and compliance with institutional data protection policies.",
      type: "security",
      status: "in_progress",
      progress: 60,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      submissionCount: 1,
      lastSubmitted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      questionsCount: 20,
      estimatedTime: "15-20 minutes",
      priority: "high",
      assignedTo: "all",
      completionRate: 72
    },
    {
      id: 3,
      title: "FORM 3",
      description: "Monthly equipment inspection and maintenance verification form ensuring all laboratory instruments are properly maintained and calibrated.",
      type: "maintenance",
      status: "not_started",
      progress: 0,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      submissionCount: 0,
      lastSubmitted: null,
      questionsCount: 12,
      estimatedTime: "8-12 minutes",
      priority: "medium",
      assignedTo: "group_heads",
      completionRate: 45
    },
    {
      id: 4,
      title: "FORM 4",
      description: "Quarterly review of chemical storage, usage tracking, and disposal procedures to maintain compliance with environmental and safety regulations.",
      type: "inventory",
      status: "overdue",
      progress: 25,
      deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      submissionCount: 0,
      lastSubmitted: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      questionsCount: 18,
      estimatedTime: "12-18 minutes",
      priority: "high",
      assignedTo: "all",
      completionRate: 38
    },
    {
      id: 5,
      title: "Research Ethics Compliance",
      description: "Annual ethics training completion verification and acknowledgment of research conduct guidelines and institutional review board policies.",
      type: "ethics",
      status: "completed",
      progress: 100,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      submissionCount: 2,
      lastSubmitted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      questionsCount: 25,
      estimatedTime: "20-25 minutes",
      priority: "medium",
      assignedTo: "all",
      completionRate: 91
    },
    {
      id: 6,
      title: "Waste Management Protocol",
      description: "Biweekly assessment of laboratory waste segregation, disposal procedures, and environmental impact mitigation strategies.",
      type: "environmental",
      status: "in_progress",
      progress: 40,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      submissionCount: 1,
      lastSubmitted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      questionsCount: 14,
      estimatedTime: "10-15 minutes",
      priority: "medium",
      assignedTo: "all",
      completionRate: 67
    },
    {
      id: 7,
      title: "Training Completion Verification",
      description: "Mandatory training module completion tracking for new personnel orientation, ongoing education, and certification maintenance.",
      type: "training",
      status: "not_started",
      progress: 0,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      submissionCount: 0,
      lastSubmitted: null,
      questionsCount: 10,
      estimatedTime: "5-10 minutes",
      priority: "low",
      assignedTo: "new_users",
      completionRate: 23
    },
    {
      id: 8,
      title: "Quality Assurance Checklist",
      description: "Monthly quality control assessment covering standard operating procedures, documentation accuracy, and process improvement initiatives.",
      type: "quality",
      status: "completed",
      progress: 100,
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      submissionCount: 4,
      lastSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      questionsCount: 22,
      estimatedTime: "15-20 minutes",
      priority: "medium",
      assignedTo: "group_heads",
      completionRate: 78
    },
    {
      id: 9,
      title: "Incident Reporting Form",
      description: "As-needed incident documentation for safety violations, equipment failures, or procedural non-compliance requiring immediate attention and corrective action.",
      type: "incident",
      status: "not_started",
      progress: 0,
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      submissionCount: 0,
      lastSubmitted: null,
      questionsCount: 8,
      estimatedTime: "5-8 minutes",
      priority: "high",
      assignedTo: "all",
      completionRate: 12
    }
  ];

  // Filter forms based on user role and permissions
  const getFilteredForms = () => {
    let filteredForms = [...formsData];

    // Role-based filtering
    if (currentUser.role === 'normal') {
      filteredForms = filteredForms.filter(form => 
        form.assignedTo === 'all' || form.assignedTo === 'new_users'
      );
    } else if (currentUser.role === 'group_head') {
      filteredForms = filteredForms.filter(form => 
        form.assignedTo === 'all' || form.assignedTo === 'group_heads'
      );
    }

    // Search filtering
    if (searchQuery) {
      filteredForms = filteredForms.filter(form =>
        form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filtering
    if (selectedFilters.status !== 'all') {
      filteredForms = filteredForms.filter(form => form.status === selectedFilters.status);
    }

    // Type filtering
    if (selectedFilters.type !== 'all') {
      filteredForms = filteredForms.filter(form => form.type === selectedFilters.type);
    }

    // Deadline filtering
    if (selectedFilters.deadline !== 'all') {
      const now = new Date();
      filteredForms = filteredForms.filter(form => {
        const daysUntilDeadline = Math.ceil((form.deadline - now) / (1000 * 60 * 60 * 24));
        
        switch (selectedFilters.deadline) {
          case 'overdue':
            return daysUntilDeadline < 0;
          case 'due_soon':
            return daysUntilDeadline >= 0 && daysUntilDeadline <= 7;
          case 'due_later':
            return daysUntilDeadline > 7;
          default:
            return true;
        }
      });
    }

    // Sorting
    filteredForms.sort((a, b) => {
      switch (selectedFilters.sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'status':
          return a.status.localeCompare(b.status);
        case 'completion':
          return b.progress - a.progress;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filteredForms;
  };

  const filteredForms = getFilteredForms();

  const handleFormSelect = (formId) => {
    setSelectedForms(prev => {
      const newSelection = prev.includes(formId)
        ? prev.filter(id => id !== formId)
        : [...prev, formId];
      
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedForms.length === filteredForms.length) {
      setSelectedForms([]);
      setShowBulkActions(false);
    } else {
      setSelectedForms(filteredForms.map(form => form.id));
      setShowBulkActions(true);
    }
  };

  const handleBulkExport = () => {
    console.log('Exporting forms:', selectedForms);
    // Mock export functionality
    alert(`Exporting ${selectedForms.length} form(s) data...`);
  };

  const handleFormAction = (formId, action) => {
    const form = formsData.find(f => f.id === formId);
    
    switch (action) {
      case 'start': case'continue': navigate('/form-completion', { state: { formId, formTitle: form.title } });
        break;
      case 'view': navigate('/response-analytics', { state: { formId, formTitle: form.title } });
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const getStatusStats = () => {
    const stats = {
      total: filteredForms.length,
      completed: filteredForms.filter(f => f.status === 'completed').length,
      inProgress: filteredForms.filter(f => f.status === 'in_progress').length,
      overdue: filteredForms.filter(f => f.status === 'overdue').length,
      notStarted: filteredForms.filter(f => f.status === 'not_started').length
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={currentUser}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userRole={currentUser.role}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`
        pt-header transition-all duration-300 ease-in-out min-h-screen
        ${isSidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar'}
      `}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">Form Listing</h1>
                <p className="text-text-secondary">
                  Browse and manage compliance forms based on your role permissions
                </p>
              </div>
              
              {currentUser.role === 'admin' && (
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button
                    onClick={handleBulkExport}
                    disabled={selectedForms.length === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Icon name="Download" size={16} />
                    <span>Export Selected</span>
                  </button>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Total Forms</p>
                    <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
                  </div>
                  <Icon name="FileText" size={24} className="text-secondary-400" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Completed</p>
                    <p className="text-2xl font-bold text-success">{stats.completed}</p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">In Progress</p>
                    <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
                  </div>
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Overdue</p>
                    <p className="text-2xl font-bold text-error">{stats.overdue}</p>
                  </div>
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Not Started</p>
                    <p className="text-2xl font-bold text-secondary-400">{stats.notStarted}</p>
                  </div>
                  <Icon name="Circle" size={24} className="text-secondary-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-surface border border-border rounded-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search forms by title, description, or type..."
              />
              
              <FilterControls
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
                formsData={formsData}
              />
            </div>

            {/* Bulk Actions */}
            {showBulkActions && currentUser.role === 'admin' && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center space-x-2 text-sm text-primary hover:text-primary-700"
                    >
                      <Icon 
                        name={selectedForms.length === filteredForms.length ? "CheckSquare" : "Square"} 
                        size={16} 
                      />
                      <span>
                        {selectedForms.length === filteredForms.length ? 'Deselect All' : 'Select All'}
                      </span>
                    </button>
                    <span className="text-sm text-text-secondary">
                      {selectedForms.length} of {filteredForms.length} forms selected
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Forms Grid */}
          {filteredForms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  userRole={currentUser.role}
                  isSelected={selectedForms.includes(form.id)}
                  onSelect={handleFormSelect}
                  onAction={handleFormAction}
                  showCheckbox={currentUser.role === 'admin'}
                />
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-lg p-12 text-center">
              <Icon name="Search" size={48} className="text-secondary-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No Forms Found</h3>
              <p className="text-text-secondary mb-4">
                {searchQuery || Object.values(selectedFilters).some(f => f !== 'all')
                  ? 'Try adjusting your search criteria or filters' :'No forms are available for your current role'
                }
              </p>
              {(searchQuery || Object.values(selectedFilters).some(f => f !== 'all')) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilters({
                      status: 'all',
                      type: 'all',
                      deadline: 'all',
                      sortBy: 'name'
                    });
                  }}
                  className="text-primary hover:text-primary-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FormListing;