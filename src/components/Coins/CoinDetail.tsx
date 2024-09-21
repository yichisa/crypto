import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinById, CoinDetails } from '../../services/api';
import { Text, Stack } from '@fluentui/react';

const CoinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get coin id from route parameters
  const [coin, setCoin] = useState<CoinDetails | null>(null); // Use CoinDetails type here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const fetchedCoin = await fetchCoinById(id!); // Fetching CoinDetails by ID
        setCoin(fetchedCoin);
      } catch (error) {
        console.error('Error fetching coin details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!coin) {
    return <Text>No coin data available</Text>;
  }

  return (
    <Stack>
      <Text variant="xLarge">{coin.name} ({coin.symbol.toUpperCase()})</Text> {/* coin.symbol comes from CoinDetails */}
      <Text variant="medium">Current Price: ${coin.market_data.current_price.usd}</Text>
      <Text variant="medium">Market Cap: ${coin.market_data.market_cap.usd}</Text>
      <Text variant="small">{coin.description.en}</Text> {/* coin.description.en comes from CoinDetails */}
    </Stack>
  );
};

export default CoinDetail;
