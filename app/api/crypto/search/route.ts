import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Search for the coin
    const searchResponse = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`CoinGecko search API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    if (searchData.coins && searchData.coins.length > 0) {
      const coin = searchData.coins[0];
      
      // Get detailed coin data
      const detailResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`,
        {
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 60 }, // Cache for 1 minute
        }
      );

      if (detailResponse.ok) {
        const detailData = await detailResponse.json();
        
        const coinInfo = {
          mint: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          imgUrl: coin.large || coin.thumb || '',
          marketCap: 0,
          marketCapUsd: detailData.market_data?.market_cap?.usd || 0,
          createAt: new Date(detailData.genesis_date || Date.now()).getTime(),
          description: detailData.description?.en || '',
          price: detailData.market_data?.current_price?.usd || 0,
          priceChange24h: detailData.market_data?.price_change_percentage_24h || 0,
          volume24h: detailData.market_data?.total_volume?.usd || 0,
          twitterUrl: detailData.links?.twitter_screen_name 
            ? `https://twitter.com/${detailData.links.twitter_screen_name}` 
            : undefined,
          websiteUrl: detailData.links?.homepage?.[0] || undefined,
        };

        return NextResponse.json(coinInfo);
      }
    }

    return NextResponse.json(
      { error: 'Coin not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error searching for coin:', error);
    return NextResponse.json(
      { error: 'Failed to search for coin' },
      { status: 500 }
    );
  }
} 