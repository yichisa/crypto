import React, { useState } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import Table from './Table';
import useSort from '../../hooks/use-sort';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

// Define types for column configuration
interface ColumnConfig<T> {
  label: string;
  sortValue?: (item: T) => any; // Function to extract the sortable value from a row
  render: (item: T) => React.ReactNode;
  header?: () => React.ReactNode;
}

// Define the props for SortableTable
interface CoinTableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void; // Add row click handler
}

// Generic SortableTable component with typed props
const CoinTable = <T extends { id: string }>({ data, config, keyFn, onRowClick }: CoinTableProps<T>) => {
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config);

  // Modify config to include sorting capabilities
  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column,
      header: () => (
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
          onClick={() => setSortColumn(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  return (
    <Table
      data={sortedData}
      config={updatedConfig}
      keyFn={keyFn}
      onRowClick={onRowClick}
    />
  );
};

// Helper function to get sort icons
const getIcons = (label: string, sortBy: string | null, sortOrder: 'asc' | 'desc' | null) => {
  if (label !== sortBy) {
    return (
      <div>
        <GoArrowUp />
        <GoArrowDown />
      </div>
    );
  }

  if (sortOrder === 'asc') {
    return <GoArrowDown />;
  } else if (sortOrder === 'desc') {
    return <GoArrowUp />;
  }

  return (
    <div>
      <GoArrowUp />
      <GoArrowDown />
    </div>
  );
};

// Main component with search functionality
const CoinTableWithSearch = <T extends { id: string }>({ data, config, keyFn }: CoinTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Use navigate to handle row click navigation

  // Filter the data based on the search query (search by coin name or symbol)
  const filteredData = data.filter((coin: any) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Row click handler for navigating to coin detail
  const handleRowClick = (id: string) => {
    navigate(`/coin/${id}`); // Navigate to coin detail page using the coin's ID
  };

  return (
    <div className="p-4 max-w-5xl mx-auto"> {/* Adjust max-w for table and input width */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CoinTable data={filteredData} config={config} keyFn={keyFn} onRowClick={handleRowClick} /> {/* Pass row click handler */}
    </div>
  );
};

export default CoinTableWithSearch;
