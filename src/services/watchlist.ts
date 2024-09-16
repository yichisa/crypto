import axios from 'axios';
import { getAuthHeaders } from './auth';

export const getWatchlist = async () => {
  const response = await axios.get('/api/watchlist/', {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const addToWatchlist = async (coinId: string) => {
  await axios.post(
    '/api/watchlist/',
    { coin_id: coinId },
    {
      headers: getAuthHeaders(),
    }
  );
};

export const removeFromWatchlist = async (coinId: string) => {
  await axios.delete(`/api/watchlist/${coinId}`, {
    headers: getAuthHeaders(),
  });
};
