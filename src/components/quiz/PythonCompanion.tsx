import React from 'react';
import { motion } from 'framer-motion';

// Import images as modules from the new path
import wizardHappy from '../../companions/images/wizard-happy.png';
import wizardSad from '../../companions/images/wizard-sad.png';
import wizardThinking from '../../companions/images/wizard-thinking.png';
import wizardVictory from '../../companions/images/wizard-victory.png';

// Map moods to imported images
const moodImages: Record<string, string> = {
  happy: wizardHappy,
  sad: wizardSad,
  thinking: wizardThinking,
  victory: wizardVictory
};

interface PythonCompanionProps {
  mood: 'happy' | 'sad' | 'thinking' | 'victory';
  dialogue: string;
}

const PythonCompanion: React.FC<PythonCompanionProps> = ({ mood, dialogue }) => {
  const moodVariants = {
    happy: { y: [0, -10, 0], transition: { duration: 1, repeat: Infinity } },
    sad: { rotate: [-5, 5, -5], transition: { duration: 1.5, repeat: Infinity } },
    thinking: { scale: [1, 1.1, 1], transition: { duration: 0.8, repeat: Infinity } },
    victory: { rotate: 360, transition: { duration: 2 } }
  };

  return (
    <motion.div 
      className="absolute bottom-4 left-4 flex items-end gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <motion.img 
        src={moodImages[mood]} // Use imported image based on mood
        alt={`Wizard companion ${mood}`} 
        className="w-20 h-20"
        variants={moodVariants}
        animate={mood}
      />
      <div className="bg-[#d3c092] p-2 rounded-lg border border-[#8b5e3c] shadow-md max-w-xs">
        <p className="text-sm text-[#6b4e31] italic">{dialogue}</p>
      </div>
    </motion.div>
  );
};

export default PythonCompanion;
