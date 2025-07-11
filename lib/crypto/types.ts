export interface CoinInfo {
  mint: string;
  name: string;
  symbol: string;
  imgUrl: string;
  marketCap: number; // In SOL from Raydium/PumpFun API
  marketCapUsd?: number; // Calculated value
  createAt: number; // Timestamp
  description?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
}

export interface SolanaPrice {
  usd: number;
  timestamp: number;
}

export interface CryptoApiResponse {
  success: boolean;
  data: {
    rows: CoinInfo[];
  };
}

export interface CoinMarketCapCoin {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
      volume_24h: number;
    };
  };
}

export interface CoinMarketCapResponse {
  data: CoinMarketCapCoin[];
  status: {
    timestamp: string;
    error_code: number;
    error_message?: string;
  };
}

export interface CryptoStats {
  totalMarketCap: number;
  total24hVolume: number;
  bitcoinDominance: number;
  activeCryptocurrencies: number;
} 