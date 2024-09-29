import { Image, Text, Stack, ImageFit, IconButton, IIconProps } from '@fluentui/react';
import { Coin } from '../../services/api';
import LineChart from './LineChart';
import { formatLargeNumber } from '../../utils/formatters';
import { columnStyles } from '../../styles/styles';

const emptyHeartIcon: IIconProps = { iconName: 'Heart', styles: { root: { fontSize: 16, color: '#ccc' } } };
const filledHeartIcon: IIconProps = { iconName: 'HeartFill', styles: { root: { fontSize: 16, color: '#f4737c' } } };

export const config = [
  {
    label: 'Heart',
    render: (coin: Coin, handleLikeToggle?: (coinId: string) => void, likedCoins?: Record<string, boolean>) => {
      const isLiked = likedCoins ? likedCoins[coin.id] : false;

      return (
        <IconButton
          iconProps={isLiked ? filledHeartIcon : emptyHeartIcon}
          onClick={(event) => {
            event.stopPropagation(); // Prevent row click when heart is clicked
            handleLikeToggle && handleLikeToggle(coin.id); // Only toggle the heart state
          }}
          title="Like"
          ariaLabel="Like"
        />
      );
    },
  },
  {
    label: 'Coin',
    width: '250px', 
    render: (coin: Coin) => (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        {/* Fluent UI Image with fixed size and ImageFit */}
        <Image
          src={coin.image}
          alt={coin.name}
          width={32}   // Fixed width
          height={32}  // Fixed height
          imageFit={ImageFit.contain}
          className={columnStyles.coinImage}
        />

        {/* Coin Name and ID */}
        <Stack className={columnStyles.coinName}>
          <Text variant="medium">
            {coin.id.toUpperCase()}  {/* Coin ID */}
          </Text>
          <Text variant="small">
            {coin.name}  {/* Coin Name */}
          </Text>
        </Stack>
      </Stack>
    ),
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
        styles={columnStyles.priceChangeBox(coin.price_change_percentage_24h > 0)}
      >
        <Text variant="small" className={columnStyles.priceChangeText}>
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
