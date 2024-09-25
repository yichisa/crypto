import React, { useEffect, useState } from 'react';
import { Spinner, Stack, Text, useTheme } from '@fluentui/react';
import CoinTable from '../components/Coins/CoinTable';
import { fetchMovementDataSequentially, fetchCoins, Coin } from '../services/api';
import { config } from '../components/Coins/coinTableConfig';
import Banner from '../components/Ads/Banner';
import { RecentlyAddedCoinsWidget } from '../components/Coins/RecentlyAddedCoinsWidget';
import { MarketOverviewWidget } from '../components/Coins/MarketOverviewWidget';
import { TrendingWidget } from '../components/Coins/TrendingWidget';
import { TopExchangesWidget } from '../components/Coins/TopExchanges';

const keyFn = (coin: Coin) => coin.id;

const Home: React.FC = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);

        const coins = await fetchCoins();

        const initialData = coins.map((coin) => ({
          ...coin,
          isLoading: true,
          movementData: [],
        }));

        setData(initialData);
        setLoading(false);

        fetchMovementDataSequentially(initialData, setData);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getCoins();
  }, []);

  if (loading) {
    return (
      <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: { minHeight: '100vh', backgroundColor: theme.palette.neutralDark } }}>
        <Spinner label="Loading..." />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: { minHeight: '100vh', backgroundColor: theme.palette.neutralDark } }}>
        <Text variant="large" style={{ color: 'white' }}>
          Error: {error}
        </Text>
      </Stack>
    );
  }

  return (
    <Stack verticalAlign="start" horizontalAlign="center" styles={{ root: { minHeight: '100vh', backgroundColor: theme.palette.neutralDark, padding: '24px' } }}>
      <Banner />

      <Stack styles={{ root: { maxWidth: '1200px', width: '100%' } }}>
        {/* Widgets section */}
        <Stack horizontal horizontalAlign="space-between" wrap tokens={{ childrenGap: 20 }} styles={{ root: { marginTop: '40px', width: '100%' } }}>
          {/* Add 4 cards with equal width */}
          <Stack.Item grow styles={{ root: { maxWidth: '23%' } }}>
            <MarketOverviewWidget />
          </Stack.Item>
          <Stack.Item grow styles={{ root: { maxWidth: '23%' } }}>
            <TrendingWidget />
          </Stack.Item>
          <Stack.Item grow styles={{ root: { maxWidth: '23%' } }}>
            <RecentlyAddedCoinsWidget />
          </Stack.Item>
          <Stack.Item grow styles={{ root: { maxWidth: '23%' } }}>
            <TopExchangesWidget />
          </Stack.Item>
        </Stack>

        {/* Coin Table */}
        <Stack styles={{ root: { marginTop: '40px', width: '100%' } }}>
          <CoinTable data={data} config={config} keyFn={keyFn} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;