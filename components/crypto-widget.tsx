"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Search, RefreshCw, DollarSign, BarChart3, Activity, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCryptoData, useCoinSearch, useRealTimePrices } from "@/hooks/use-crypto-data";
import { CoinInfo } from "@/lib/crypto/types";

interface CryptoWidgetProps {
  compact?: boolean;
}

export function CryptoWidget({ compact = false }: CryptoWidgetProps) {
  const { solPrice, recentCoins, cryptoStats, isLoading, error } = useCryptoData();
  const { prices: majorPrices } = useRealTimePrices(["bitcoin", "ethereum", "solana"]);
  const { searchResults, isSearching, searchForCoin, clearSearch } = useCoinSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(6)}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(2)}K`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchForCoin(searchQuery.trim());
    }
  };

  const CoinCard = ({ coin }: { coin: CoinInfo }) => (
    <div className="glass-card p-4 rounded-xl border border-[rgba(216,231,242,0.08)] hover:bg-[rgba(216,231,242,0.02)] transition-all">
      <div className="flex items-center gap-3 mb-2">
        {coin.imgUrl && (
          <img
            src={coin.imgUrl}
            alt={coin.symbol}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm">{coin.symbol}</span>
            {coin.priceChange24h !== undefined && (
              <span className={`text-xs flex items-center gap-1 ${coin.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.priceChange24h >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {Math.abs(coin.priceChange24h).toFixed(2)}%
              </span>
            )}
          </div>
          <p className="text-[rgba(216,231,242,0.6)] text-xs">{coin.name}</p>
        </div>
      </div>

      <div className="space-y-1">
        {coin.price && (
          <div className="flex justify-between">
            <span className="text-[rgba(216,231,242,0.7)] text-xs">Price:</span>
            <span className="text-white text-xs font-mono">{formatPrice(coin.price)}</span>
          </div>
        )}
        {coin.marketCapUsd && (
          <div className="flex justify-between">
            <span className="text-[rgba(216,231,242,0.7)] text-xs">Market Cap:</span>
            <span className="text-white text-xs font-mono">{formatMarketCap(coin.marketCapUsd)}</span>
          </div>
        )}
      </div>

      {(coin.twitterUrl || coin.websiteUrl) && (
        <div className="flex gap-2 mt-2">
          {coin.twitterUrl && (
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-1 h-auto" onClick={() => window.open(coin.twitterUrl, "_blank")}>
              <Activity className="size-3" />
            </Button>
          )}
          {coin.websiteUrl && (
            <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 p-1 h-auto" onClick={() => window.open(coin.websiteUrl, "_blank")}>
              <Globe className="size-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );

  if (compact) {
    return (
      <Card className="glass-card p-4 rounded-2xl border border-[rgba(216,231,242,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Crypto Prices</h3>
          <Button variant="ghost" size="sm" className="text-[rgba(216,231,242,0.7)] hover:text-white p-1">
            <RefreshCw className="size-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center text-[rgba(216,231,242,0.6)] text-sm">Loading...</div>
          ) : (
            <>
              {solPrice && (
                <div className="flex justify-between items-center">
                  <span className="text-[rgba(216,231,242,0.7)] text-sm">SOL</span>
                  <span className="text-white font-mono">{formatPrice(solPrice.usd)}</span>
                </div>
              )}
              {Object.entries(majorPrices)
                .slice(0, 3)
                .map(([symbol, price]) => (
                  <div key={symbol} className="flex justify-between items-center">
                    <span className="text-[rgba(216,231,242,0.7)] text-sm capitalize">{symbol.slice(0, 3).toUpperCase()}</span>
                    <span className="text-white font-mono">{formatPrice(price)}</span>
                  </div>
                ))}
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="glass-card p-4 rounded-2xl border border-[rgba(216,231,242,0.08)]">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input type="text" placeholder="Search coins... (e.g., Bitcoin, SOL, FARTCOIN)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-[rgba(216,231,242,0.05)] border-[rgba(216,231,242,0.1)] text-white placeholder:text-[rgba(216,231,242,0.5)]" />
          <Button type="submit" variant="ghost" className="text-white hover:bg-[rgba(216,231,242,0.1)]" disabled={isSearching}>
            {isSearching ? <RefreshCw className="size-4 animate-spin" /> : <Search className="size-4" />}
          </Button>
        </form>

        {searchResults && (
          <div className="mt-4">
            <h4 className="text-white font-medium mb-2">Search Result:</h4>
            <CoinCard coin={searchResults} />
          </div>
        )}
      </Card>

      {/* Market Stats */}
      {cryptoStats && (
        <Card className="glass-card p-4 rounded-2xl border border-[rgba(216,231,242,0.08)]">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="size-4" />
            Market Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[rgba(216,231,242,0.7)] text-xs mb-1">Total Market Cap</div>
              <div className="text-white font-mono text-sm">{formatMarketCap(cryptoStats.totalMarketCap)}</div>
            </div>
            <div>
              <div className="text-[rgba(216,231,242,0.7)] text-xs mb-1">24h Volume</div>
              <div className="text-white font-mono text-sm">{formatMarketCap(cryptoStats.total24hVolume)}</div>
            </div>
            <div>
              <div className="text-[rgba(216,231,242,0.7)] text-xs mb-1">BTC Dominance</div>
              <div className="text-white font-mono text-sm">{cryptoStats.bitcoinDominance.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-[rgba(216,231,242,0.7)] text-xs mb-1">Active Coins</div>
              <div className="text-white font-mono text-sm">{cryptoStats.activeCryptocurrencies.toLocaleString()}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Major Cryptocurrencies */}
      <Card className="glass-card p-4 rounded-2xl border border-[rgba(216,231,242,0.08)]">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="size-4" />
          Major Cryptocurrencies
        </h3>
        <div className="space-y-2">
          {solPrice && (
            <div className="flex justify-between items-center p-2 rounded-lg bg-[rgba(216,231,242,0.02)]">
              <span className="text-white font-medium">Solana (SOL)</span>
              <span className="text-white font-mono">{formatPrice(solPrice.usd)}</span>
            </div>
          )}
          {Object.entries(majorPrices).map(([symbol, price]) => (
            <div key={symbol} className="flex justify-between items-center p-2 rounded-lg bg-[rgba(216,231,242,0.02)]">
              <span className="text-white font-medium capitalize">{symbol}</span>
              <span className="text-white font-mono">{formatPrice(price)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent PumpFun/Raydium Coins */}
      {recentCoins && recentCoins.length > 0 && (
        <Card className="glass-card p-4 rounded-2xl border border-[rgba(216,231,242,0.08)]">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Activity className="size-4" />
            Recent Launches ({recentCoins.length})
          </h3>
          <div className="grid gap-3">
            {recentCoins.slice(0, 6).map((coin, index) => (
              <CoinCard key={coin.mint || index} coin={coin} />
            ))}
          </div>
          {recentCoins.length > 6 && (
            <div className="mt-3 text-center">
              <span className="text-[rgba(216,231,242,0.6)] text-xs">+{recentCoins.length - 6} more coins available</span>
            </div>
          )}
        </Card>
      )}

      {error && (
        <Card className="glass-card p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
          <div className="text-red-400 text-sm">Error loading crypto data. Please try again later.</div>
        </Card>
      )}
    </div>
  );
}
