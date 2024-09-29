import React, { useState } from 'react';
import { Stack, SearchBox, IStackTokens, useTheme } from '@fluentui/react';
import Table from './Table';
import SponsoredRow from '../Ads/SponsoredRow';
import { getSearchBoxStyles } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';

interface CoinTableProps<T> {
  data: T[];
  config: any[];
  keyFn: (row: T) => string;
  onRowClick?: (id: string) => void;
  handleLikeToggle: (coinId: string) => void; // Prop for like toggle function
  likedCoins: Record<string, boolean>; // A mapping of liked coins (coinId to boolean)}
  setShowLikedCoins: React.Dispatch<React.SetStateAction<boolean>>; // To toggle liked coins display
}
const CoinTable = <T extends { id: string }>({
  data,
  config,
  keyFn,
  handleLikeToggle, // Accept the handleLikeToggle prop
  likedCoins, // Accept likedCoins as a prop
  setShowLikedCoins, // Accept setShowLikedCoins as a prop
}: CoinTableProps<T>) => {
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
        <Table
          data={filteredData}
          config={config}
          keyFn={keyFn}
          onRowClick={handleRowClick}
          handleLikeToggle={handleLikeToggle} // Pass handleLikeToggle to Table
          likedCoins={likedCoins}
          setShowLikedCoins={setShowLikedCoins} // Pass the setShowLikedCoins function
        />
      </Stack.Item>
    </Stack>
  );
};

export default CoinTable;
