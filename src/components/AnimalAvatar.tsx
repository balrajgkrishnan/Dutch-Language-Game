import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../services/soundService';
import { ALL_BIOME_ANIMALS } from '../data/biomeAnimals';

interface AnimalAvatarProps {
  animalId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isAnimated?: boolean;
  interactive?: boolean;
  onPet?: () => void;
  className?: string;
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({
  animalId,
  size = 'md',
  isAnimated = true,
  interactive = false,
  onPet,
  className = ''
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-18 h-18 text-4xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-32 h-32 text-6xl'
  };

  const handleInteraction = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsWiggling(true);
    sound.playAnimalHappy(
      animalId.includes('lion') || animalId.includes('leeuw')
        ? 'lion'
        : animalId.includes('olifant')
        ? 'elephant'
        : 'general'
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now() + Math.random(), x, y };
    setHearts(prev => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setIsWiggling(false);
    }, 600);

    if (onPet) {
      onPet();
    }
  };

  const matchedAnimal = ALL_BIOME_ANIMALS.find(a => a.id === animalId);
  const currentEmoji = matchedAnimal?.emoji || '🌟';

  return (
    <motion.div
      id={`animal-avatar-${animalId}`}
      onClick={handleInteraction}
      whileHover={interactive ? { scale: 1.08 } : undefined}
      whileTap={interactive ? { scale: 0.94 } : undefined}
      animate={isWiggling ? { scale: [1, 1.2, 0.95, 1.05, 1], rotate: [0, -8, 8, -4, 0] } : undefined}
      className={`relative inline-flex items-center justify-center rounded-2xl ${sizeClasses[size]} ${
        interactive ? 'cursor-pointer transition-shadow hover:shadow-lg' : ''
      } ${className}`}
    >
      <motion.div
        animate={isAnimated ? { y: [0, -3, 0], rotate: [0, 1.5, -1.5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="relative flex items-center justify-center"
      >
        <span className="filter drop-shadow-md select-none">{currentEmoji}</span>
      </motion.div>

      {/* Floating Pet Hearts */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -45, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="pointer-events-none absolute text-rose-500 font-bold text-lg select-none z-20"
            style={{ left: heart.x || '50%', top: heart.y || '50%' }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
