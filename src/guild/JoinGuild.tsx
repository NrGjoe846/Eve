import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JoinGuild = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for guild:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/guild')}
          className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all"
        >
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            Join a Guild
          </h1>
          <p className="text-gray-400 mt-2">Find and join your community</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto bg-black/20 p-6 rounded-xl border border-white/10"
        >
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Search for a guild"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-purple-500 text-white rounded-full hover:from-teal-500 hover:to-purple-600 transition-all"
              >
                Search
              </motion.button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
              <span>The Pioneers</span>
              <button className="px-3 py-1 bg-teal-400 text-white rounded-full hover:bg-teal-500">
                Join
              </button>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
              <span>Code Warriors</span>
              <button className="px-3 py-1 bg-teal-400 text-white rounded-full hover:bg-teal-500">
                Join
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinGuild;
