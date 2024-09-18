import { Fragment } from "react";

// Define the types for the table configuration
interface ColumnConfig<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  header?: () => React.ReactNode;
}

// Define the props for the Table component
interface TableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void; // Add row click handler
}

// Generic Table component with typed props
const Table = <T extends { id: string }>({ data, config, keyFn, onRowClick }: TableProps<T>) => {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th
        key={column.label}
        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
      >
        {column.label}
      </th>
    );
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr
        className="hover:bg-gray-700 border-b border-gray-600 cursor-pointer"
        key={keyFn(rowData)}
        onClick={onRowClick ? () => onRowClick(rowData.id) : undefined} // Trigger onRowClick if provided
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto max-w-5xl mx-auto">
      <table className="min-w-full divide-y divide-gray-600 table-auto bg-gray-900">
        <thead className="bg-gray-800">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
