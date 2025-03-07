import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const GuildChat = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/20 p-6 rounded-xl border border-white/10"
    >
      <MessageSquare className="w-8 h-8 text-purple-400 mb-4" />
      <h2 className="text-xl font-semibold">Guild Chat</h2>
      <div className="text-gray-400 mt-2 h-24 overflow-y-auto">
        <p>[User1]: Great job team!</p>
        <p>[User2]: Next event is tomorrow!</p>
      </div>
      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full hover:from-teal-500 hover:to-purple-600 transition-all">
        Open Chat
      </button>
    </motion.div>
  );
};

export default GuildChat;