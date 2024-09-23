import React, { useState } from 'react';
import { Stack, Text, SearchBox, IStackTokens, useTheme } from '@fluentui/react';
import Table from './Table';
import { getSearchBoxStyles } from '../../styles/styles';
import { Icon } from '@fluentui/react';
import useSort from '../../hooks/use-sort';
import { useNavigate } from 'react-router-dom';

interface ColumnConfig<T> {
  label: string;
  sortValue?: (item: T) => any;
  render: (item: T) => React.ReactNode;
  header?: () => React.ReactNode;
}

interface CoinTableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void;
}

const CoinTable = <T extends { id: string }>({ data, config, keyFn, onRowClick }: CoinTableProps<T>) => {
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config);

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column,
      header: () => (
        <th onClick={() => setSortColumn(column.label)}>
          <Stack horizontal verticalAlign="center">
            {getIcons(column.label, sortBy, sortOrder)}
            <Text variant="small">{column.label}</Text>
          </Stack>
        </th>
      ),
    };
  });

  return <Table data={sortedData} config={updatedConfig} keyFn={keyFn} onRowClick={onRowClick} />;
};

const getIcons = (label: string, sortBy: string | null, sortOrder:  'desc' | 'asc' | null) => {
  if (label !== sortBy) {
    return;
  }

  if (sortOrder === 'asc') {
    return <Icon iconName="CaretUpSolid8" />;
  } else if (sortOrder === 'desc') {
    return <Icon iconName="CaretDownSolid8" />;
  }

  return (
    <div>
      <Icon iconName="CaretUpSolid8" />
      <Icon iconName="CaretDownSolid8" />
    </div>
  );
};

const CoinTableWithSearch = <T extends { id: string }>({ data, config, keyFn }: CoinTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme(); // Access Fluent UI theme
  const styles = getSearchBoxStyles(theme)

  const filteredData = data.filter((coin: any) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (id: string) => {
    navigate(`/coin/${id}`);
  };

  const stackTokens: IStackTokens = { childrenGap: 20 };

  return (
    <Stack tokens={stackTokens}>
      <Stack.Item align="center">
        <SearchBox
          placeholder="Search coins.."
          value={searchQuery}
          onChange={(_, newValue) => setSearchQuery(newValue || '')}
          underlined={false}
          styles={styles}
        />
      </Stack.Item>
      <Stack.Item>
        <CoinTable data={filteredData} config={config} keyFn={keyFn} onRowClick={handleRowClick} />
      </Stack.Item>
    </Stack>
  );
};

export default CoinTableWithSearch;
