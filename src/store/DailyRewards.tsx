
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Gift } from 'lucide-react';

interface Reward {
  id: string;
  day: number;
  type: 'gems' | 'gold' | 'chest';
  amount: number;
  claimed: boolean;
}

const DailyRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', day: 1, type: 'gems', amount: 100, claimed: false },
    { id: '2', day: 2, type: 'gold', amount: 500, claimed: false },
    { id: '3', day: 3, type: 'gems', amount: 200, claimed: false },
    { id: '4', day: 4, type: 'gold', amount: 1000, claimed: false },
    { id: '5', day: 5, type: 'chest', amount: 1, claimed: false },
    { id: '6', day: 6, type: 'gems', amount: 500, claimed: false },
    { id: '7', day: 7, type: 'chest', amount: 3, claimed: false },
  ]);
  
  const [currentDay, setCurrentDay] = useState(1);
  const [claimAnimation, setClaimAnimation] = useState(false);
  const [activeReward, setActiveReward] = useState<Reward | null>(null);

  useEffect(() => {
    // Simulate progress - in a real app, this would be from user data
    const timer = setTimeout(() => {
      if (currentDay < 7) {
        setCurrentDay(currentDay + 1);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentDay]);

  const handleClaim = (reward: Reward) => {
    if (reward.day > currentDay || reward.claimed) return;
    
    setActiveReward(reward);
    setClaimAnimation(true);
    
    setTimeout(() => {
      setClaimAnimation(false);
      setRewards(rewards.map(r => 
        r.id === reward.id ? { ...r, claimed: true } : r
      ));
      // Here you would update your global state for currency
    }, 1000);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'gems':
        return <div className="text-2xl">💎</div>;
      case 'gold':
        return <div className="text-2xl">🪙</div>;
      case 'chest':
        return <div className="text-2xl">🎁</div>;
      default:
        return <Gift className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animation for claimed reward */}
      <AnimatePresence>
        {claimAnimation && activeReward && (
          <motion.div
            className="absolute z-50 text-2xl"
            initial={{ x: "50%", y: "50%", opacity: 1, scale: 1 }}
            animate={{ x: "90vw", y: "10vh", opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {getRewardIcon(activeReward.type)}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Daily Login Rewards
        </h2>
        <p className="text-blue-200 text-sm mt-2">
          Log in every day to collect amazing rewards!
        </p>
      </div>

      <div className="grid grid-cols-7 gap-4 p-4">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileHover={{ scale: 1.05, rotate: reward.claimed ? 0 : 2 }}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl backdrop-blur-sm border ${
              reward.day <= currentDay && !reward.claimed
                ? "border-blue-400 bg-blue-900/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                : reward.claimed
                ? "border-gray-600 bg-gray-800/30"
                : "border-gray-700 bg-gray-800/20"
            }`}
          >
            <div className="absolute -top-3 -left-3 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-white font-bold">
              {reward.day}
            </div>
            
            <motion.div
              className={`w-16 h-16 flex items-center justify-center rounded-lg mb-2 ${
                reward.day <= currentDay && !reward.claimed
                  ? "bg-gradient-to-br from-blue-400 to-purple-600"
                  : "bg-gray-700"
              }`}
              animate={
                reward.day <= currentDay && !reward.claimed
                  ? { 
                      boxShadow: ["0 0 5px #3b82f6", "0 0 20px #3b82f6", "0 0 5px #3b82f6"],
                      scale: [1, 1.05, 1]
                    }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="text-2xl">{getRewardIcon(reward.type)}</div>
            </motion.div>
            
            <p className="text-lg font-bold text-white mb-1">
              {reward.amount} {reward.type === 'chest' ? 'Chests' : reward.type}
            </p>
            
            {reward.claimed ? (
              <div className="bg-gray-700 text-gray-400 px-4 py-1 rounded-full text-sm">
                Claimed
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1 rounded-full text-sm ${
                  reward.day <= currentDay
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    : "bg-gray-700 text-gray-400"
                }`}
                onClick={() => handleClaim(reward)}
                disabled={reward.day > currentDay}
              >
                Claim
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyRewards;
