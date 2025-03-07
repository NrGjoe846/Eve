
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import DailyRewards from './DailyRewards';
import StoreItems from './StoreItems';
import FloatingCounters from './FloatingCounters';

const GameStore = () => {
  const [gems, setGems] = useState(1300);
  const [gold, setGold] = useState(5000);
  const [loginStreak, setLoginStreak] = useState(3);
  const [maxLoginStreak, setMaxLoginStreak] = useState(10);

  useEffect(() => {
    // Simulate login streak increment
    const timer = setTimeout(() => {
      const newStreak = loginStreak + 1;
      setLoginStreak(newStreak);
      if (newStreak > maxLoginStreak) {
        setMaxLoginStreak(newStreak);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [loginStreak, maxLoginStreak]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Floating particles for background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <FloatingCounters 
        gems={gems} 
        gold={gold} 
        streak={loginStreak} 
        maxStreak={maxLoginStreak} 
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-blue-900/50 text-blue-400 backdrop-blur-sm"
                >
                  <ArrowLeft size={24} />
                </motion.button>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Game Store
                </h1>
              </div>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl mb-12"
            >
              <DailyRewards />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <StoreItems />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameStore;
