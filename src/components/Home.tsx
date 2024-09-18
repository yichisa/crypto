import React, { useEffect, useState } from 'react';
import CoinTable from './Coins/CoinTable';
import { fetchMovementDataSequentially, fetchCoins, Coin } from '../services/api';
import { config } from './Coins/coinTableConfig';

// The key function to identify each row uniquely
const keyFn = (coin: Coin) => coin.id;

const Home: React.FC = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);

        const coins = await fetchCoins();

        // Initialize isLoading for movement data
        const initialData = coins.map((coin) => ({
          ...coin,
          isLoading: true,
          movementData: [],
        }));

        // Set initial data to render the table with loading indicator
        setData(initialData);
        setLoading(false);

        // Fetch movement data sequentially
        fetchMovementDataSequentially(initialData, setData);

      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getCoins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Live Coin Tracker</h1>
      <CoinTable data={data} config={config} keyFn={keyFn} />
    </div>
  );
};

export default Home;
