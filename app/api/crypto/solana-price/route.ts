import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.solana && data.solana.usd) {
      return NextResponse.json({
        usd: data.solana.usd,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      { error: 'SOL price not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SOL price' },
      { status: 500 }
    );
  }
} 