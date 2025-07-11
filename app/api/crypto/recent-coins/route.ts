import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://launch-mint-v1.raydium.io/get/list?platformId=FfYek5vEz23cMkWsdJwG2oa6EphsvXSHrGpdALN4g6W1&sort=new&size=20&mintType=default&includeNsfw=false',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Raydium API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data?.rows) {
      // Get SOL price for USD conversion
      const solPriceResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
        {
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 30 },
        }
      );

      let solPrice = 0;
      if (solPriceResponse.ok) {
        const solData = await solPriceResponse.json();
        solPrice = solData.solana?.usd || 0;
      }

      // Process coins and add USD market cap
      const processedCoins = data.data.rows.map((coin: any) => {
        let marketCapUsd: number | undefined = undefined;
        if (solPrice && coin.marketCap) {
          marketCapUsd = coin.marketCap * solPrice;
        }
        
        return {
          ...coin,
          marketCapUsd,
          twitterUrl: coin.twitter || undefined,
          websiteUrl: coin.website || undefined,
        };
      });

      return NextResponse.json({
        success: true,
        data: processedCoins,
        solPrice,
      });
    }

    return NextResponse.json(
      { error: 'Invalid data format from Raydium API' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching recent coins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent coins' },
      { status: 500 }
    );
  }
} 