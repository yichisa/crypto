import React, { useState } from 'react';
import { Stack, SearchBox, IStackTokens, useTheme } from '@fluentui/react';
import Table from './Table';
import SponsoredRow from '../Ads/SponsoredRow';
import { getSearchBoxStyles } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';

interface ColumnConfig<T> {
  label: string;
  sortValue?: (item: T) => any;
  render: (item: T) => React.ReactNode;
}

interface CoinTableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void;
}

const CoinTable = <T extends { id: string }>({ data, config, keyFn }: CoinTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = getSearchBoxStyles(theme);

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
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        {/* Sponsored Row */}
        <SponsoredRow />
      
        {/* Search Box */}
        <SearchBox
          placeholder="Search coins..."
          value={searchQuery}
          onChange={(_, newValue) => setSearchQuery(newValue || '')}
          underlined={false}
          styles={styles}
        />
      </Stack>

      {/* Table with filtered data */}
      <Stack.Item>
        <Table data={filteredData} config={config} keyFn={keyFn} onRowClick={handleRowClick} />
      </Stack.Item>
    </Stack>
  );
};

export default CoinTable;
