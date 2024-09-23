import React, { Fragment } from "react";
import { Text, useTheme } from '@fluentui/react';
import { getTableStyles } from  "../../styles/styles";

interface ColumnConfig<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  header?: () => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void;
}

const Table = <T extends { id: string }>({ data, config, keyFn, onRowClick }: TableProps<T>) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th key={column.label}>
        <Text variant="small" className={styles.headerText}>
          {column.label}
        </Text>
      </th>
    );
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => (
      <td key={column.label} className={styles.td}>
        {column.render(rowData)}
      </td>
    ));

    return (
      <tr
        key={keyFn(rowData)}
        className={styles.tr}
        onClick={onRowClick ? () => onRowClick(rowData.id) : undefined}
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.th}>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
