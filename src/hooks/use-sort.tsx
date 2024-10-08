import { useState } from "react";

interface ColumnConfig<T> {
  label: string;
  sortValue?: (item: T) => string | number;
  render: (item: T) => React.ReactNode;
  header?: () => React.ReactNode;
}

interface UseSortReturn<T> {
  sortOrder: 'asc' | 'desc' | null;
  sortBy: string | null;
  sortedData: T[];
  setSortColumn: (label: string) => void;
}

function useSort<T>(data: T[], config: ColumnConfig<T>[]): UseSortReturn<T> {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const setSortColumn = (label: string) => {
    if (sortBy && label !== sortBy) {
      setSortOrder('desc');
      setSortBy(label);
      return;
    }
    if (sortOrder === null) {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  // Sort the data based on sortOrder and sortBy
  let sortedData = data;
  if (sortOrder && sortBy) {
    const column = config.find((column) => column.label === sortBy);
    if (column && column.sortValue) {
      sortedData = [...data].sort((a, b) => {
        const valueA = column.sortValue!(a); // Assert that sortValue exists
        const valueB = column.sortValue!(b);

        const reverseOrder = sortOrder === 'asc' ? 1 : -1;

        // Ensure both valueA and valueB are of the same type for comparison
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB) * reverseOrder;
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * reverseOrder;
        } else {
          return 0; // If types mismatch or are uncomparable, return 0 (no sorting)
        }
      });
    }
  }

  return {
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn,
  };
}

export default useSort;
