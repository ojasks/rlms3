import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DataTable = ({ data, userRole }) => {
  const [sortField, setSortField] = useState('submissionDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort data
  const filteredData = data.filter(item =>
    item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.formType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.userGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'submissionDate') {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortField === 'score') {
      const scoreA = a[sortField] === '-' ? 0 : parseInt(a[sortField]);
      const scoreB = b[sortField] === '-' ? 0 : parseInt(b[sortField]);
      return sortDirection === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    }

    const valueA = a[sortField].toString().toLowerCase();
    const valueB = b[sortField].toString().toLowerCase();
    
    if (sortDirection === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Completed': { bg: 'bg-success-100', text: 'text-success', icon: 'CheckCircle' },
      'Pending': { bg: 'bg-warning-100', text: 'text-warning', icon: 'Clock' },
      'Overdue': { bg: 'bg-error-100', text: 'text-error', icon: 'AlertTriangle' }
    };

    const config = statusConfig[status] || statusConfig['Pending'];

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon name={config.icon} size={12} />
        <span>{status}</span>
      </span>
    );
  };

  const getScoreBadge = (score) => {
    if (score === '-') return <span className="text-text-secondary">-</span>;
    
    const numScore = parseInt(score);
    let colorClass = 'text-success';
    
    if (numScore < 70) colorClass = 'text-error';
    else if (numScore < 85) colorClass = 'text-warning';
    
    return <span className={`font-medium ${colorClass}`}>{score}%</span>;
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-0">
            Response Data
          </h3>
          
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <input
                type="text"
                placeholder="Search responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Export Button */}
            <button className="inline-flex items-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200">
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('formType')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                >
                  <span>Form Type</span>
                  <Icon 
                    name={sortField === 'formType' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('userName')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                >
                  <span>User</span>
                  <Icon 
                    name={sortField === 'userName' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={12} 
                  />
                </button>
              </th>
              {userRole === 'admin' && (
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('userGroup')}
                    className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                  >
                    <span>Group</span>
                    <Icon 
                      name={sortField === 'userGroup' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={12} 
                    />
                  </button>
                </th>
              )}
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                >
                  <span>Date</span>
                  <Icon 
                    name={sortField === 'submissionDate' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Status</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Response Time</span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center space-x-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                >
                  <span>Score</span>
                  <Icon 
                    name={sortField === 'score' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-secondary-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-text-primary">{item.formType}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary">{item.userName}</div>
                </td>
                {userRole === 'admin' && (
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-secondary">{item.userGroup}</div>
                  </td>
                )}
                <td className="px-6 py-4">
                  <div className="text-sm text-text-secondary">
                    {new Date(item.submissionDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-secondary">{item.responseTime}</div>
                </td>
                <td className="px-6 py-4">
                  {getScoreBadge(item.score)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200">
                      <Icon name="Download" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 transition-colors duration-200"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                        currentPage === page
                          ? 'bg-primary text-white' :'border border-border hover:bg-secondary-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;