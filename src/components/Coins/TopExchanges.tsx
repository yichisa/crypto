import React, { useEffect, useState } from 'react';
import { Stack, Text, useTheme } from '@fluentui/react';
import { Card } from './Card';

const fetchTopExchanges = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/exchanges');
  const data = await response.json();
  return data.slice(0,3);
};

export const TopExchangesWidget: React.FC = () => {
  const theme = useTheme(); // Access Fluent UI theme for colors
  const [exchanges, setExchanges] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTopExchanges = async () => {
      try {
        const data = await fetchTopExchanges();
        setExchanges(data.slice(0, 5)); // Get top 5 exchanges
      } catch (error) {
        console.error('Error fetching top exchanges:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTopExchanges();
  }, []);

  return (
    <Card headerText="Top Exchanges">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack tokens={{ childrenGap: 10 }}>
          {exchanges.map((exchange) => (
            <Stack key={exchange.id} horizontal verticalAlign="center" horizontalAlign="start">
              {/* Exchange name */}
              <Text styles={{ root: { color: theme.palette.neutralPrimary, textAlign: 'left' } }}>
                {exchange.name}
              </Text>

              {/* 24-hour trading volume */}
              <Text styles={{ root: { color: theme.palette.white, textAlign: 'right', marginLeft: 'auto' } }}>
                ${exchange.trade_volume_24h_btc.toLocaleString()} BTC
              </Text>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
};
