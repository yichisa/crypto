import React, { useEffect, useState } from 'react';
import CoinTable from './Coins/CoinTable';
import { fetchCoins, Coin } from '../services/api';

const CACHE_KEY = 'crypto_data';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Define the column configuration for the table
const config = [
{
    label: 'Coin', // Column for the symbol icon
    render: (coin: Coin) => <img src={coin.image} alt={coin.name} className="w-8 h-8" />, // Render coin icon
    sortValue: undefined, // No sorting for images
    },
  {
    label: 'Name',
    render: (coin: any) => (
        <div className="w-24 truncate"> {/* Adds text truncation for long names */}
        <span className="block font-semibold text-white">{coin.symbol.toUpperCase()}</span>
        <span className="block text-sm text-gray-400">{coin.name}</span>
        </div>
      ),
    sortValue: (coin: Coin) => coin.name,
  },
  {
    label: 'Price',
    render: (coin: Coin) => formatLargeNumber(coin.current_price),
    sortValue: (coin: Coin) => coin.current_price,
  },
  {
    label: 'Market Cap',
    render: (coin: Coin) => formatLargeNumber(coin.market_cap),
    sortValue: (coin: Coin) => coin.market_cap,
  },
  {
    label: 'Total Volumn',
    render: (coin: Coin) => formatLargeNumber(coin.total_volume),
    sortValue: (coin: Coin) => coin.total_volume,
  },
  {
    label: '24h High',
    render: (coin: Coin) => formatLargeNumber(coin.high_24h),
    sortValue: (coin: Coin) => coin.high_24h,
  },
  {
    label: '24h Low',
    render: (coin: Coin) => formatLargeNumber(coin.low_24h),
    sortValue: (coin: Coin) => coin.low_24h,
  },
  {
    label: '24h Change',
    render: (coin: any) => (
        <span className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
          {formatLargeNumber(coin.price_change_percentage_24h)}%
        </span>
      ),
    sortValue: (coin: Coin) => coin.price_change_percentage_24h,
  },
];

// The key function to identify each row uniquely
const keyFn = (coin: Coin) => coin.id;

const formatLargeNumber = (num: number) => {
    if (Math.abs(num) >= 1.0e12) {
      return `$${(num / 1.0e12).toFixed(2)} T`;
    } else if (Math.abs(num) >= 1.0e9) {
      return `$${(num / 1.0e9).toFixed(2)} B`;
    } else if (Math.abs(num) >= 1.0e6) {
      return `$${(num / 1.0e6).toFixed(2)} M`;
    } else if (Math.abs(num) >= 1.0e3) {
      return `$${(num / 1.0e3).toFixed(2)} K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

const Home: React.FC = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("data", data)
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

        const cachedData = getCachedData();
        if (cachedData) {
          setData(cachedData); // Use cached data if available
          setLoading(false);
          return;
        }

        // Fetch data from API if no cache or cache is expired
        const coins = await fetchCoins();
        setData(coins);
        localStorage.setItem(CACHE_KEY, JSON.stringify(coins));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
        setLoading(false);
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
