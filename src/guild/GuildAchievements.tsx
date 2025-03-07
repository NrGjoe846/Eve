import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const GuildAchievements = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/20 p-6 rounded-xl border border-white/10"
    >
      <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
      <h2 className="text-xl font-semibold">Guild Achievements</h2>
      <ul className="text-gray-400 mt-2 space-y-2">
        <li>🏆 Top Rank #1 - Q1 2025</li>
        <li>🏆 Community Spirit Award</li>
      </ul>
    </motion.div>
  );
};

export default GuildAchievements;