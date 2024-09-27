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

    return (
      <Card headerText="Recently Added">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Stack tokens={{ childrenGap: 10 }}>
            {coins.map((coin) => (
              <Stack key={coin.id} horizontal verticalAlign="center" horizontalAlign="start">
                {/* Coin image */}
                <Image 
                  src={coin.image} 
                  alt={coin.name} 
                  width={24} 
                  height={24} 
                  imageFit={ImageFit.contain}
                  styles={{ root: { marginRight: 10 } }}
                />

                {/* Stack to hold name, symbol, and price for better control */}
                <Stack horizontal horizontalAlign="space-between" grow>
                  {/* Align name and symbol to the left */}
                  <Text styles={{ root: { color: theme.palette.neutralPrimary, textAlign: 'left' } }}>
                    {coin.name}
                  </Text>

                  {/* Align price to the right */}
                  <Text styles={{ root: { color: theme.palette.white, textAlign: 'right', marginLeft: 'auto' } }}>
                    ${coin.current_price.toLocaleString()}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Card>
    );
  };