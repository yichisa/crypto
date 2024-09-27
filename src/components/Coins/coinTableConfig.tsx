import { Image, Text, Stack, ImageFit } from '@fluentui/react';
import { Coin } from '../../services/api';
import LineChart from './LineChart';
import { formatLargeNumber } from '../../utils/formatters';

export const config = [
  {
    label: 'Coin',
    render: (coin: Coin) => (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        {/* Fluent UI Image with fixed size and ImageFit */}
        <Image
          src={coin.image}
          alt={coin.name}
          width={32}   // Fixed width
          height={32}  // Fixed height
          imageFit={ImageFit.cover}
          styles={{ root: { borderRadius: '50%' } }}  // Rounded image (circular)
        />

        {/* Coin Name and ID */}
        <Stack styles={{ root: { overflow: 'hidden' } }}>
          <Text variant="medium" styles={{ root: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }}>
            {coin.id.toUpperCase()}  {/* Coin ID */}
          </Text>
          <Text variant="small" styles={{ root: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }}>
            {coin.name}  {/* Coin Name */}
          </Text>
        </Stack>
      </Stack>
    ),
    sortValue: (coin: Coin) => coin.name,
  },
  {
    label: 'Price',
    render: (coin: Coin) => (
      <Text>
        {formatLargeNumber(coin.current_price)}
      </Text>
    ),
    sortValue: (coin: Coin) => coin.current_price,
  },
  {
    label: 'Market Cap',
    render: (coin: Coin) => (
      <Text>
        {formatLargeNumber(coin.market_cap)}
      </Text>
    ),
    sortValue: (coin: Coin) => coin.market_cap,
  },
  {
    label: 'Total Volume',
    render: (coin: Coin) => (
      <Text>
        {formatLargeNumber(coin.total_volume)}
      </Text>
    ),
    sortValue: (coin: Coin) => coin.total_volume,
  },
  {
    label: '24h High',
    render: (coin: Coin) => (
      <Text>
        {formatLargeNumber(coin.high_24h)}
      </Text>
    ),
    sortValue: (coin: Coin) => coin.high_24h,
  },
  {
    label: '24h Low',
    render: (coin: Coin) => (
      <Text>
        {formatLargeNumber(coin.low_24h)}
      </Text>
    ),
    sortValue: (coin: Coin) => coin.low_24h,
  },
  {
    label: '24h Change',
    render: (coin: Coin) => (
      <Stack
        verticalAlign="center"
        styles={{
          root: {
            backgroundColor: coin.price_change_percentage_24h > 0 ? '#52DFA2' : '#f4737c',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '70px',
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
