import React, { useEffect, useState } from 'react';
import { Stack, Text, useTheme } from '@fluentui/react';
import { Card } from './Card'; 


const fetchMarketOverview = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/global');
  const data = await response.json();
  return data;
};

export const MarketOverviewWidget: React.FC = () => {
  const theme = useTheme();
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await fetchMarketOverview();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market overview:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMarketData();
  }, []);

  if (loading) {
    return (
      <Card headerText="Market Overview">
        <Text>Loading...</Text>
      </Card>
    );
  }

  if (!marketData) {
    return (
      <Card headerText="Market Overview">
        <Text>Error loading data</Text>
      </Card>
    );
  }

  const {
    total_market_cap,
    total_volume,
    market_cap_percentage: { btc: btcDominance },
  } = marketData.data;

  return (
    <Card headerText="Market Overview">
      <Stack tokens={{ childrenGap: 10 }}>
        {/* Total Market Cap */}
        <Stack horizontal horizontalAlign="space-between">
          <Text styles={{ root: { color: theme.palette.neutralPrimary } }}>Market Cap</Text>
          <Text styles={{ root: { color: theme.palette.white } }}>
            ${total_market_cap.usd.toLocaleString()}
          </Text>
        </Stack>

        {/* 24h Volume */}
        <Stack horizontal horizontalAlign="space-between">
          <Text styles={{ root: { color: theme.palette.neutralPrimary } }}>24h Volume</Text>
          <Text styles={{ root: { color: theme.palette.white } }}>
            ${total_volume.usd.toLocaleString()}
          </Text>
        </Stack>

        {/* Bitcoin Dominance */}
        <Stack horizontal horizontalAlign="space-between">
          <Text styles={{ root: { color: theme.palette.neutralPrimary } }}>Bitcoin Dominance</Text>
          <Text styles={{ root: { color: theme.palette.white } }}>
            {btcDominance.toFixed(2)}%
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};
