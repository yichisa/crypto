import { getCachedData, setCachedData } from "../utils/caching";

export interface Coin {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    image: string;
    price_change_percentage_24h: number;
    movementData?: number[]; 
    isLoading?: boolean;

  }
  
  export interface CoinDetails {
    id: string;
    name: string;
    symbol: string;
    description: {
      en: string;
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

// Sequentially fetch movement data for all coins
export const fetchMovementDataSequentially = async (coins: Coin[], setData: React.Dispatch<React.SetStateAction<Coin[]>>) => {
  for (const coin of coins) {
    try {
      // Fetch movement data for each coin
      const movementData = await fetchCoinMovementData(coin.id);

      // Update the state with the fetched data
      setData((prevData) =>
        prevData.map((c) =>
          c.id === coin.id ? { ...c, movementData, isLoading: false } : c
        )
      );
    } catch (error) {
      console.error(`Error fetching movement data for ${coin.id}:`, error);
    }
  }
};

export const fetchCoinById = async (coinId: string): Promise<CoinDetails | null> => {
  // Check if the coin data is cached
  const cacheKey = coinId + '_details';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  // Fetch coin details from CoinGecko API
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch details for coin with id: ${coinId}`);
  }

  const data: CoinDetails = await response.json();

  // Cache the fetched data
  setCachedData(cacheKey, data);

  return data;
};

// Fetch newest coins based on market cap (ascending order)
export const fetchRecentlyAddedCoins = async (): Promise<Coin[]> => {
  const cacheKey = 'recent';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=10&page=1&sparkline=false'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coins');
  }

  const data: Coin[] = await response.json();

  // assuming they are the 'newest'
  const newestCoins = data.slice(0, 3);
  setCachedData(cacheKey, newestCoins);
  return newestCoins;
};
