import React, { useEffect, useState } from 'react';
import { Stack, Text, Image, ImageFit, useTheme } from '@fluentui/react';
import { Card } from './Card';

const fetchTrendingCoins = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
  const data = await response.json();
  console.log("trending", data.coins)
  return data.coins.slice(0, 3);
};

export const TrendingWidget: React.FC = () => {
  const theme = useTheme(); 
  const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTrendingCoins = async () => {
      try {
        const data = await fetchTrendingCoins();
        setTrendingCoins(data);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTrendingCoins();
  }, []);

  return (
    <Card headerText="Trending Coins">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack tokens={{ childrenGap: 10 }}>
          {trendingCoins.map(({ item }) => (
            <Stack key={item.id} horizontal verticalAlign="center" horizontalAlign="start">
              {/* Coin image */}
              <Image 
                src={item.small} 
                alt={item.name} 
                width={24} 
                height={24} 
                imageFit={ImageFit.contain}
                styles={{ root: { marginRight: 10 } }} 
              />

              {/* Coin name and symbol */}
              <Text styles={{ root: { color: theme.palette.neutralPrimary, textAlign: 'left' } }}>
                {item.name}
              </Text>

              {/* Coin ranking (if available) */}
              <Text styles={{ root: { color: theme.palette.white, textAlign: 'right', marginLeft: 'auto' } }}>
                Rank #{item.market_cap_rank ?? 'N/A'}
              </Text>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
};
