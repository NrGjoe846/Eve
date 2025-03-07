
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, Coins, X } from 'lucide-react';

interface CountersProps {
  gems: number;
  gold: number;
  streak: number;
  maxStreak: number;
}

const FloatingCounters = ({ gems, gold, streak, maxStreak }: CountersProps) => {
  const [showGemStats, setShowGemStats] = useState(false);
  const [showStreakStats, setShowStreakStats] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {/* Gems Counter */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-900/80 backdrop-blur-md border border-blue-500/50 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          onClick={() => setShowGemStats(!showGemStats)}
        >
          <Diamond className="h-5 w-5 text-cyan-300" />
          <span className="font-bold">{gems.toLocaleString()}</span>

          <div className="mx-1 h-4 w-px bg-blue-500/30" />

          <Coins className="h-5 w-5 text-yellow-300" />
          <span className="font-bold text-yellow-300">{gold.toLocaleString()}</span>
        </motion.button>

        <AnimatePresence>
          {showGemStats && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-64 p-4 rounded-xl bg-gray-900/95 backdrop-blur-md border border-blue-500/30 shadow-xl"
            >
              <button
                onClick={() => setShowGemStats(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <h3 className="text-lg font-bold text-white mb-2">Currency Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Gems:</span>
                  <span className="text-cyan-300 font-bold">{gems.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Gold:</span>
                  <span className="text-yellow-300 font-bold">{gold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gems Purchased:</span>
                  <span className="text-cyan-300 font-bold">13,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gems Earned:</span>
                  <span className="text-cyan-300 font-bold">8,700</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-500">Last transaction: 24m ago</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Login Streak Counter */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-900/80 backdrop-blur-md border border-purple-500/50 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          onClick={() => setShowStreakStats(!showStreakStats)}
          animate={{
            boxShadow: streak > 0 ? 
              ['0 0 5px rgba(124,58,237,0.3)', '0 0 15px rgba(124,58,237,0.5)', '0 0 5px rgba(124,58,237,0.3)'] : 
              ['0 0 5px rgba(124,58,237,0.3)']
          }}
          transition={{ repeat: streak > 0 ? Infinity : 0, duration: 2 }}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold">
            {streak}
          </div>
          <span>Day Streak</span>
        </motion.button>

        <AnimatePresence>
          {showStreakStats && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-64 p-4 rounded-xl bg-gray-900/95 backdrop-blur-md border border-purple-500/30 shadow-xl"
            >
              <button
                onClick={() => setShowStreakStats(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <h3 className="text-lg font-bold text-white mb-2">Login Streak</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Streak:</span>
                  <span className="text-purple-400 font-bold">{streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Longest Streak:</span>
                  <span className="text-purple-400 font-bold">{maxStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Next Reward:</span>
                  <span className="text-green-400 font-bold">200 Gems</span>
                </div>
                
                <div className="pt-2 mt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Streak Progress:</div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${(streak / 7) * 100}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(streak / 7) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Day 1</span>
                    <span>Day 7</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingCounters;
