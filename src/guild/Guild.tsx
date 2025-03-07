import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Guild = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            Guild Hub
          </h1>
          <p className="text-gray-400 mt-2">Start your guild journey</p>
        </motion.div>

        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/guild/create')}
            className="px-6 py-3 bg-gradient-to-r from-teal-400 to-purple-500 text-white rounded-full hover:from-teal-500 hover:to-purple-600 transition-all"
          >
            Create Guild
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/guild/join')}
            className="px-6 py-3 bg-gradient-to-r from-teal-400 to-purple-500 text-white rounded-full hover:from-teal-500 hover:to-purple-600 transition-all"
          >
            Join Guild
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Guild;