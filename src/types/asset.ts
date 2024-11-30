export type AssetType = 'crypto' | 'stock' | 'etf' | 'forex';

export type AssetProvider = 'coingecko' | 'alphavantage';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  change24h?: number;
  imageUrl?: string;
  provider: AssetProvider;
}

export interface AssetPrice {
  current: number;
  change24h: number;
  lastUpdated: Date;
}

// Types spécifiques pour le wallet
export interface WalletAsset extends Asset {
  quantity: number;
  value: number;  // price * quantity
  allocation: number;  // pourcentage dans le wallet
}
