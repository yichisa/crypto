
// Get cached data from localStorage
export const getCachedData = (cacheKey: string) => {
  const cache = localStorage.getItem(cacheKey);
  if (!cache) return null;

  const parsedCache = JSON.parse(cache);
  return parsedCache[cacheKey] || null; // Return cached data if available, otherwise null
};

// Set data in localStorage
export const setCachedData = (cacheKey: string, data: any) => {
  const cache = localStorage.getItem(cacheKey) || '{}';
  const parsedCache = JSON.parse(cache);

  parsedCache[cacheKey] = data; // Cache data indefinitely

  localStorage.setItem(cacheKey, JSON.stringify(parsedCache));
};

// Clear cached data for a specific coin
export const clearCachedData = (cacheKey: string) => {
  const cache = localStorage.getItem(cacheKey);
  if (!cache) return;

  const parsedCache = JSON.parse(cache);
  delete parsedCache[cacheKey];

  localStorage.setItem(cacheKey, JSON.stringify(parsedCache));
};
