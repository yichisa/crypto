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
  
  // Fetch all coins from CoinGecko API
  export const fetchCoins = async (): Promise<Coin[]> => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: Coin[] = await response.json();
    return data;
  };
  
  // Fetch detailed information about a specific coin by its ID
  export const fetchCoinDetails = async (id: string): Promise<CoinDetails> => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch coin details');
    }
    const data: CoinDetails = await response.json();
    return data;
  };
  