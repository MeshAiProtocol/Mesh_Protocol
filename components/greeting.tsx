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
        <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
          <Zap className="w-7 h-7 text-white dark:text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Mesh AI Protocol
          </h1>
          <p className="text-sm text-muted-foreground">
            Next-generation AI communication framework
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-muted-foreground mb-8"
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
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
          <Brain className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="font-medium text-sm">AI-Powered</h3>
            <p className="text-xs text-muted-foreground">Advanced reasoning and context</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
          <Workflow className="w-5 h-5 text-purple-500" />
          <div>
            <h3 className="font-medium text-sm">Integrated Tools</h3>
            <p className="text-xs text-muted-foreground">API testing, workflows, data</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
          <Zap className="w-5 h-5 text-orange-500" />
          <div>
            <h3 className="font-medium text-sm">Real-time</h3>
            <p className="text-xs text-muted-foreground">Live collaboration and execution</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
