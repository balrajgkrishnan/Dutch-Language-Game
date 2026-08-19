import React from 'react';
import { motion } from 'motion/react';

interface TessAvatarProps {
  mood?: 'happy' | 'cheering' | 'thinking' | 'waving';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TessAvatar: React.FC<TessAvatarProps> = ({
  mood = 'happy',
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl'
  };

  const moodAnimation = {
    happy: { y: [0, -3, 0], rotate: [0, 1, -1, 0] },
    cheering: { y: [0, -10, 0], scale: [1, 1.12, 1], rotate: [-2, 2, -2] },
    thinking: { rotate: [0, -4, 0], y: [0, -2, 0] },
    waving: { rotate: [0, 6, -6, 0] }
  };

  return (
    <motion.div
      id="tess-avatar"
      animate={moodAnimation[mood]}
      transition={{ repeat: Infinity, duration: mood === 'cheering' ? 0.8 : 2.5, ease: 'easeInOut' }}
      className={`relative inline-flex items-center justify-center bg-gradient-to-br from-emerald-100 to-lime-200 rounded-full border-2 border-emerald-400 shadow-sm ${sizeMap[size]} ${className}`}
    >
      <span className="select-none">👩‍🌾</span>
      {mood === 'cheering' && (
        <motion.span
          animate={{ scale: [0.8, 1.3, 0.8], rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute -top-2 -right-1 text-xs"
        >
          ✨
        </motion.span>
      )}
    </motion.div>
  );
};
