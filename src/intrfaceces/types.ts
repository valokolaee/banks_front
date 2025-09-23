// src/types.ts

export interface IPool {
  id: number;
  name: string;
  logo: string;
  level: string;
  desc?: string;
  reward?: string;
  status?: string;
  capital_invested?: number;
  owner?: {
    username: string;
  };
  updatedAt?: string;
}

export interface IService {
  id: number;
  key: string;
  value: string;
  poolId: number;
  createdAt?: string;
  updatedAt?: string;
}

// src/types.ts
export interface IBank {
  id: number;
  name: string;
  profit: string;
  logo?: string;
  level: 'basic' | 'standard' | 'premium';
  desc?: string;
  has_loan: boolean;
  services?: {
    key: string;
    value: string;
  }[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  logo_url?: string;
  profile_image?: string;
  csv_url?: string;
  clientType?: 'individual' | 'financial_entities' | 'business';
  createdAt?: string;
  updatedAt?: string;
}