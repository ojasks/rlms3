import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import AnalyticsFilters from './components/AnalyticsFilters';
import SummaryCards from './components/SummaryCards';
import ResponseCharts from './components/ResponseCharts';
import DataTable from './components/DataTable';
import ExportModal from './components/ExportModal';

const ResponseAnalytics = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: 'last30days',
    formType: user?.role === 'group_head' ? user.formAccess : 'all',
    userGroup: 'all',
    status: 'all'
  });

  // Role-based data filtering
  const getFilteredAnalyticsData = () => {
    const baseData = {
      summary: {
        totalForms: 847,
        completedForms: 723,
        pendingForms: 124,
        completionRate: 85.4,
        avgResponseTime: 12.5,
        trendsData: [
          { month: 'Jan', completed: 65, pending: 15 },
          { month: 'Feb', completed: 78, pending: 12 },
          { month: 'Mar', completed: 89, pending: 18 },
          { month: 'Apr', completed: 95, pending: 8 },
          { month: 'May', completed: 102, pending: 14 },
          { month: 'Jun', completed: 118, pending: 22 }
        ]
      },
      formTypeBreakdown: [
        { name: 'Form 1 - Safety Compliance', value: 156, color: '#2563EB', formId: 'form1' },
        { name: 'Form 2 - Equipment Check', value: 134, color: '#059669', formId: 'form2' },
        { name: 'Form 3 - Chemical Inventory', value: 98, color: '#D97706', formId: 'form3' },
        { name: 'Form 4 - Lab Access', value: 87, color: '#DC2626', formId: 'form4' },
        { name: 'Form 5 - Training Record', value: 76, color: '#7C3AED', formId: 'form5' },
        { name: 'Form 6 - Incident Report', value: 45, color: '#0EA5E9', formId: 'form6' },
        { name: 'Form 7 - Maintenance Log', value: 38, color: '#EC4899', formId: 'form7' },
        { name: 'Form 8 - Research Protocol', value: 32, color: '#10B981', formId: 'form8' },
        { name: 'Form 9 - Data Backup', value: 28, color: '#F59E0B', formId: 'form9' }
      ],
      responseData: [
        {
          id: 1,
          formType: 'Form 1 - Safety Compliance',
          formId: 'form1',
          userName: 'Dr. Michael Chen',
          userGroup: 'Chemistry Team',
          submissionDate: '2024-01-15',
          status: 'Completed',
          responseTime: '8 minutes',
          score: 95
        },
        {
          id: 2,
          formType: 'Form 2 - Equipment Check',
          formId: 'form2',
          userName: 'Dr. Emily Rodriguez',
          userGroup: 'Physics Team',
          submissionDate: '2024-01-14',
          status: 'Completed',
          responseTime: '12 minutes',
          score: 88
        },
        {
          id: 3,
          formType: 'Form 3 - Chemical Inventory',
          formId: 'form3',
          userName: 'Dr. James Wilson',
          userGroup: 'Biology Team',
          submissionDate: '2024-01-13',
          status: 'Pending',
          responseTime: '-',
          score: '-'
        },
        {
          id: 4,
          formType: 'Form 1 - Safety Compliance',
          formId: 'form1',
          userName: 'Dr. Lisa Thompson',
          userGroup: 'Chemistry Team',
          submissionDate: '2024-01-12',
          status: 'Completed',
          responseTime: '6 minutes',
          score: 92
        },
        {
          id: 5,
          formType: 'Form 2 - Equipment Check',
          formId: 'form2',
          userName: 'Dr. Robert Davis',
          userGroup: 'Physics Team',
          submissionDate: '2024-01-11',
          status: 'Completed',
          responseTime: '15 minutes',
          score: 78
        }
      ]
    };

    // Filter data based on user role and form access
    if (user?.role === 'group_head' && user.formAccess !== 'all') {
      const allowedFormId = user.formAccess;
      
      // Filter form type breakdown
      baseData.formTypeBreakdown = baseData.formTypeBreakdown.filter(
        form => form.formId === allowedFormId
      );
      
      // Filter response data
      baseData.responseData = baseData.responseData.filter(
        response => response.formId === allowedFormId
      );
      
      // Adjust summary based on filtered data
      const filteredResponses = baseData.responseData;
      baseData.summary.totalForms = filteredResponses.length;
      baseData.summary.completedForms = filteredResponses.filter(r => r.status === 'Completed').length;
      baseData.summary.pendingForms = filteredResponses.filter(r => r.status === 'Pending').length;
      baseData.summary.completionRate = Math.round((baseData.summary.completedForms / baseData.summary.totalForms) * 100);
    }

    return baseData;
  };

  const analyticsData = getFilteredAnalyticsData();

  const handleLogout = () => {
    logout();
    navigate('/login-screen');
  };

  const handleFilterChange = (filterType, value) => {
    // Prevent group heads from changing form type if they have restricted access
    if (filterType === 'formType' && user?.role === 'group_head' && user.formAccess !== 'all') {
      return;
    }
    
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting data in ${format} format`);
    setShowExportModal(false);
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
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">Response Analytics</h1>
                <p className="text-text-secondary">
                  {user?.role === 'admin' && 'Comprehensive analysis of all form submissions and user responses'}
                  {user?.role === 'group_head' && `Analysis of ${user.formAccess ? user.formAccess.toUpperCase() : 'assigned'} form responses`}
                </p>
                {user?.role === 'group_head' && user.formAccess && (
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                    <Icon name="Filter" size={14} className="mr-1" />
                    Viewing: {user.formAccess.replace('form', 'Form ').toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="Download" size={16} />
                  <span>Export Data</span>
                </button>
                <button className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
                  <Icon name="RefreshCw" size={16} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filters Panel */}
            <div className="lg:col-span-3">
              <AnalyticsFilters
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                userRole={user?.role}
                formAccess={user?.formAccess}
              />
            </div>

            {/* Main Analytics Area */}
            <div className="lg:col-span-9 space-y-6">
              {/* Summary Cards */}
              <SummaryCards data={analyticsData.summary} />

              {/* Charts Section */}
              <ResponseCharts
                trendsData={analyticsData.summary.trendsData}
                formTypeData={analyticsData.formTypeBreakdown}
              />

              {/* Data Table */}
              <DataTable
                data={analyticsData.responseData}
                userRole={user?.role}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};

export default ResponseAnalytics;