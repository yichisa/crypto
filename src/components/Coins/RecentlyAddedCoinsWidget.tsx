import React, { useEffect, useState } from 'react';
import { fetchRecentlyAddedCoins } from '../../services/api';
import { Coin } from '../../services/api';
import { Stack, Text, Image, ImageFit, useTheme } from '@fluentui/react';
import { Card } from './Card';


export const RecentlyAddedCoinsWidget: React.FC = () => {
  const theme = useTheme();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const newCoins = await fetchRecentlyAddedCoins();
        
        setCoins(newCoins);
      } catch (error) {
        console.error('Error fetching recently added coins:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCoins();
  }, []);
  console.log(coins);
  return (
    <Card headerText="Recently Added">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack tokens={{ childrenGap: 10 }}>
          {coins.map((coin) => (
            <Stack key={coin.id} horizontal horizontalAlign="space-between">
              <Image 
                src={coin.image} 
                alt={coin.name} 
                width={32} 
                height={32} 
                imageFit={ImageFit.contain}
              />
              <Text styles={{ root: { color: theme.palette.neutralPrimary } }}>{coin.name} ({coin.symbol.toUpperCase()})</Text>
              <Text styles={{ root: { color: theme.palette.neutralPrimary } }}>${coin.current_price.toLocaleString()}</Text>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
};
