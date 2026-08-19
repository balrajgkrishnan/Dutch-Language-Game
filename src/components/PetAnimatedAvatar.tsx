import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetCompanionState } from '../types';

interface PetAnimatedAvatarProps {
  companion: PetCompanionState;
  size?: number; // pixel width/height e.g. 100, 140, 200
  actionState?: 'idle' | 'happy' | 'eating' | 'sleeping' | 'bathing' | 'playing' | 'dancing' | 'sad';
  showHat?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const PetAnimatedAvatar: React.FC<PetAnimatedAvatarProps> = ({
  companion,
  size = 120,
  actionState = 'idle',
  showHat = true,
  className = '',
  onClick
}) => {
  const hat = companion.equippedHat || 'none';

  // Hat emoji/graphics mapping
  const hatElement = () => {
    if (!showHat || hat === 'none') return null;
    const hatConfig: Record<string, { emoji: string; yOffset: number; scale: number; rotate: number }> = {
      crown: { emoji: '👑', yOffset: -38, scale: 1.2, rotate: -5 },
      safari_hat: { emoji: '🤠', yOffset: -36, scale: 1.3, rotate: 0 },
      party_hat: { emoji: '🥳', yOffset: -38, scale: 1.2, rotate: 8 },
      headphones: { emoji: '🎧', yOffset: -28, scale: 1.3, rotate: 0 },
      bow: { emoji: '🎀', yOffset: -34, scale: 1.1, rotate: -12 },
      glasses: { emoji: '👓', yOffset: -12, scale: 1.0, rotate: 0 },
      nightcap: { emoji: '🛌', yOffset: -36, scale: 1.2, rotate: 10 }
    };

    const config = hatConfig[hat];
    if (!config) return null;

    return (
      <motion.div
        animate={
          actionState === 'dancing'
            ? { rotate: [-10, 10, -10], y: [config.yOffset - 3, config.yOffset + 3, config.yOffset - 3] }
            : actionState === 'playing'
            ? { y: [config.yOffset - 6, config.yOffset, config.yOffset - 6] }
            : { y: config.yOffset }
        }
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: `${size * 0.38}px` }}
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 filter drop-shadow-md select-none"
      >
        {config.emoji}
      </motion.div>
    );
  };

  // Color theme per species
  const getSpeciesColors = (species: string) => {
    switch (companion.id) {
      case 'bowie-puppy':
        return { body: '#F59E0B', belly: '#FEF3C7', ears: '#D97706', cheeks: '#FCA5A5' };
      case 'mimi-kitten':
        return { body: '#F472B6', belly: '#FCE7F3', ears: '#EC4899', cheeks: '#FDA4AF' };
      case 'pippa-panda':
        return { body: '#FFFFFF', belly: '#F3F4F6', ears: '#1F2937', cheeks: '#FBCFE8' };
      case 'bibi-bunny':
        return { body: '#C084FC', belly: '#F3E8FF', ears: '#A855F7', cheeks: '#F472B6' };
      case 'vossie-fox':
        return { body: '#FB923C', belly: '#FFEDD5', ears: '#EA580C', cheeks: '#FCA5A5' };
      case 'draco-dragon':
        return { body: '#EF4444', belly: '#FEF08A', ears: '#B91C1C', cheeks: '#FDE047' };
      case 'max-monkey':
        return { body: '#B45309', belly: '#FED7AA', ears: '#92400E', cheeks: '#FCA5A5' };
      case 'coco-parrot':
        return { body: '#10B981', belly: '#FDE047', ears: '#059669', cheeks: '#F472B6' };
      case 'leo-lion':
        return { body: '#F59E0B', belly: '#FEF3C7', ears: '#B45309', cheeks: '#FCA5A5' };
      case 'ella-elephant':
        return { body: '#60A5FA', belly: '#DBEAFE', ears: '#3B82F6', cheeks: '#FDA4AF' };
      case 'ollie-owl':
      default:
        return { body: '#8B5CF6', belly: '#EDE9FE', ears: '#6D28D9', cheeks: '#F472B6' };
    }
  };

  const colors = getSpeciesColors(companion.species);

  // Animation variants
  const getBodyMotionProps = () => {
    switch (actionState) {
      case 'happy':
        return {
          animate: { y: [0, -14, 0], scaleY: [1, 1.08, 0.96, 1] },
          transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'eating':
        return {
          animate: { scaleX: [1, 1.05, 0.98, 1], scaleY: [1, 0.96, 1.04, 1] },
          transition: { duration: 0.4, repeat: Infinity }
        };
      case 'sleeping':
        return {
          animate: { scaleY: [1, 1.03, 1], y: [0, 2, 0], rotate: [-2, 2, -2] },
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'bathing':
        return {
          animate: { rotate: [-4, 4, -4], y: [0, -4, 0] },
          transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'dancing':
        return {
          animate: { rotate: [-10, 10, -10], y: [0, -10, 0], scale: [1, 1.06, 1] },
          transition: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'playing':
        return {
          animate: { y: [0, -18, 0], rotate: [0, -12, 12, 0] },
          transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'sad':
        return {
          animate: { y: [0, 4, 0], scaleY: [1, 0.95, 1] },
          transition: { duration: 2.0, repeat: Infinity }
        };
      case 'idle':
      default:
        return {
          animate: { y: [0, -4, 0], scaleY: [1, 1.02, 1] },
          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  return (
    <div
      onClick={onClick}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* Ground Shadow */}
      <motion.div
        animate={
          actionState === 'playing' || actionState === 'happy' || actionState === 'dancing'
            ? { scale: [1, 0.7, 1], opacity: [0.35, 0.15, 0.35] }
            : { scale: [1, 0.92, 1], opacity: [0.3, 0.25, 0.3] }
        }
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: `${size * 0.75}px`,
          height: `${size * 0.2}px`,
          bottom: `${size * 0.05}px`
        }}
        className="absolute bg-slate-900/30 rounded-full filter blur-[2px] pointer-events-none"
      />

      {/* Floating Bubbles if Bathing */}
      {actionState === 'bathing' && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <motion.div
            animate={{ y: [0, -30], opacity: [0, 1, 0], scale: [0.8, 1.3] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute top-2 left-2 text-xl"
          >
            🫧
          </motion.div>
          <motion.div
            animate={{ y: [0, -35], opacity: [0, 1, 0], scale: [0.6, 1.2] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute top-4 right-3 text-lg"
          >
            🧼
          </motion.div>
          <motion.div
            animate={{ y: [0, -25], opacity: [0, 1, 0] }}
            transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 0.1 }}
            className="absolute bottom-6 left-6 text-sm"
          >
            🫧
          </motion.div>
        </div>
      )}

      {/* Floating Zzz if Sleeping */}
      {actionState === 'sleeping' && (
        <div className="absolute top-0 right-0 pointer-events-none z-30">
          <motion.div
            animate={{ y: [0, -25], x: [0, 10], opacity: [0, 1, 0], scale: [0.7, 1.3] }}
            transition={{ duration: 2.0, repeat: Infinity }}
            className="text-base font-black text-indigo-500"
          >
            💤
          </motion.div>
        </div>
      )}

      {/* Music Notes if Dancing */}
      {actionState === 'dancing' && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <motion.div
            animate={{ y: [0, -30], x: [-5, 10], opacity: [0, 1, 0] }}
            transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 0.1 }}
            className="absolute top-0 left-2 text-base"
          >
            🎵
          </motion.div>
          <motion.div
            animate={{ y: [0, -30], x: [5, -10], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3 }}
            className="absolute top-2 right-2 text-base"
          >
            🎶
          </motion.div>
        </div>
      )}

      {/* Floating Crumb Particles if Eating */}
      {actionState === 'eating' && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <motion.div
            animate={{ scale: [0.5, 1.2, 0], y: [0, 12] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* Main Animated Vector Character Body */}
      <motion.div
        {...getBodyMotionProps()}
        style={{ width: `${size * 0.85}px`, height: `${size * 0.85}px` }}
        className="relative flex items-center justify-center z-10"
      >
        {/* Hat / Head Accessory */}
        {hatElement()}

        {/* Scalable SVG Pet Rig */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-lg overflow-visible"
        >
          {/* Ears / Antennas */}
          {companion.id === 'bibi-bunny' ? (
            // Long Bunny Ears
            <g>
              <ellipse cx="42" cy="24" rx="9" ry="24" fill={colors.body} transform="rotate(-10 42 24)" />
              <ellipse cx="42" cy="24" rx="5" ry="18" fill={colors.ears} transform="rotate(-10 42 24)" />
              <ellipse cx="78" cy="24" rx="9" ry="24" fill={colors.body} transform="rotate(10 78 24)" />
              <ellipse cx="78" cy="24" rx="5" ry="18" fill={colors.ears} transform="rotate(10 78 24)" />
            </g>
          ) : companion.id === 'pippa-panda' ? (
            // Round Panda Ears
            <g>
              <circle cx="34" cy="35" r="14" fill="#1F2937" />
              <circle cx="86" cy="35" r="14" fill="#1F2937" />
            </g>
          ) : companion.id === 'mimi-kitten' || companion.id === 'vossie-fox' ? (
            // Pointy Cat / Fox Ears
            <g>
              <polygon points="28,45 42,20 54,42" fill={colors.body} />
              <polygon points="32,42 42,24 50,40" fill={colors.ears} />
              <polygon points="92,45 78,20 66,42" fill={colors.body} />
              <polygon points="88,42 78,24 70,40" fill={colors.ears} />
            </g>
          ) : companion.id === 'bowie-puppy' ? (
            // Floppy Puppy Ears
            <g>
              <ellipse cx="26" cy="50" rx="10" ry="18" fill={colors.ears} transform="rotate(15 26 50)" />
              <ellipse cx="94" cy="50" rx="10" ry="18" fill={colors.ears} transform="rotate(-15 94 50)" />
            </g>
          ) : companion.id === 'draco-dragon' ? (
            // Dragon Horns & Wings
            <g>
              <path d="M 32 38 Q 20 18 36 22 Z" fill="#F59E0B" />
              <path d="M 88 38 Q 100 18 84 22 Z" fill="#F59E0B" />
              <path d="M 18 65 Q 4 45 28 55 Z" fill="#DC2626" opacity="0.9" />
              <path d="M 102 65 Q 116 45 92 55 Z" fill="#DC2626" opacity="0.9" />
            </g>
          ) : (
            // Default Rounded Ears / Tuft
            <g>
              <circle cx="35" cy="40" r="10" fill={colors.ears} />
              <circle cx="85" cy="40" r="10" fill={colors.ears} />
            </g>
          )}

          {/* Main Body */}
          <ellipse
            cx="60"
            cy="70"
            rx="40"
            ry="38"
            fill={colors.body}
            stroke="#1F2937"
            strokeWidth="3.5"
          />

          {/* Fluffy Tummy */}
          <ellipse
            cx="60"
            cy="78"
            rx="26"
            ry="24"
            fill={colors.belly}
            opacity="0.9"
          />

          {/* Panda Eye Patches */}
          {companion.id === 'pippa-panda' && (
            <g fill="#1F2937">
              <ellipse cx="46" cy="58" rx="11" ry="9" transform="rotate(-15 46 58)" />
              <ellipse cx="74" cy="58" rx="11" ry="9" transform="rotate(15 74 58)" />
            </g>
          )}

          {/* Cheerful Eyes */}
          {actionState === 'sleeping' ? (
            // Closed Sleeping Curved Eyes
            <g stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 42 60 Q 48 66 54 60" />
              <path d="M 66 60 Q 72 66 78 60" />
            </g>
          ) : actionState === 'happy' || actionState === 'dancing' ? (
            // Joyful Happy Upward Arc Eyes
            <g stroke="#1F2937" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M 42 62 Q 48 54 54 62" />
              <path d="M 66 62 Q 72 54 78 62" />
            </g>
          ) : (
            // Big Sparkling Kawaii Eyes
            <g>
              <ellipse cx="48" cy="59" rx="6.5" ry="7.5" fill="#1F2937" />
              <ellipse cx="72" cy="59" rx="6.5" ry="7.5" fill="#1F2937" />
              {/* Eye Catchlight Sparkles */}
              <circle cx="46" cy="56" r="2.5" fill="#FFFFFF" />
              <circle cx="70" cy="56" r="2.5" fill="#FFFFFF" />
              <circle cx="50" cy="62" r="1.2" fill="#FFFFFF" />
              <circle cx="74" cy="62" r="1.2" fill="#FFFFFF" />
            </g>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="36" cy="68" rx="6" ry="4" fill={colors.cheeks} opacity="0.75" />
          <ellipse cx="84" cy="68" rx="6" ry="4" fill={colors.cheeks} opacity="0.75" />

          {/* Cute Nose & Mouth */}
          <g>
            {/* Small Triangle Nose */}
            <polygon points="60,65 56,61 64,61" fill="#1F2937" />
            
            {/* Mouth */}
            {actionState === 'eating' ? (
              // Open Munching Mouth
              <ellipse cx="60" cy="72" rx="6" ry="5" fill="#EF4444" stroke="#1F2937" strokeWidth="2.5" />
            ) : actionState === 'sad' ? (
              // Sad Frown
              <path d="M 54 74 Q 60 69 66 74" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              // Happy W-Smile
              <path d="M 53 67 Q 56 72 60 68 Q 64 72 67 67" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}
          </g>

          {/* Little Front Paws */}
          <ellipse cx="44" cy="94" rx="8" ry="6" fill={colors.body} stroke="#1F2937" strokeWidth="2.5" />
          <ellipse cx="76" cy="94" rx="8" ry="6" fill={colors.body} stroke="#1F2937" strokeWidth="2.5" />
        </svg>

        {/* Species Emoticon Badge Overlay for Immediate Recognition */}
        <div className="absolute -bottom-1 -right-1 text-2xl bg-white/95 rounded-full p-1 border-2 border-slate-200 shadow-md pointer-events-none">
          {companion.emoji}
        </div>
      </motion.div>
    </div>
  );
};
