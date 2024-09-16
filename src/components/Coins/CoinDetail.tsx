// src/components/Coins/CoinDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CoinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Correctly type the useParams hook
  const [coinData, setCoinData] = useState<any>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    if (id) {
      fetchCoinData();
    }
  }, [id]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{coinData.name} Details</h2>
      <p>Symbol: {coinData.symbol}</p>
      <p>Current Price: ${coinData.market_data.current_price.usd}</p>
      {/* Add more coin details as needed */}
    </div>
  );
};

export default CoinDetail;
