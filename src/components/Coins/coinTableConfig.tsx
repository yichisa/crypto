import { Coin } from '../../services/api';
import LineChart from './LineChart';
import { formatLargeNumber } from '../../utils/formatters';

export const config = [
  {
    label: 'Coin',
    render: (coin: Coin) => <img src={coin.image} alt={coin.name} className="w-8 h-8" />,
    sortValue: undefined,
  },
  {
    label: 'Name',
    render: (coin: Coin) => (
      <div className="w-24 truncate">
        <span className="block font-semibold text-white">{coin.id.toUpperCase()}</span>
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
      <span className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
        {formatLargeNumber(coin.price_change_percentage_24h)}%
      </span>
    ),
    sortValue: (coin: Coin) => coin.price_change_percentage_24h,
  },
  {
    label: 'Movement',
    render: (coin: Coin) => {
      return coin.isLoading ? (
        <div>Loading...</div>  // Show "Loading..." while movement data is being fetched
      ) : coin.movementData && coin.movementData.length > 0 ? (
        <LineChart dataPoints={coin.movementData} />  // Show the chart once data is available
      ) : (
        <div>No data</div>  // Handle case where there is no movement data
      );
    },
  },  
];

// The key function to identify each row uniquely
export const keyFn = (coin: Coin) => coin.id;
