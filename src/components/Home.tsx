import React, { useEffect, useState } from 'react';
import CoinTable from './Coins/CoinTable';
import { fetchCoins, fetchCoinMovementData, Coin } from '../services/api';
import { config } from './Coins/coinTableConfig';

const CACHE_KEY = 'crypto_data';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds

// The key function to identify each row uniquely
const keyFn = (coin: Coin) => coin.id;

const Home: React.FC = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch movement data at 1-minute intervals for each coin
  const fetchMovementDataAtIntervals = (coins: Coin[]) => {
    coins.forEach((coin, index) => {
      // Fetch movement data for each coin with a delay of 1 minute per coin
      setTimeout(async () => {
        const movementData = await fetchCoinMovementData(coin.id);
        setData((prevData) =>
          prevData.map((c) =>
            c.id === coin.id ? { ...c, movementData, isLoading: false } : c
          )
        );
      }, index * 60 * 1000); // Delay of 1 minute (60000 ms) per coin
    });
  };

  useEffect(() => {
    const getCachedData = () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

      if (cachedData && cacheTimestamp) {
        const now = Date.now();
        if (now - parseInt(cacheTimestamp) < CACHE_EXPIRATION) {
          return JSON.parse(cachedData); // Return cached data if still valid
        }
      }
      return null;
    };

    const getCoins = async () => {
      try {
        setLoading(true);

        // const cachedData = getCachedData();
        // if (cachedData) {
        //   setData(cachedData); // Use cached data if available
        //   setLoading(false);
        //   return;
        // }

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
        fetchMovementDataAtIntervals(initialData);

        // Cache the data in localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify(initialData));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
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
