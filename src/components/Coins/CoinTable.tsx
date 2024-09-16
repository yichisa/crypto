import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import Table from './Table'; // Assuming this is the Table component from before
import useSort from '../../hooks/use-sort';

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
          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
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

export default CoinTable;
