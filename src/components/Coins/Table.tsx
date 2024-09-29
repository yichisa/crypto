import React, { Fragment } from 'react';
import { Text, useTheme, Icon, Stack } from '@fluentui/react';
import { getTableStyles } from '../../styles/styles';
import useSort from '../../hooks/use-sort';

interface ColumnConfig<T> {
  label: string;
  render: (row: T, handleLikeToggle?: (id: string) => void, likedCoins?: Record<string, boolean>) => React.ReactNode;
  sortValue?: (item: T) => any;
  header?: () => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void;
  handleLikeToggle?: (coinId: string) => void;
  likedCoins: Record<string, boolean>; // A mapping of liked coins (coinId to boolean)
  setShowLikedCoins: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle the view of liked coins
}


const Table = <T extends { id: string }>({
  data,
  config,
  keyFn,
  onRowClick,
  handleLikeToggle,
  likedCoins,
  setShowLikedCoins, // Add setShowLikedCoins to toggle liked coins display
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
      return null;
    }

    if (sortOrder === 'asc') {
      return <Icon iconName="CaretUpSolid8" styles={{ root: iconStyles }} />;
    } else if (sortOrder === 'desc') {
      return <Icon iconName="CaretDownSolid8" styles={{ root: iconStyles }} />;
    }

    return (
      <Stack horizontal tokens={{ childrenGap: 2 }}>
        <Icon iconName="CaretUpSolid8" styles={{ root: iconStyles }} />
        <Icon iconName="CaretDownSolid8" styles={{ root: iconStyles }} />
      </Stack>
    );
  };

  const getTdClassName = (label: string) => {
    switch (label) {
      case 'Coin':
        return styles.leftAlignedTd;
      case 'Movement':
        return styles.centerAlignedTd;
      default:
        return styles.td;
    }
  };

  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return (
      <th
        key={column.label}
        className={['Coin', '24h Change', 'Movement'].includes(column.label) ? styles.centerAlignedTh : styles.th}
        onClick={() => column.label === 'Liked' ? setShowLikedCoins((prev) => !prev) : column.sortValue && setSortColumn(column.label)} 
        style={{ cursor: column.sortValue || column.label === 'Liked' ? 'pointer' : 'default' }}
      >
        <Stack verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Text variant="small" className={styles.headerText}>
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </Text>
        </Stack>
      </th>
    );
  });

  const renderedRows = sortedData.map((rowData) => {
    const renderedCells = config.map((column) => (
      <td 
        key={column.label} 
        className={getTdClassName(column.label)}
      >
        {/* Conditionally pass handleLikeToggle and likedCoins if needed */}
        {column.label === 'Liked'
          ? column.render(rowData, handleLikeToggle, likedCoins) // For Liked column
          : column.render(rowData)}
      </td>
    ));

    return (
      <tr
        key={keyFn(rowData)}
        className={styles.tr} // Global row styles
        onClick={onRowClick ? () => onRowClick(rowData.id) : undefined}
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className={styles.tableContainer}> {/* Global styles */}
      <table className={styles.table}> {/* Global table styles */}
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;