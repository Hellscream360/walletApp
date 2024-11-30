import axios from '../lib/axios';
import { API_CONFIG, API_ENDPOINTS, CACHE_CONFIG } from './config';
import type { Asset, AssetPrice, AssetType } from '../types/asset';

interface SearchCache {
  results: Asset[];
  timestamp: number;
}

class AssetService {
  private searchCache: Map<string, SearchCache> = new Map();

  private isSearchCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_CONFIG.SEARCH_CACHE_DURATION;
  }

  private async searchCryptos(query: string): Promise<Asset[]> {
    try {
      const response = await axios.get(`${API_CONFIG.COINGECKO_API_URL}${API_ENDPOINTS.COINGECKO.SEARCH}`, {
        params: { query }
      });

      return response.data.coins.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        type: 'crypto' as AssetType,
        price: 0, // Prix à mettre à jour séparément
        imageUrl: coin.large,
        provider: 'coingecko'
      }));
    } catch (error) {
      console.error('Error searching cryptos:', error);
      return [];
    }
  }

  private async searchStocks(query: string): Promise<Asset[]> {
    if (!API_CONFIG.ALPHA_VANTAGE_API_KEY) {
      console.warn('Alpha Vantage API key not configured');
      return [];
    }

    try {
      const response = await axios.get(API_CONFIG.ALPHA_VANTAGE_API_URL, {
        params: {
          function: API_ENDPOINTS.ALPHA_VANTAGE.SEARCH,
          keywords: query,
          apikey: API_CONFIG.ALPHA_VANTAGE_API_KEY
        }
      });

      return response.data.bestMatches?.map((match: any) => ({
        id: match['1. symbol'],
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: 'stock' as AssetType,
        price: 0, // Prix à mettre à jour séparément
        provider: 'alphavantage'
      })) || [];
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }

  async searchAssets(query: string): Promise<Asset[]> {
    // Vérifier le cache
    const cached = this.searchCache.get(query);
    if (cached && this.isSearchCacheValid(cached.timestamp)) {
      return cached.results;
    }

    // Rechercher en parallèle dans toutes les APIs
    const [cryptos, stocks] = await Promise.all([
      this.searchCryptos(query),
      this.searchStocks(query)
    ]);

    const results = [...cryptos, ...stocks];
    
    // Mettre en cache les résultats
    this.searchCache.set(query, {
      results,
      timestamp: Date.now()
    });

    return results;
  }

  async getAssetPrice(asset: Asset): Promise<AssetPrice | null> {
    try {
      if (asset.provider === 'coingecko') {
        const response = await axios.get(`${API_CONFIG.COINGECKO_API_URL}${API_ENDPOINTS.COINGECKO.CRYPTO_PRICES}`, {
          params: {
            ids: asset.id,
            vs_currencies: 'usd',
            include_24hr_change: true
          }
        });

        const data = response.data[asset.id];
        return {
          current: data.usd,
          change24h: data.usd_24h_change,
          lastUpdated: new Date()
        };
      }

      if (asset.provider === 'alphavantage') {
        const response = await axios.get(API_CONFIG.ALPHA_VANTAGE_API_URL, {
          params: {
            function: API_ENDPOINTS.ALPHA_VANTAGE.QUOTE,
            symbol: asset.symbol,
            apikey: API_CONFIG.ALPHA_VANTAGE_API_KEY
          }
        });

        const quote = response.data['Global Quote'];
        return {
          current: parseFloat(quote['05. price']),
          change24h: parseFloat(quote['10. change percent'].replace('%', '')),
          lastUpdated: new Date()
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching asset price:', error);
      return null;
    }
  }
}

export const assetService = new AssetService();
