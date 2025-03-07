import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const GuildInfo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/20 p-6 rounded-xl border border-white/10"
    >
      <Users className="w-8 h-8 text-teal-400 mb-4" />
      <h2 className="text-xl font-semibold">Your Guild</h2>
      <p className="text-gray-400 mt-2">Guild Name: The Pioneers</p>
      <p className="text-gray-400">Members: 42</p>
      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full hover:from-teal-500 hover:to-purple-600 transition-all">
        Manage Guild
      </button>
    </motion.div>
  );
};

export default GuildInfo;