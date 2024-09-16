import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search coins..."
      className="mb-4 p-2 border border-teal-500 focus:ring-teal-500 focus:border-teal-500 rounded-md w-full"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)} // Pass search query back to the parent
    />
  );
};

export default SearchBar;
