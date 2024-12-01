export interface User {
  id: string;
  email?: string;
}

export interface SubCategory {
  name: string;
  percentage: number;
  color: string;
}

export interface WalletCategory {
  name: string;
  percentage: number;
  color: string;
  subCategories?: SubCategory[];
}

export interface Wallet {
  id: string;
  name: string;
  user_id: string;
  categories: WalletCategory[];
  created_at: string;
  updated_at: string;
}