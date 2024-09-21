import React from 'react';
import { SearchBox } from '@fluentui/react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <SearchBox
      placeholder="Search coins..."
      value={searchQuery}
      onChange={(_, newValue) => onSearchChange(newValue || '')}
      underlined={false} // Optional, to style the search box differently
    />
  );
};

export default SearchBar;
