import { motion } from "framer-motion";
import { Bitcoin, TrendingUp, Shield } from "lucide-react";

export const Greeting = () => {
  return (
    <div key="overview" className="max-w-4xl mx-auto md:mt-12 px-8 size-full flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Mesh AI Crypto Specialist</h1>
          <p className="text-sm text-[rgba(216,231,242,0.7)]">Your dedicated cryptocurrency and blockchain expert</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.5 }} className="text-xl text-[rgba(216,231,242,0.8)] mb-8">
        Welcome to your crypto-focused AI assistant. Ask me anything about cryptocurrency, blockchain, DeFi, NFTs, and trading strategies!
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.7 }} className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border-[rgba(216,231,242,0.1)]">
          <Bitcoin className="w-5 h-5 text-orange-400" />
          <div>
            <h3 className="font-medium text-sm text-white">Crypto Expert</h3>
            <p className="text-xs text-[rgba(216,231,242,0.7)]">Bitcoin, Ethereum, altcoins & more</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border-[rgba(216,231,242,0.1)]">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <div>
            <h3 className="font-medium text-sm text-white">Market Analysis</h3>
            <p className="text-xs text-[rgba(216,231,242,0.7)]">Trading strategies & technical analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border-[rgba(216,231,242,0.1)]">
          <Shield className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-medium text-sm text-white">DeFi & Security</h3>
            <p className="text-xs text-[rgba(216,231,242,0.7)]">Protocols, wallets & best practices</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
