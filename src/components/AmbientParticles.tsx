import React from 'react';
import { motion } from 'motion/react';
import { BiomeType } from '../types';
import { BIOMES } from '../data/biomeData';

interface AmbientParticlesProps {
  biome: BiomeType;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({ biome }) => {
  const currentBiome = BIOMES.find(b => b.id === biome) || BIOMES[0];
  const particles = currentBiome.particleEmoji;

  // Generate 8 consistent ambient particles
  const particleItems = [
    { id: 1, emoji: particles[0 % particles.length], left: '5%', duration: 14, delay: 0, size: 'text-xl' },
    { id: 2, emoji: particles[1 % particles.length], left: '18%', duration: 18, delay: 2, size: 'text-base' },
    { id: 3, emoji: particles[2 % particles.length], left: '32%', duration: 12, delay: 1, size: 'text-2xl' },
    { id: 4, emoji: particles[3 % particles.length], left: '50%', duration: 16, delay: 4, size: 'text-lg' },
    { id: 5, emoji: particles[4 % particles.length], left: '68%', duration: 20, delay: 3, size: 'text-xl' },
    { id: 6, emoji: particles[0 % particles.length], left: '82%', duration: 15, delay: 5, size: 'text-base' },
    { id: 7, emoji: particles[1 % particles.length], left: '94%', duration: 17, delay: 2, size: 'text-2xl' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-40">
      {particleItems.map((p) => (
        <motion.div
          key={`${biome}-${p.id}`}
          initial={{ y: '105vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 45, -45, 90],
            x: [0, 15, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'linear'
          }}
          className={`absolute ${p.size} select-none`}
          style={{ left: p.left }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};
