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

  // Comprehensive Animal Emoji & Badge Map for all 7 Biomes
  const animalConfig: Record<string, { emoji: string; badge: string }> = {
    // 1. Farm
    'bella-koe': { emoji: '🐮', badge: '🍀' },
    'wolletje-schaap': { emoji: '🐑', badge: '🌾' },
    'storm-paard': { emoji: '🐴', badge: '🍎' },
    'pip-varken': { emoji: '🐷', badge: '🍉' },
    'tok-kip': { emoji: '🐔', badge: '🌽' },
    'daisy-eend': { emoji: '🦆', badge: '💧' },

    // 2. Safari
    'gigi-giraf': { emoji: '🦒', badge: '🌿' },
    'leo-leeuw': { emoji: '🦁', badge: '🐾' },
    'olli-olifant': { emoji: '🐘', badge: '💧' },
    'ollie-olifant': { emoji: '🐘', badge: '💧' },
    'zara-zebra': { emoji: '🦓', badge: '🌾' },
    'mo-meerkat': { emoji: '🦦', badge: '🥜' },
    'kibo-neushoorn': { emoji: '🦏', badge: '🌿' },

    // 3. Sea
    'dolly-dolfijn': { emoji: '🐬', badge: '🫧' },
    'sammy-zeeschildpad': { emoji: '🐢', badge: '🪸' },
    'octo-octopus': { emoji: '🐙', badge: '🫧' },
    'wally-walvis': { emoji: '🐳', badge: '🌊' },
    'finley-haai': { emoji: '🦈', badge: '🐟' },
    'clippy-krab': { emoji: '🦀', badge: '🐚' },

    // 4. Snow
    'barny-ijsbeer': { emoji: '🐻‍❄️', badge: '❄️' },
    'penny-pinguin': { emoji: '🐧', badge: '🧊' },
    'robbie-zeehond': { emoji: '🦭', badge: '⭐' },
    'pip-poolvos': { emoji: '🦊', badge: '❄️' },
    'hedwig-sneeuwuil': { emoji: '🦉', badge: '✨' },
    'sven-rendier': { emoji: '🦌', badge: '🌿' },

    // 5. Jungle
    'pippa-panda': { emoji: '🐼', badge: '🎋' },
    'paco-papegaai': { emoji: '🦜', badge: '🌺' },
    'toby-tijger': { emoji: '🐯', badge: '🥥' },
    'koko-aap': { emoji: '🐒', badge: '🍌' },
    'charlie-kameleon': { emoji: '🦎', badge: '🍃' },
    'maya-toekan': { emoji: '🪶', badge: '🫐' },

    // 6. Outback
    'kiki-kangoeroe': { emoji: '🦘', badge: '🌾' },
    'coco-koala': { emoji: '🐨', badge: '🌿' },
    'wally-wombat': { emoji: '🐻', badge: '🥕' },
    'daan-dingo': { emoji: '🐕', badge: '🍖' },
    'ellie-emoe': { emoji: '🦤', badge: '🌾' },
    'finn-woestijnvos': { emoji: '🦊', badge: '🫐' },

    // 7. Mountain
    'boris-steenbok': { emoji: '🐐', badge: '🌿' },
    'max-marmot': { emoji: '🐿️', badge: '🌸' },
    'luna-alpaca': { emoji: '🦙', badge: '🌾' },
    'alex-arend': { emoji: '🦅', badge: '🐟' },
    'saar-sint-bernard': { emoji: '🐕‍🦺', badge: '🧀' },
    'bella-gems': { emoji: '🦌', badge: '🌸' }
  };

  const matchedAnimal = ALL_BIOME_ANIMALS.find(a => a.id === animalId);
  const currentConfig = animalConfig[animalId] || {
    emoji: matchedAnimal?.emoji || '🌟',
    badge: matchedAnimal?.favoriteFoodEmoji || '✨'
  };

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
        <span className="filter drop-shadow-md select-none">{currentConfig.emoji}</span>
        
        {/* Cute ambient accessory badge */}
        <motion.span
          animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute -top-1 -right-1 text-xs"
        >
          {currentConfig.badge}
        </motion.span>
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
