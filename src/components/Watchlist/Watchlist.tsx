// src/components/Watchlist/Watchlist.tsx

import React, { useEffect, useState } from 'react';

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [coinData, setCoinData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch watchlist from local storage or API
    const savedWatchlist = JSON.parse(
      localStorage.getItem('watchlist') || '[]'
    );
    setWatchlist(savedWatchlist);
  }, []);

  useEffect(() => {
    // Fetch coin data for each coin in the watchlist
    const fetchCoinData = async () => {
      const data = await Promise.all(
        watchlist.map(async (id) => {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}`
          );
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
    return <div>Your watchlist is empty.</div>;
  }

  return (
    <div>
      <h2>Your Watchlist</h2>
      <ul>
        {coinData.map((coin) => (
          <li key={coin.id}>
            <p>{coin.name}</p>
            <p>Current Price: ${coin.market_data.current_price.usd}</p>
            {/* Add more coin information or actions */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
