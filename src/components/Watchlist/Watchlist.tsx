import React, { useEffect, useState } from 'react';
import { Stack, Text, useTheme, PrimaryButton } from '@fluentui/react';

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [coinData, setCoinData] = useState<any[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, []);

  useEffect(() => {
    const fetchCoinData = async () => {
      const data = await Promise.all(
        watchlist.map(async (id) => {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
          return response.json();
        })
      );
      setCoinData(data);
    };

    if (watchlist.length > 0) {
      fetchCoinData();
    }
  }, [watchlist]);

  if (watchlist.length === 0) {
    return (
      <Text styles={{ root: { color: theme.palette.neutralPrimary, margin: '20px 0' } }}>
        Your watchlist is empty.
      </Text>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20, backgroundColor: theme.palette.neutralLighter } }}>
      <Text variant="xLarge" styles={{ root: { color: theme.palette.themePrimary } }}>
        Your Watchlist
      </Text>

      <Stack>
        {coinData.map((coin) => (
          <Stack
            key={coin.id}
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 10 }}
            styles={{ root: { backgroundColor: theme.palette.white, padding: '10px', borderRadius: '4px', boxShadow: theme.effects.elevation4 } }}
          >
            <Text variant="medium" styles={{ root: { color: theme.palette.neutralPrimary } }}>
              {coin.name} - ${coin.market_data.current_price.usd}
            </Text>
            <PrimaryButton
              text="Remove"
              styles={{
                root: { marginLeft: 'auto', backgroundColor: theme.palette.themePrimary, color: theme.palette.white },
              }}
              onClick={() => {
                const updatedWatchlist = watchlist.filter((item) => item !== coin.id);
                setWatchlist(updatedWatchlist);
                localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Watchlist;
