import { Image, Text, Stack, ImageFit } from '@fluentui/react';
import { Coin } from '../../services/api';
import LineChart from './LineChart';
import { formatLargeNumber } from '../../utils/formatters';

export const config = [
  {
    label: 'Coin',
    render: (coin: Coin) => (
      <Image 
        src={coin.image} 
        alt={coin.name} 
        width={32} 
        height={32} 
        imageFit={ImageFit.contain}
      />
    ),
    sortValue: undefined,
  },
  {
    label: 'Name',
    render: (coin: Coin) => (
      <Stack>
        <Text variant="medium">
          {coin.id.toUpperCase()}
        </Text>
        <Text variant="small">
          {coin.name}
        </Text>
      </Stack>
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
    label: 'Total Volume',
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
    render: (coin: Coin) => (
      <Stack
        horizontal
        verticalAlign="center"
        styles={{
          root: {
            backgroundColor: coin.price_change_percentage_24h > 0 ? '#52DFA2' : '#f4737c',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '12px',
            textAlign: 'center',
            minWidth: '60px',
            fontWeight: 'bold',
          },
        }}
      >
        <Text variant="small" styles={{ root: { color: '#fff', fontWeight: 'bold' } }}>
          {formatLargeNumber(coin.price_change_percentage_24h)}%
        </Text>
      </Stack>
    ),
    sortValue: (coin: Coin) => coin.price_change_percentage_24h,
  },
  {
    label: 'Movement',
    render: (coin: Coin) => {
      return coin.isLoading ? (
        <Text>Loading...</Text>
      ) : coin.movementData && coin.movementData.length > 0 ? (
        <LineChart dataPoints={coin.movementData} />
      ) : (
        <Text>No data</Text>
      );
    },
  },
];

export const keyFn = (coin: Coin) => coin.id;
