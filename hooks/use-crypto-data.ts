import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CoinInfo, SolanaPrice, CryptoStats } from '@/lib/crypto/types';
import { fetchSolanaPrice, fetchRecentCoins, fetchCryptoStats, searchCoin } from '@/lib/crypto/api';

// SWR fetchers
const solPriceFetcher = async (): Promise<SolanaPrice | null> => {
  return await fetchSolanaPrice();
};

const recentCoinsFetcher = async (): Promise<CoinInfo[] | null> => {
  return await fetchRecentCoins();
};

const cryptoStatsFetcher = async (): Promise<CryptoStats | null> => {
  return await fetchCryptoStats();
};

export function useCryptoData() {
  // SWR for automatic caching and revalidation
  const { data: solPrice, error: solPriceError, isLoading: solPriceLoading } = useSWR(
    'solana-price',
    solPriceFetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  const { data: recentCoins, error: recentCoinsError, isLoading: recentCoinsLoading } = useSWR(
    'recent-coins',
    recentCoinsFetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  const { data: cryptoStats, error: cryptoStatsError, isLoading: cryptoStatsLoading } = useSWR(
    'crypto-stats',
    cryptoStatsFetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true,
    }
  );

  return {
    solPrice,
    recentCoins,
    cryptoStats,
    isLoading: solPriceLoading || recentCoinsLoading || cryptoStatsLoading,
    error: solPriceError || recentCoinsError || cryptoStatsError,
  };
}

export function useCoinSearch() {
  const [searchResults, setSearchResults] = useState<CoinInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchForCoin = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await searchCoin(query);
      setSearchResults(result);
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchError(null);
  };

  return {
    searchResults,
    isSearching,
    searchError,
    searchForCoin,
    clearSearch,
  };
}

export function useRealTimePrices(symbols: string[] = ['bitcoin', 'ethereum', 'solana']) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const symbolsQuery = symbols.join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbolsQuery}&vs_currencies=usd`
        );
        
        if (response.ok) {
          const data = await response.json();
          const priceMap: Record<string, number> = {};
          
          Object.keys(data).forEach(symbol => {
            priceMap[symbol] = data[symbol].usd;
          });
          
          setPrices(priceMap);
        }
      } catch (error) {
        console.error('Error fetching real-time prices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
    
    // Set up interval for real-time updates
    const interval = setInterval(fetchPrices, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [symbols]);

  return { prices, isLoading };
} 