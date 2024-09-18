import React, { useEffect, useState } from 'react';
import CoinTable from './Coins/CoinTable';
import { fetchCoins, fetchCoinMovementData, Coin } from '../services/api';
import { config } from './Coins/coinTableConfig';


// The key function to identify each row uniquely
const keyFn = (coin: Coin) => coin.id;

const Home: React.FC = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovementDataSequentially = async (coins: Coin[]) => {
    for (const coin of coins) {
      try {
        // Fetch movement data for each coin
        const movementData = await fetchCoinMovementData(coin.id);
  
        // Update the state with the fetched data
        setData((prevData) =>
          prevData.map((c) =>
            c.id === coin.id ? { ...c, movementData, isLoading: false } : c
          )
        );
      } catch (error) {
        console.error(`Error fetching movement data for ${coin.id}:`, error);
      }
    }
  };
  

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);

        // Fetch the top 20 coins (no movement data yet)
        const coins = await fetchCoins();

        // Initialize isLoading for movement data
        const initialData = coins.map((coin) => ({
          ...coin,
          isLoading: true,  // Set loading to true for movement data
          movementData: [], // Initialize movement data as empty
        }));

        // Set initial data to render the table with loading indicator
        setData(initialData);
        setLoading(false);

        // Fetch movement data at 1-minute intervals for each coin
        fetchMovementDataSequentially(initialData);

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
