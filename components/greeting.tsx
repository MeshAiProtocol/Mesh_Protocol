import { motion } from 'framer-motion';
import { Zap, Brain, Workflow } from 'lucide-react';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-4xl mx-auto md:mt-12 px-8 size-full flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
 
        <div>
          <h1 className="text-3xl font-bold text-white">
            Mesh AI Protocol
          </h1>
          <p className="text-sm text-[rgba(216,231,242,0.7)]">
            Next-generation AI communication framework
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-[rgba(216,231,242,0.8)] mb-8"
      >
        Welcome to your intelligent workspace. Let&apos;s build something amazing together.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border-[rgba(216,231,242,0.1)]">
          <Brain className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-medium text-sm text-white">AI-Powered</h3>
            <p className="text-xs text-[rgba(216,231,242,0.7)]">Advanced reasoning and context</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border-[rgba(216,231,242,0.1)]">
          <Workflow className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-medium text-sm text-white">Integrated Tools</h3>
            <p className="text-xs text-[rgba(216,231,242,0.7)]">API testing, workflows, data</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border-[rgba(216,231,242,0.1)]">
          <Zap className="w-5 h-5 text-orange-400" />
          <div>
            <h3 className="font-medium text-sm text-white">Real-time</h3>
            <p className="text-xs text-[rgba(216,231,242,0.7)]">Live collaboration and execution</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
