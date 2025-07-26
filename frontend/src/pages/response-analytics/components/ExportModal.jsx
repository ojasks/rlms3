import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedData, setSelectedData] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV', description: 'Comma-separated values for spreadsheet applications' },
    { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel format with formatting' },
    { value: 'pdf', label: 'PDF', description: 'Portable document format for reports' },
    { value: 'json', label: 'JSON', description: 'JavaScript Object Notation for developers' }
  ];

  const dataOptions = [
    { value: 'all', label: 'All Data', description: 'Export complete dataset' },
    { value: 'filtered', label: 'Filtered Data', description: 'Export currently filtered results' },
    { value: 'summary', label: 'Summary Only', description: 'Export aggregated statistics only' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onExport({
      format: selectedFormat,
      data: selectedData,
      dateRange: dateRange
    });
    
    setIsExporting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Export Data</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-md transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              {formatOptions.map(option => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 p-3 border border-border rounded-md hover:bg-secondary-50 cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={selectedFormat === option.value}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Data to Export
            </label>
            <div className="space-y-2">
              {dataOptions.map(option => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 p-3 border border-border rounded-md hover:bg-secondary-50 cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="data"
                    value={option.value}
                    checked={selectedData === option.value}
                    onChange={(e) => setSelectedData(e.target.value)}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Preview */}
          <div className="bg-secondary-50 rounded-md p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Export Preview</h4>
            <div className="space-y-1 text-sm text-text-secondary">
              <div>Format: <span className="font-medium">{formatOptions.find(f => f.value === selectedFormat)?.label}</span></div>
              <div>Data: <span className="font-medium">{dataOptions.find(d => d.value === selectedData)?.label}</span></div>
              <div>Range: <span className="font-medium">{dateRangeOptions.find(r => r.value === dateRange)?.label}</span></div>
              <div>Estimated size: <span className="font-medium">~2.5 MB</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Export Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;