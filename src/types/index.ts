export interface User {
  id: string;
  email: string;
}

export interface WalletCategory {
  name: string;
  percentage: number;
  color: string;
}

export interface Wallet {
  id: string;
  name: string;
  userId: string;
  categories: WalletCategory[];
  createdAt: string;
  updatedAt: string;
}