import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange, placeholder }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="Search" size={16} className="text-text-secondary" />
      </div>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 text-sm bg-surface border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary placeholder-text-tertiary"
      />
      
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-text-primary transition-colors duration-200"
        >
          <Icon name="X" size={16} className="text-text-secondary" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;