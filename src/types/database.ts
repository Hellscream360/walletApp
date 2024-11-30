export interface WalletAssetDB {
  id: string;
  wallet_id: string;
  asset_id: string;
  asset_symbol: string;
  asset_name: string;
  asset_type: 'crypto' | 'stock' | 'etf' | 'forex';
  asset_provider: 'coingecko' | 'alphavantage';
  quantity: number;
  purchase_price: number;
  current_price: number;
  value: number;
  last_updated: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      wallets: {
        Row: {
          id: string;
          name: string;
          user_id: string;
          description: string | null;
          total_value: number;
          currency: string;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          user_id: string;
          description?: string | null;
          total_value?: number;
          currency?: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          user_id?: string;
          description?: string | null;
          total_value?: number;
          currency?: string;
          is_public?: boolean;
          updated_at?: string;
        };
      };
      wallet_assets: {
        Row: WalletAssetDB;
        Insert: Omit<WalletAssetDB, 'id' | 'created_at' | 'value'>;
        Update: Partial<Omit<WalletAssetDB, 'id' | 'created_at' | 'value'>>;
      };
    };
  };
}
