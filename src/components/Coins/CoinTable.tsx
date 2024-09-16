import React, { useState } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import Table from './Table';
import useSort from '../../hooks/use-sort';
import SearchBar from './SearchBar';

// Define types for column configuration
interface ColumnConfig<T> {
  label: string;
  sortValue?: (item: T) => any; // Function to extract the sortable value from a row
  render: (item: T) => React.ReactNode;
  header?: () => React.ReactNode;
}

// Define the props for SortableTable
interface SortableTableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
}

// Generic SortableTable component with typed props
const CoinTable = <T,>({ data, config, keyFn }: SortableTableProps<T>) => {
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

  return <Table data={sortedData} config={updatedConfig} keyFn={keyFn} />;
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
const CoinTableWithSearch = <T,>({ data, config, keyFn }: SortableTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Filter the data based on the search query (search by coin name or symbol)
  const filteredData = data.filter((coin: any) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto"> {/* Adjust max-w for table and input width */}
      {/* Use the new SearchBar component */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CoinTable data={filteredData} config={config} keyFn={keyFn} />
    </div>
  );
};

export default CoinTableWithSearch;
