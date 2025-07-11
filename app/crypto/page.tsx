import { CryptoWidget } from "@/components/crypto-widget";

export default function CryptoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Crypto Tracker</h1>
            <p className="text-[rgba(216,231,242,0.7)] text-lg">Real-time cryptocurrency prices and market data</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <CryptoWidget />
        </div>
      </div>
    </div>
  );
}
