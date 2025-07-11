import { CoinInfo, SolanaPrice, CryptoApiResponse, CryptoStats } from './types';

// Cache for storing fetched data
let cachedRecentCoins: CoinInfo[] = [];
let cachedSolPriceUsd: SolanaPrice | null = null;
let cachedCryptoStats: CryptoStats | null = null;

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Fetch current Solana price from our API
 */
export async function fetchSolanaPrice(): Promise<SolanaPrice | null> {
  // Check cache first
  if (cachedSolPriceUsd && (Date.now() - cachedSolPriceUsd.timestamp) < CACHE_DURATION) {
    return cachedSolPriceUsd;
  }

  try {
    console.log("[Crypto API] Fetching SOL price from API...");
    const response = await fetch("/api/crypto/solana-price");
    
    if (!response.ok) {
      console.error(`[Crypto API] Error fetching SOL price: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.usd) {
      cachedSolPriceUsd = {
        usd: data.usd,
        timestamp: data.timestamp || Date.now()
      };
      console.log(`[Crypto API] SOL Price: $${cachedSolPriceUsd.usd}`);
      return cachedSolPriceUsd;
    }
    
    console.warn("[Crypto API] SOL price not found in API response.");
    return null;
  } catch (error) {
    console.error("[Crypto API] Error in fetchSolanaPrice:", error);
    return null;
  }
}

/**
 * Fetch recent coins from our API
 */
export async function fetchRecentCoins(): Promise<CoinInfo[] | null> {
  try {
    console.log("[Crypto API] Fetching recent coins from API...");
    const response = await fetch("/api/crypto/recent-coins");

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Crypto API] Error fetching recent coins: ${response.status}`, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      console.log(`[Crypto API] Successfully fetched ${data.data.length} recent coins.`);
      
      cachedRecentCoins = data.data;
      return data.data;
    } else {
      console.warn("[Crypto API] API call successful but data format unexpected or success=false.", data);
      return null; 
    }
  } catch (error) {
    console.error("[Crypto API] Error in fetchRecentCoins:", error);
    return null;
  }
}

/**
 * Fetch cryptocurrency market stats from CoinGecko
 */
export async function fetchCryptoStats(): Promise<CryptoStats | null> {
  // Check cache first
  if (cachedCryptoStats) {
    return cachedCryptoStats;
  }

  const globalStatsUrl = "https://api.coingecko.com/api/v3/global";
  
  try {
    console.log("[Crypto API] Fetching global crypto stats...");
    const response = await fetch(globalStatsUrl);
    
    if (!response.ok) {
      console.error(`[Crypto API] Error fetching crypto stats: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.data) {
      const stats: CryptoStats = {
        totalMarketCap: data.data.total_market_cap?.usd || 0,
        total24hVolume: data.data.total_volume?.usd || 0,
        bitcoinDominance: data.data.market_cap_percentage?.btc || 0,
        activeCryptocurrencies: data.data.active_cryptocurrencies || 0,
      };
      
      cachedCryptoStats = stats;
      return stats;
    }
    
    return null;
  } catch (error) {
    console.error("[Crypto API] Error in fetchCryptoStats:", error);
    return null;
  }
}

/**
 * Search for a specific coin by symbol or name
 */
export async function searchCoin(query: string): Promise<CoinInfo | null> {
  // First check in cached recent coins
  const recentCoin = cachedRecentCoins.find(
    coin => coin.symbol.toLowerCase() === query.toLowerCase() || 
            coin.name.toLowerCase().includes(query.toLowerCase())
  );
  
  if (recentCoin) {
    return recentCoin;
  }

  // If not found in recent coins, try our search API
  try {
    const response = await fetch(`/api/crypto/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      return null;
    }
    
    const coinData = await response.json();
    return coinData;
  } catch (error) {
    console.error("[Crypto API] Error searching for coin:", error);
    return null;
  }
}

/**
 * Get cached data
 */
export function getCachedData() {
  return {
    recentCoins: cachedRecentCoins,
    solPrice: cachedSolPriceUsd,
    cryptoStats: cachedCryptoStats,
  };
}

/**
 * Clear cache (useful for force refresh)
 */
export function clearCache() {
  cachedRecentCoins = [];
  cachedSolPriceUsd = null;
  cachedCryptoStats = null;
} 