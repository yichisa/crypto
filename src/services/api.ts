import { getCachedData, setCachedData } from "../utils/caching";

export interface Coin {
    id: string;
    name: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    image: string;
    price_change_percentage_24h: number;
    movementData?: number[]; // Optional flag to track loading state
    isLoading?: boolean; // Optional movement data
  }
  
  export interface CoinDetails {
    id: string;
    name: string;
    symbol: string;
    description: {
      en: string; // English description
    };
    market_data: {
      current_price: {
        usd: number;
      };
      market_cap: {
        usd: number;
      };
    };
  }
  
  // Fetch top 20 coins from CoinGecko API (no movement data)
export const fetchCoins = async (): Promise<Coin[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch coins');
  }

  const data: Coin[] = await response.json();
  return data;
};

export const fetchCoinMovementData = async (coinId: string): Promise<number[]> => {
  // Check if the movement data is cached
  const movementDataCacheKey = coinId + '_movement'
  const cachedData = getCachedData(movementDataCacheKey);
  console.log('fetching movement data')
  if (cachedData) {
    return cachedData; // Use cached data if available
  }

  // Delay the request by a specified time (e.g., 2 minutes = 120000 ms)
  await new Promise((resolve) => setTimeout(resolve, 120000));

  // Proceed to fetch the data after the delay
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movement data for ${coinId}`);
  }

  const data = await response.json();

  // Cache the fetched data
  setCachedData(movementDataCacheKey, data.prices);

  return data.prices.map((price: [number, number]) => price[1]); // Extract the price points
};
