import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateGuild = () => {
  const [level, setLevel] = useState('');
  const [guildType, setGuildType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guild Creation:', { level, guildType });
    // Optionally navigate back or to a guild dashboard after creation
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
            Create a Guild
          </h1>
          <p className="text-gray-400 mt-2">Set up your guild details</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-black/20 p-6 rounded-xl border border-white/10"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">What’s your level?</label>
            <input
              type="number"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your level"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Guild Type</label>
            <select
              value={guildType}
              onChange={(e) => setGuildType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            >
              <option value="" disabled>Select guild type</option>
              <option value="friendly">Friendly Chat</option>
              <option value="competition">Competition</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-purple-500 text-white rounded-full hover:from-teal-500 hover:to-purple-600 transition-all"
          >
            Create Guild
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateGuild;
