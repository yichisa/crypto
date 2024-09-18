import React, { useEffect, useState } from 'react';
import { fetchCoinMovementData } from '../../services/api'; 
import LineChart from './LineChart';

interface CoinMovementProps {
  coinId: string;
  initialMovementData: number[]; // Pass the initial movement data if available (cached)
  isLoading: boolean;
}

const CoinMovement: React.FC<CoinMovementProps> = ({ coinId, initialMovementData, isLoading }) => {
  const [movementData, setMovementData] = useState<number[]>(initialMovementData);
  const [loading, setLoading] = useState<boolean>(isLoading);


  useEffect(() => {
    // Fetch movement data only if not available or loading
    if (!initialMovementData.length && isLoading) {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchCoinMovementData(coinId); // Fetch movement data
        setMovementData(data);
        setLoading(false);
      };
      fetchData();
    }
  }, [coinId, initialMovementData, isLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return movementData && movementData.length > 0 ? (
    <LineChart dataPoints={movementData} />
  ) : (
    <div>No data</div>
  );
};

export default CoinMovement;
