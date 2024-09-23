import React, { Fragment } from 'react';
import { Text, useTheme, Icon } from '@fluentui/react';
import { getTableStyles } from '../../styles/styles';
import useSort from '../../hooks/use-sort';

interface ColumnConfig<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  sortValue?: (item: T) => any;
  header?: () => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void;
}

const Table = <T extends { id: string }>({
  data,
  config,
  keyFn,
  onRowClick,
}: TableProps<T>) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);
  
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config);


  const getIcons = (label: string, sortBy: string | null, sortOrder: 'asc' | 'desc' | null) => {
    const iconStyles = {
      fontSize: 15,
      color: theme.palette.themePrimary,
      marginRight: 8,
    };

    if (label !== sortBy) {
      return;
    }

    if (sortOrder === 'asc') {
      return <Icon iconName="CaretUpSolid8" styles={{ root: iconStyles }} />;
    } else if (sortOrder === 'desc') {
      return <Icon iconName="CaretDownSolid8" styles={{ root: iconStyles }} />;
    }

    return (
      <div>
        <Icon iconName="CaretUpSolid8" styles={{ root: iconStyles }} />
        <Icon iconName="CaretDownSolid8" styles={{ root: iconStyles }} />
      </div>
    );
  };


  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return (
      <th
        key={column.label}
        className={styles.th}
        onClick={() => column.sortValue && setSortColumn(column.label)} // Handle sorting
        style={{ cursor: column.sortValue ? 'pointer' : 'default' }} // Show pointer cursor for sortable columns
      >
        <div>
          {getIcons(column.label, sortBy, sortOrder)}
          <Text variant="small" className={styles.headerText}>
            {column.label}
          </Text>
        </div>
      </th>
    );
  });

  // Render table rows
  const renderedRows = sortedData.map((rowData) => {
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
