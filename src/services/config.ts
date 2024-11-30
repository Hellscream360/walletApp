export const API_CONFIG = {
  COINGECKO_API_URL: 'https://api.coingecko.com/api/v3',
  ALPHA_VANTAGE_API_URL: 'https://www.alphavantage.co/query',
  ALPHA_VANTAGE_API_KEY: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || '',
}

export const CACHE_CONFIG = {
  SEARCH_CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  PRICE_UPDATE_INTERVAL: 15 * 1000, // 15 seconds
}

export const API_ENDPOINTS = {
  COINGECKO: {
    SEARCH: '/search',
    CRYPTO_PRICES: '/simple/price',
  },
  ALPHA_VANTAGE: {
    SEARCH: 'SYMBOL_SEARCH',
    QUOTE: 'GLOBAL_QUOTE',
  },
}
