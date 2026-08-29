import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetCompanionState } from '../types';

interface PetAnimatedAvatarProps {
  companion: PetCompanionState;
  size?: number; // pixel width/height e.g. 100, 140, 175, 240
  actionState?: 'idle' | 'happy' | 'eating' | 'sleeping' | 'bathing' | 'playing' | 'dancing' | 'sad' | 'vet_exam' | 'bubble_pop';
  showHat?: boolean;
  showAura?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const PetAnimatedAvatar: React.FC<PetAnimatedAvatarProps> = ({
  companion,
  size = 140,
  actionState = 'idle',
  showHat = true,
  showAura = true,
  className = '',
  onClick
}) => {
  const hat = companion.equippedHat || 'none';
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural blinking effect
  useEffect(() => {
    if (actionState === 'sleeping') return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200 + Math.random() * 2200);

    return () => clearInterval(blinkInterval);
  }, [actionState]);

  // Hat / Head Accessory configuration
  const hatElement = () => {
    if (!showHat || hat === 'none') return null;
    const hatConfig: Record<string, { emoji: string; yOffset: number; scale: number; rotate: number }> = {
      crown: { emoji: '👑', yOffset: -size * 0.38, scale: 1.25, rotate: -5 },
      safari_hat: { emoji: '🤠', yOffset: -size * 0.37, scale: 1.35, rotate: 0 },
      party_hat: { emoji: '🥳', yOffset: -size * 0.40, scale: 1.2, rotate: 8 },
      headphones: { emoji: '🎧', yOffset: -size * 0.30, scale: 1.35, rotate: 0 },
      bow: { emoji: '🎀', yOffset: -size * 0.35, scale: 1.15, rotate: -10 },
      glasses: { emoji: '👓', yOffset: -size * 0.14, scale: 1.1, rotate: 0 },
      nightcap: { emoji: '🛌', yOffset: -size * 0.38, scale: 1.25, rotate: 12 }
    };

    const config = hatConfig[hat];
    if (!config) return null;

    return (
      <motion.div
        animate={
          actionState === 'dancing'
            ? { rotate: [-12, 12, -12], y: [config.yOffset - 5, config.yOffset + 3, config.yOffset - 5] }
            : actionState === 'playing' || actionState === 'bubble_pop'
            ? { y: [config.yOffset - 8, config.yOffset, config.yOffset - 8], rotate: [-6, 6, -6] }
            : { y: [config.yOffset - 1, config.yOffset + 1, config.yOffset - 1] }
        }
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: `${size * 0.36}px` }}
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-30 filter drop-shadow-lg select-none"
      >
        {config.emoji}
      </motion.div>
    );
  };

  // Dynamic Motion per action state
  const getBodyMotionProps = () => {
    switch (actionState) {
      case 'happy':
        return {
          animate: { y: [0, -18, 0, -8, 0], scaleY: [1, 1.12, 0.94, 1.05, 1], rotate: [0, -3, 3, -1, 0] },
          transition: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'eating':
        return {
          animate: { scaleX: [1, 1.06, 0.96, 1.04, 1], scaleY: [1, 0.94, 1.06, 0.98, 1], y: [0, 2, -2, 0] },
          transition: { duration: 0.45, repeat: Infinity }
        };
      case 'sleeping':
        return {
          animate: { scaleY: [1, 1.04, 1], scaleX: [1, 0.98, 1], y: [0, 3, 0], rotate: [-1.5, 1.5, -1.5] },
          transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'bathing':
        return {
          animate: { rotate: [-6, 6, -6], y: [0, -6, 0], scale: [1, 1.03, 1] },
          transition: { duration: 0.85, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'dancing':
        return {
          animate: { 
            rotate: [-14, 14, -14], 
            y: [0, -14, 0, -14, 0], 
            scaleX: [1, 1.08, 0.95, 1.08, 1],
            scaleY: [1, 0.95, 1.08, 0.95, 1]
          },
          transition: { duration: 0.75, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'playing':
      case 'bubble_pop':
        return {
          animate: { y: [0, -22, 0], rotate: [0, -8, 8, 0], scale: [1, 1.06, 0.96, 1] },
          transition: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'vet_exam':
        return {
          animate: { scale: [1, 1.03, 1], y: [0, -2, 0] },
          transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'sad':
        return {
          animate: { y: [0, 5, 0], scaleY: [1, 0.94, 1], rotate: [-2, 2, -2] },
          transition: { duration: 2.2, repeat: Infinity }
        };
      case 'idle':
      default:
        return {
          animate: { y: [0, -5, 0], scaleY: [1, 1.03, 1], scaleX: [1, 0.98, 1] },
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const }
        };
    }
  };

  const isEyesClosed = actionState === 'sleeping' || isBlinking;
  const isHeartEyes = actionState === 'happy';

  // Render SVG Elements for Eyes
  const renderEyes = (cx1: number, cx2: number, cy: number, r = 7, pupilColor = '#18181B', irisColor?: string) => {
    if (isEyesClosed) {
      return (
        <g stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d={`M ${cx1 - 6} ${cy} Q ${cx1} ${cy + 6} ${cx1 + 6} ${cy}`} />
          <path d={`M ${cx2 - 6} ${cy} Q ${cx2} ${cy + 6} ${cx2 + 6} ${cy}`} />
        </g>
      );
    }
    if (isHeartEyes) {
      return (
        <g fill="#EF4444" stroke="#B91C1C" strokeWidth="1">
          <path d={`M ${cx1} ${cy + 4} A 3.5 3.5 0 0 0 ${cx1 - 5} ${cy - 1} A 3.5 3.5 0 0 0 ${cx1 - 8} ${cy + 3} Q ${cx1 - 8} ${cy + 7} ${cx1} ${cy + 13} Q ${cx1 + 8} ${cy + 7} ${cx1 + 8} ${cy + 3} A 3.5 3.5 0 0 0 ${cx1 + 5} ${cy - 1} A 3.5 3.5 0 0 0 ${cx1} ${cy + 4} Z`} transform={`scale(0.7) translate(${cx1 * 0.4}, ${cy * 0.4})`} />
          <path d={`M ${cx2} ${cy + 4} A 3.5 3.5 0 0 0 ${cx2 - 5} ${cy - 1} A 3.5 3.5 0 0 0 ${cx2 - 8} ${cy + 3} Q ${cx2 - 8} ${cy + 7} ${cx2} ${cy + 13} Q ${cx2 + 8} ${cy + 7} ${cx2 + 8} ${cy + 3} A 3.5 3.5 0 0 0 ${cx2 + 5} ${cy - 1} A 3.5 3.5 0 0 0 ${cx2} ${cy + 4} Z`} transform={`scale(0.7) translate(${cx2 * 0.4}, ${cy * 0.4})`} />
        </g>
      );
    }
    if (actionState === 'dancing') {
      return (
        <g fill="#F59E0B" stroke="#B45309" strokeWidth="1.2">
          <polygon points={`${cx1},${cy-7} ${cx1+2.5},${cy-2} ${cx1+8},${cy-1} ${cx1+4},${cy+3} ${cx1+5},${cy+8} ${cx1},${cy+5} ${cx1-5},${cy+8} ${cx1-4},${cy+3} ${cx1-8},${cy-1} ${cx1-2.5},${cy-2}`} />
          <polygon points={`${cx2},${cy-7} ${cx2+2.5},${cy-2} ${cx2+8},${cy-1} ${cx2+4},${cy+3} ${cx2+5},${cy+8} ${cx2},${cy+5} ${cx2-5},${cy+8} ${cx2-4},${cy+3} ${cx2-8},${cy-1} ${cx2-2.5},${cy-2}`} />
        </g>
      );
    }
    return (
      <g>
        {/* Eye Base / Iris */}
        {irisColor && (
          <>
            <circle cx={cx1} cy={cy} r={r + 1.5} fill={irisColor} stroke="#18181B" strokeWidth="1" />
            <circle cx={cx2} cy={cy} r={r + 1.5} fill={irisColor} stroke="#18181B" strokeWidth="1" />
          </>
        )}
        {/* Pupil */}
        <ellipse cx={cx1} cy={cy} rx={r} ry={r + 1} fill={pupilColor} />
        <ellipse cx={cx2} cy={cy} rx={r} ry={r + 1} fill={pupilColor} />
        {/* Sparkles */}
        <circle cx={cx1 - 2.5} cy={cy - 2.5} r={r * 0.38} fill="#FFFFFF" />
        <circle cx={cx2 - 2.5} cy={cy - 2.5} r={r * 0.38} fill="#FFFFFF" />
        <circle cx={cx1 + 2.5} cy={cy + 2.5} r={r * 0.18} fill="#FFFFFF" />
        <circle cx={cx2 + 2.5} cy={cy + 2.5} r={r * 0.18} fill="#FFFFFF" />
      </g>
    );
  };

  // Render Specimen Detail per Companion ID
  const renderPetGraphics = () => {
    const id = companion.id;

    switch (id) {
      // 1. OLLIE OWL (Owl / Uil)
      case 'ollie-owl':
        return (
          <g id="pet-ollie-owl">
            {/* Wooden Perch Branch */}
            <path d="M 12 104 Q 60 100 108 104" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="28" cy="103" rx="4" ry="2" fill="#16A34A" />
            <ellipse cx="92" cy="103" rx="4" ry="2" fill="#16A34A" />

            {/* Plumicorn Ear Tufts */}
            <polygon points="32,42 22,16 46,34" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
            <polygon points="30,38 24,20 40,32" fill="#92400E" />
            <polygon points="88,42 98,16 74,34" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
            <polygon points="90,38 96,20 80,32" fill="#92400E" />

            {/* Flappable Feathered Wings */}
            <path d="M 24 60 Q 10 75 22 92 Q 32 82 30 64 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
            <path d="M 96 60 Q 110 75 98 92 Q 88 82 90 64 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
            <path d="M 22 72 Q 14 82 23 88" stroke="#451A03" strokeWidth="1.5" fill="none" />
            <path d="M 98 72 Q 106 82 97 88" stroke="#451A03" strokeWidth="1.5" fill="none" />

            {/* Main Rounded Owl Body */}
            <ellipse cx="60" cy="68" rx="38" ry="34" fill="#92400E" stroke="#451A03" strokeWidth="3" />

            {/* Owl Facial Disc (Heart-shaped / Dual-circle mask) */}
            <circle cx="47" cy="56" r="16" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
            <circle cx="73" cy="56" r="16" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />

            {/* Speckled Cream Belly with Feather Chevrons */}
            <ellipse cx="60" cy="78" rx="22" ry="18" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
            <g stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M 52 72 L 55 75 L 58 72" />
              <path d="M 62 72 L 65 75 L 68 72" />
              <path d="M 47 78 L 50 81 L 53 78" />
              <path d="M 57 78 L 60 81 L 63 78" />
              <path d="M 67 78 L 70 81 L 73 78" />
              <path d="M 52 84 L 55 87 L 58 84" />
              <path d="M 62 84 L 65 87 L 68 84" />
            </g>

            {/* Eyes */}
            {renderEyes(47, 73, 56, 7.5, '#18181B', '#F59E0B')}

            {/* Scholar Spectacles Bridge */}
            <line x1="57" y1="56" x2="63" y2="56" stroke="#451A03" strokeWidth="2.5" />

            {/* Hooked Raptor Beak */}
            <polygon points="60,56 54,66 66,66" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <path d="M 54 66 Q 60 72 66 66 Z" fill="#D97706" stroke="#B45309" strokeWidth="1" />

            {/* Rosy Cheeks */}
            <ellipse cx="34" cy="65" rx="5" ry="3" fill="#FDA4AF" opacity="0.75" />
            <ellipse cx="86" cy="65" rx="5" ry="3" fill="#FDA4AF" opacity="0.75" />

            {/* Golden Talons on Branch */}
            <g fill="#F59E0B" stroke="#B45309" strokeWidth="1.5">
              <ellipse cx="44" cy="100" rx="3.5" ry="5" />
              <ellipse cx="51" cy="100" rx="3.5" ry="5" />
              <ellipse cx="69" cy="100" rx="3.5" ry="5" />
              <ellipse cx="76" cy="100" rx="3.5" ry="5" />
            </g>
          </g>
        );

      // 2. MAX MONKEY (Monkey / Aapje)
      case 'max-monkey':
        return (
          <g id="pet-max-monkey">
            {/* Long Curled Prehensile Tail behind */}
            <path d="M 28 85 Q 8 85 10 65 Q 12 45 24 50 Q 28 55 22 58" stroke="#78350F" strokeWidth="6" strokeLinecap="round" fill="none" />

            {/* Large Protruding Round Monkey Ears */}
            <circle cx="24" cy="56" r="14" fill="#92400E" stroke="#542207" strokeWidth="2.5" />
            <circle cx="24" cy="56" r="9" fill="#FED7AA" />
            <circle cx="96" cy="56" r="14" fill="#92400E" stroke="#542207" strokeWidth="2.5" />
            <circle cx="96" cy="56" r="9" fill="#FED7AA" />

            {/* Furry Brown Body */}
            <ellipse cx="60" cy="72" rx="36" ry="32" fill="#92400E" stroke="#542207" strokeWidth="3" />

            {/* Heart/Oval Shaped Peach Face Mask */}
            <path d="M 60 48 C 44 36 34 52 40 68 C 45 78 55 80 60 80 C 65 80 75 78 80 68 C 86 52 76 36 60 48 Z" fill="#FED7AA" stroke="#92400E" strokeWidth="1.5" />

            {/* Peach Belly */}
            <ellipse cx="60" cy="84" rx="20" ry="14" fill="#FED7AA" opacity="0.9" />

            {/* Eyes */}
            {renderEyes(48, 72, 57, 6.5, '#18181B')}

            {/* Rosy Cheeks */}
            <ellipse cx="38" cy="67" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.8" />
            <ellipse cx="82" cy="67" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.8" />

            {/* Monkey Snout, Nostrils & Smile */}
            <ellipse cx="60" cy="68" rx="8" ry="5.5" fill="#FDBA74" />
            <circle cx="57.5" cy="67" r="1.2" fill="#78350F" />
            <circle cx="62.5" cy="67" r="1.2" fill="#78350F" />
            <path d="M 53 73 Q 60 78 67 73" stroke="#542207" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Yellow Banana in Paw */}
            <path d="M 82 82 Q 95 85 92 70 Q 90 68 86 73 Q 82 78 82 82 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <ellipse cx="88" cy="72" rx="1.5" ry="1.5" fill="#78350F" />

            {/* Monkey Paws */}
            <circle cx="38" cy="94" r="8" fill="#FED7AA" stroke="#542207" strokeWidth="2" />
            <circle cx="82" cy="94" r="8" fill="#FED7AA" stroke="#542207" strokeWidth="2" />
          </g>
        );

      // 3. BOWIE PUPPY (Puppy / Hondje)
      case 'bowie-puppy':
        return (
          <g id="pet-bowie-puppy">
            {/* Wagging Puppy Tail */}
            <motion.path
              d="M 94 76 Q 112 68 114 54 Q 106 50 98 66"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="2.5"
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '94px 76px' }}
            />

            {/* Floppy Hound Ears */}
            <path d="M 28 42 C 14 42 12 70 20 80 C 26 86 34 76 34 60 Z" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
            <path d="M 92 42 C 106 42 108 70 100 80 C 94 86 86 76 86 60 Z" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />

            {/* Main Golden Pup Body */}
            <ellipse cx="60" cy="70" rx="38" ry="34" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />

            {/* Dark Brown Patch over Left Eye */}
            <ellipse cx="46" cy="56" rx="13" ry="12" fill="#92400E" transform="rotate(-6 46 56)" />

            {/* White Muzzle & Chest Bib */}
            <ellipse cx="60" cy="73" rx="18" ry="14" fill="#FFFBEB" stroke="#D97706" strokeWidth="1" />
            <path d="M 44 80 Q 60 96 76 80 L 60 74 Z" fill="#FFFBEB" />

            {/* Eyes */}
            {renderEyes(46, 74, 56, 6.5, '#18181B')}

            {/* Shiny Wet Black Puppy Nose */}
            <ellipse cx="60" cy="67" rx="5.5" ry="4" fill="#18181B" />
            <circle cx="58" cy="65.5" r="1.5" fill="#FFFFFF" />

            {/* Open Mouth with Panting Pink Tongue */}
            <path d="M 54 73 Q 60 78 66 73" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 57 75 Q 60 84 63 75 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1.2" />

            {/* Rosy Cheeks */}
            <ellipse cx="34" cy="67" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="86" cy="67" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

            {/* Red Explorer Collar & Gold Tag */}
            <path d="M 38 88 Q 60 96 82 88" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="94" r="4.5" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
            <text x="60" y="96.5" fontSize="5" textAnchor="middle" fill="#78350F" fontWeight="900">★</text>

            {/* Soft Puppy Paws */}
            <ellipse cx="42" cy="96" rx="8" ry="6" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            <ellipse cx="78" cy="96" rx="8" ry="6" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
          </g>
        );

      // 4. MIMI KITTEN (Orange Tabby Kitten / Gember Poesje)
      case 'mimi-kitten':
        return (
          <g id="pet-mimi-kitten">
            {/* Graceful Upright Curled Orange Cat Tail */}
            <motion.path
              d="M 92 78 Q 112 70 110 50 Q 108 36 96 42 Q 102 48 102 56 Q 100 68 88 74"
              fill="#F97316"
              stroke="#C2410C"
              strokeWidth="2.5"
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '92px 78px' }}
            />
            {/* Tail Tabby Stripes */}
            <path d="M 98 68 Q 103 66 106 70" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 102 58 Q 107 56 109 60" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* White Tail Tip */}
            <circle cx="99" cy="40" r="4.5" fill="#FFFBEB" stroke="#FED7AA" strokeWidth="1" />

            {/* Pointed Cat Ears (Orange outer, Peach & Soft Pink Inner) */}
            <polygon points="26,46 38,14 56,38" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
            <polygon points="32,42 40,22 50,38" fill="#FED7AA" />
            <polygon points="34,40 40,26 46,38" fill="#FDA4AF" />
            
            <polygon points="94,46 82,14 64,38" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
            <polygon points="88,42 80,22 70,38" fill="#FED7AA" />
            <polygon points="86,40 80,26 74,38" fill="#FDA4AF" />

            {/* Main Vibrant Orange Kitten Body */}
            <ellipse cx="60" cy="70" rx="38" ry="34" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />

            {/* Tabby Forehead Markings ('M' pattern) in Auburn */}
            <g stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none">
              <path d="M 52 42 L 56 48 L 60 42 L 64 48 L 68 42" />
              <path d="M 56 38 L 60 33 L 64 38" />
              {/* Cheek Stripes */}
              <path d="M 28 58 L 36 60" />
              <path d="M 26 64 L 35 65" />
              <path d="M 92 58 L 84 60" />
              <path d="M 94 64 L 85 65" />
            </g>

            {/* Cream Muzzle & Fluffy Warm Cream Chest */}
            <ellipse cx="60" cy="84" rx="20" ry="14" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1" />
            <ellipse cx="60" cy="72" rx="16" ry="12" fill="#FFFBEB" />

            {/* Fine Whiskers (3 on each cheek) */}
            <g stroke="#78350F" strokeWidth="1.3" strokeLinecap="round">
              <line x1="20" y1="65" x2="42" y2="67" />
              <line x1="18" y1="71" x2="42" y2="70" />
              <line x1="20" y1="77" x2="42" y2="73" />
              <line x1="100" y1="65" x2="78" y2="67" />
              <line x1="102" y1="71" x2="78" y2="70" />
              <line x1="100" y1="77" x2="78" y2="73" />
            </g>

            {/* Sparkling Almond Emerald Green Cat Eyes */}
            {renderEyes(46, 74, 57, 6.5, '#18181B', '#10B981')}

            {/* Tiny Pink Triangular Cat Nose & Warm Smile */}
            <polygon points="60,68 56,64 64,64" fill="#FB7185" />
            <path d="M 55 71 Q 60 74.5 65 71" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Rosy Cheeks */}
            <ellipse cx="36" cy="68" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.85" />
            <ellipse cx="84" cy="68" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.85" />

            {/* Cute Cream Kitten Paws with Orange Outline & Pink Pads */}
            <ellipse cx="42" cy="96" rx="8" ry="6" fill="#FFFBEB" stroke="#C2410C" strokeWidth="2" />
            <circle cx="42" cy="96" r="2.5" fill="#FDA4AF" />
            <ellipse cx="78" cy="96" rx="8" ry="6" fill="#FFFBEB" stroke="#C2410C" strokeWidth="2" />
            <circle cx="78" cy="96" r="2.5" fill="#FDA4AF" />
          </g>
        );

      // 5. PIPPA PANDA (Giant Panda / Reuzenpanda)
      case 'pippa-panda':
        return (
          <g id="pet-pippa-panda">
            {/* Solid Round Black Panda Ears */}
            <circle cx="28" cy="32" r="14" fill="#18181B" stroke="#09090B" strokeWidth="2.5" />
            <circle cx="28" cy="32" r="7" fill="#27272A" />
            <circle cx="92" cy="32" r="14" fill="#18181B" stroke="#09090B" strokeWidth="2.5" />
            <circle cx="92" cy="32" r="7" fill="#27272A" />

            {/* White Body Base */}
            <ellipse cx="60" cy="70" rx="39" ry="35" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />

            {/* Giant Panda Black Shoulder / Arm Mantle Band */}
            <path d="M 22 70 C 22 84 34 94 60 94 C 86 94 98 84 98 70 C 98 62 90 60 76 68 C 68 72 52 72 44 68 C 30 60 22 62 22 70 Z" fill="#18181B" />

            {/* Snowy White Head & Lower Belly */}
            <ellipse cx="60" cy="56" rx="34" ry="26" fill="#FFFFFF" />
            <ellipse cx="60" cy="85" rx="18" ry="10" fill="#FFFFFF" />

            {/* Signature Angled Black Panda Eye Patches */}
            <g fill="#18181B">
              <ellipse cx="44" cy="55" rx="12" ry="10" transform="rotate(-20 44 55)" />
              <ellipse cx="76" cy="55" rx="12" ry="10" transform="rotate(20 76 55)" />
            </g>

            {/* Expressive Eyes inside Patches */}
            {renderEyes(44, 76, 55, 6, '#FFFFFF')}

            {/* Broad Black Panda Nose & Smile */}
            <ellipse cx="60" cy="66" rx="6" ry="4" fill="#18181B" />
            <path d="M 54 71 Q 60 75 66 71" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Rosy Cheeks */}
            <ellipse cx="32" cy="66" rx="6" ry="4" fill="#FBCFE8" opacity="0.8" />
            <ellipse cx="88" cy="66" rx="6" ry="4" fill="#FBCFE8" opacity="0.8" />

            {/* Green Bamboo Stalk in Paw */}
            <g>
              <line x1="88" y1="52" x2="80" y2="92" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="88" cy="56" rx="6" ry="2.5" fill="#22C55E" transform="rotate(-30 88 56)" />
              <ellipse cx="84" cy="68" rx="6" ry="2.5" fill="#22C55E" transform="rotate(30 84 68)" />
            </g>

            {/* Black Panda Paws */}
            <circle cx="36" cy="94" r="8" fill="#18181B" stroke="#09090B" strokeWidth="2" />
            <circle cx="84" cy="94" r="8" fill="#18181B" stroke="#09090B" strokeWidth="2" />
          </g>
        );

      // 6. BIBI BUNNY (Snow White Bunny / Huppelkonijntje)
      case 'bibi-bunny':
        return (
          <g id="pet-bibi-bunny">
            {/* Fluffy Round White Cotton-ball Tail */}
            <circle cx="98" cy="76" r="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

            {/* Tall Upright Bunny Ears (One slightly flopped for cuteness) */}
            <g>
              {/* Left Upright Ear */}
              <ellipse cx="38" cy="18" rx="8.5" ry="25" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" transform="rotate(-10 38 18)" />
              <ellipse cx="38" cy="18" rx="4.5" ry="19" fill="#FDA4AF" transform="rotate(-10 38 18)" />
              {/* Right Flopped Ear */}
              <path d="M 74 38 C 74 16 84 4 94 8 C 98 16 92 26 86 38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
              <path d="M 78 36 C 78 18 84 10 90 12 C 92 18 88 26 84 36 Z" fill="#FDA4AF" />
            </g>

            {/* Main Rounded Soft White Bunny Body */}
            <ellipse cx="60" cy="70" rx="38" ry="34" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

            {/* Fluffy Cream/White Chest Bib & Cheeks */}
            <ellipse cx="60" cy="80" rx="22" ry="18" fill="#FFFBEB" stroke="#F1F5F9" strokeWidth="1" />
            <ellipse cx="38" cy="68" rx="10" ry="8" fill="#FFFBEB" />
            <ellipse cx="82" cy="68" rx="10" ry="8" fill="#FFFBEB" />

            {/* Delicate Whiskers */}
            <g stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round">
              <line x1="22" y1="67" x2="38" y2="68" />
              <line x1="22" y1="73" x2="38" y2="71" />
              <line x1="98" y1="67" x2="82" y2="68" />
              <line x1="98" y1="73" x2="82" y2="71" />
            </g>

            {/* Eyes */}
            {renderEyes(46, 74, 56, 6.5, '#18181B', '#38BDF8')}

            {/* Pink Y-Nose & Buck Teeth */}
            <polygon points="60,67 56,62 64,62" fill="#FB7185" />
            <path d="M 56 68 Q 60 72 64 68" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Cute Front Teeth */}
            <rect x="58" y="70" width="4" height="3.5" rx="1" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />

            {/* Rosy Cheeks */}
            <ellipse cx="36" cy="68" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.85" />
            <ellipse cx="84" cy="68" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.85" />

            {/* Soft Bunny Paws with Soft Pink Pads */}
            <ellipse cx="44" cy="96" rx="9" ry="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="44" cy="96" r="2.5" fill="#FDA4AF" />
            <ellipse cx="76" cy="96" rx="9" ry="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="76" cy="96" r="2.5" fill="#FDA4AF" />
          </g>
        );

      // 7. VOSSIE FOX (Red Fox / Vos)
      case 'vossie-fox':
        return (
          <g id="pet-vossie-fox">
            {/* Huge Bushy Fox Tail with White Tip */}
            <path d="M 86 78 C 114 74 126 50 112 36 C 98 44 94 62 84 72 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            <path d="M 112 36 C 118 42 116 48 108 52 C 104 46 106 40 112 36 Z" fill="#FFFFFF" />

            {/* Pointed Fox Ears with Black Tips & White Inner Fur */}
            <polygon points="24,46 38,12 56,38" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            <polygon points="34,22 38,12 44,22" fill="#18181B" />
            <polygon points="32,42 38,22 48,38" fill="#FFFFFF" />

            <polygon points="96,46 82,12 64,38" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            <polygon points="86,22 82,12 76,22" fill="#18181B" />
            <polygon points="88,42 82,22 72,38" fill="#FFFFFF" />

            {/* Main Russet Fox Body */}
            <ellipse cx="60" cy="70" rx="38" ry="34" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />

            {/* Classic Fox White Mask (Cheeks, Muzzle & Neck Ruff) */}
            <path d="M 60 62 C 40 54 28 66 32 80 C 40 94 60 96 60 96 C 60 96 80 94 88 80 C 92 66 80 54 60 62 Z" fill="#FFF7ED" stroke="#C2410C" strokeWidth="1.5" />

            {/* Sly Almond Eyes with Eyeliner */}
            {renderEyes(46, 74, 56, 6.5, '#18181B', '#F59E0B')}

            {/* Black Fox Snout */}
            <ellipse cx="60" cy="65" rx="5" ry="3.5" fill="#18181B" />
            <path d="M 55 69 Q 60 73 65 69" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Cheeks */}
            <ellipse cx="36" cy="72" rx="4.5" ry="3" fill="#FCA5A5" opacity="0.8" />
            <ellipse cx="84" cy="72" rx="4.5" ry="3" fill="#FCA5A5" opacity="0.8" />

            {/* Black Paws */}
            <ellipse cx="43" cy="96" rx="8" ry="5.5" fill="#18181B" stroke="#09090B" strokeWidth="2" />
            <ellipse cx="77" cy="96" rx="8" ry="5.5" fill="#18181B" stroke="#09090B" strokeWidth="2" />
          </g>
        );

      // 8. DRACO DRAGON (Dragon / Vuur-Draakje)
      case 'draco-dragon':
        return (
          <g id="pet-draco-dragon">
            {/* Long Reptilian Tail with Fire Spade Tip */}
            <path d="M 28 85 Q 8 85 10 65 Q 12 50 18 52" stroke="#B91C1C" strokeWidth="6" strokeLinecap="round" fill="none" />
            <polygon points="18,44 10,54 26,54" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

            {/* Curved Golden Horns */}
            <path d="M 36 36 Q 18 14 34 10 Q 42 22 46 32 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <path d="M 84 36 Q 102 14 86 10 Q 78 22 74 32 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />

            {/* Webbed Bat Dragon Wings */}
            <g fill="#DC2626" stroke="#991B1B" strokeWidth="2.5">
              <path d="M 22 62 Q 2 40 24 48 Q 14 62 26 66 Z" />
              <path d="M 98 62 Q 118 40 96 48 Q 106 62 94 66 Z" />
            </g>

            {/* Dorsal Back Spines */}
            <polygon points="60,28 56,36 64,36" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <polygon points="60,20 57,28 63,28" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

            {/* Crimson Scaled Body */}
            <ellipse cx="60" cy="70" rx="38" ry="34" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />

            {/* Segmented Golden Armor Underbelly */}
            <path d="M 44 64 Q 60 62 76 64 C 78 84 72 96 60 96 C 48 96 42 84 44 64 Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
            <line x1="45" y1="72" x2="75" y2="72" stroke="#CA8A04" strokeWidth="1.8" />
            <line x1="47" y1="80" x2="73" y2="80" stroke="#CA8A04" strokeWidth="1.8" />
            <line x1="51" y1="88" x2="69" y2="88" stroke="#CA8A04" strokeWidth="1.8" />

            {/* Eyes */}
            {renderEyes(46, 74, 56, 6.5, '#18181B', '#F59E0B')}

            {/* Dragon Snout with Smoke Sparks */}
            <ellipse cx="60" cy="65" rx="5" ry="3" fill="#991B1B" />
            <circle cx="58" cy="65" r="1" fill="#FDE047" />
            <circle cx="62" cy="65" r="1" fill="#FDE047" />

            {/* Claws */}
            <ellipse cx="42" cy="96" rx="8" ry="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <ellipse cx="78" cy="96" rx="8" ry="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          </g>
        );

      // 9. COCO PARROT (Parrot / Scarlet Macaw / Papegaai)
      case 'coco-parrot':
        return (
          <g id="pet-coco-parrot">
            {/* Wooden Perch */}
            <path d="M 16 104 Q 60 100 104 104" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />

            {/* Long Streaming Macaw Tail Feathers */}
            <path d="M 54 88 Q 50 114 56 120 Q 64 114 60 88" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
            <path d="M 60 88 Q 62 116 66 120 Q 70 114 66 88" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />

            {/* Colorful Layered Wings (Red -> Yellow -> Blue) */}
            <g>
              {/* Left Wing */}
              <path d="M 26 56 Q 8 72 20 90 Q 32 82 28 60 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
              <path d="M 22 66 Q 12 78 22 88" fill="#FACC15" />
              <path d="M 20 76 Q 14 84 22 88" fill="#2563EB" />
              {/* Right Wing */}
              <path d="M 94 56 Q 112 72 100 90 Q 88 82 92 60 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
              <path d="M 98 66 Q 108 78 98 88" fill="#FACC15" />
              <path d="M 100 76 Q 106 84 98 88" fill="#2563EB" />
            </g>

            {/* Red Feathered Head Crest Tuft */}
            <path d="M 52 36 Q 48 16 58 24 Q 62 14 68 26 Q 74 16 70 36 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <polygon points="56,36 60,20 64,36" fill="#EF4444" />

            {/* Main Scarlet Macaw Body */}
            <ellipse cx="60" cy="68" rx="36" ry="32" fill="#EF4444" stroke="#DC2626" strokeWidth="3" />

            {/* White Bare-Skin Eye Patches with Feather Lines */}
            <ellipse cx="44" cy="56" rx="12" ry="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
            <ellipse cx="76" cy="56" rx="12" ry="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
            <path d="M 38 52 Q 44 54 48 52" stroke="#9CA3AF" strokeWidth="0.8" fill="none" />
            <path d="M 72 52 Q 76 54 82 52" stroke="#9CA3AF" strokeWidth="0.8" fill="none" />

            {/* Yellow Belly Patch */}
            <ellipse cx="60" cy="80" rx="20" ry="15" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />

            {/* Eyes */}
            {renderEyes(44, 76, 56, 6, '#18181B', '#F59E0B')}

            {/* Large Hooked Ivory & Dark Parrot Beak */}
            <path d="M 52 56 Q 60 52 68 56 Q 68 68 60 76 Q 52 68 52 56 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.8" />
            <path d="M 56 68 Q 60 76 64 68 Z" fill="#1F2937" />

            {/* Rosy Cheeks */}
            <ellipse cx="34" cy="66" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="86" cy="66" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.8" />

            {/* Bird Talons Perched */}
            <g fill="#475569" stroke="#1E293B" strokeWidth="1.5">
              <ellipse cx="46" cy="100" rx="3.5" ry="5" />
              <ellipse cx="52" cy="100" rx="3.5" ry="5" />
              <ellipse cx="68" cy="100" rx="3.5" ry="5" />
              <ellipse cx="74" cy="100" rx="3.5" ry="5" />
            </g>
          </g>
        );

      // 10. LEO LION (Lion / Leeuwenwelp)
      case 'leo-lion':
        return (
          <g id="pet-leo-lion">
            {/* Long Lion Tail with Bushy Dark Tuft */}
            <motion.g
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '94px 78px' }}
            >
              <path d="M 94 78 Q 116 74 114 52" stroke="#D97706" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="114" cy="48" r="8" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
            </motion.g>

            {/* Glorious Fluffy Lion Mane circling Head */}
            <g fill="#B45309" stroke="#78350F" strokeWidth="2">
              <circle cx="34" cy="36" r="13" />
              <circle cx="60" cy="28" r="14" />
              <circle cx="86" cy="36" r="13" />
              <circle cx="24" cy="56" r="13" />
              <circle cx="96" cy="56" r="13" />
              <circle cx="26" cy="74" r="12" />
              <circle cx="94" cy="74" r="12" />
              <circle cx="38" cy="88" r="11" />
              <circle cx="82" cy="88" r="11" />
            </g>

            {/* Rounded Lion Ears */}
            <circle cx="34" cy="38" r="11" fill="#D97706" stroke="#78350F" strokeWidth="2" />
            <circle cx="34" cy="38" r="6" fill="#FEF3C7" />
            <circle cx="86" cy="38" r="11" fill="#D97706" stroke="#78350F" strokeWidth="2" />
            <circle cx="86" cy="38" r="6" fill="#FEF3C7" />

            {/* Main Golden Lion Cub Body */}
            <ellipse cx="60" cy="68" rx="36" ry="32" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />

            {/* Cream Muzzle */}
            <ellipse cx="60" cy="72" rx="18" ry="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />

            {/* Whisker Freckles */}
            <g fill="#78350F">
              <circle cx="48" cy="71" r="1.2" />
              <circle cx="51" cy="74" r="1.2" />
              <circle cx="47" cy="76" r="1.2" />
              <circle cx="72" cy="71" r="1.2" />
              <circle cx="69" cy="74" r="1.2" />
              <circle cx="73" cy="76" r="1.2" />
            </g>

            {/* Eyes */}
            {renderEyes(46, 74, 56, 6.5, '#18181B', '#D97706')}

            {/* Pinkish-Brown Lion Nose & Mouth */}
            <polygon points="60,67 54,61 66,61" fill="#92400E" />
            <path d="M 54 71 Q 60 76 66 71" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Rosy Cheeks */}
            <ellipse cx="36" cy="68" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.8" />
            <ellipse cx="84" cy="68" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.8" />

            {/* Big Lion Paws */}
            <ellipse cx="42" cy="96" rx="9" ry="6.5" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
            <ellipse cx="78" cy="96" rx="9" ry="6.5" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
          </g>
        );

      // 11. ELLA ELEPHANT (Elephant / Olifantje)
      case 'ella-elephant':
      default:
        return (
          <g id="pet-ella-elephant">
            {/* Giant Fan-Shaped Elephant Ears */}
            <g>
              <ellipse cx="22" cy="54" rx="18" ry="24" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" transform="rotate(-8 22 54)" />
              <ellipse cx="22" cy="54" rx="11" ry="16" fill="#FDA4AF" opacity="0.8" transform="rotate(-8 22 54)" />
              <ellipse cx="98" cy="54" rx="18" ry="24" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" transform="rotate(8 98 54)" />
              <ellipse cx="98" cy="54" rx="11" ry="16" fill="#FDA4AF" opacity="0.8" transform="rotate(8 98 54)" />
            </g>

            {/* Soft Safari Slate Body */}
            <ellipse cx="60" cy="70" rx="38" ry="34" fill="#94A3B8" stroke="#475569" strokeWidth="3" />

            {/* Soft Light Blue/Grey Belly */}
            <ellipse cx="60" cy="80" rx="22" ry="16" fill="#E2E8F0" />

            {/* Head Wrinkle Lines */}
            <path d="M 52 42 Q 60 40 68 42" stroke="#64748B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 54 46 Q 60 44 66 46" stroke="#64748B" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Eyes */}
            {renderEyes(46, 74, 55, 6.5, '#18181B')}

            {/* Curved Ivory Tusks */}
            <path d="M 44 68 Q 36 78 40 84 Q 48 80 46 68 Z" fill="#FFFBEB" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M 76 68 Q 84 78 80 84 Q 72 80 74 68 Z" fill="#FFFBEB" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Long Curved Elephant Trunk reaching down and up at tip */}
            <motion.path
              d="M 54 58 Q 50 78 60 84 Q 72 86 70 76 Q 64 74 60 76 Q 58 72 62 58 Z"
              fill="#94A3B8"
              stroke="#475569"
              strokeWidth="2.5"
              animate={
                actionState === 'happy'
                  ? { rotate: [-5, 8, -5], y: [-2, 4, -2] }
                  : { rotate: [-1, 2, -1] }
              }
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '58px 58px' }}
            />

            {/* Water Drops / Sparkles from Trunk if Happy */}
            {actionState === 'happy' && (
              <g fill="#38BDF8">
                <circle cx="74" cy="70" r="2" />
                <circle cx="78" cy="64" r="1.5" />
                <circle cx="84" cy="62" r="1.2" />
              </g>
            )}

            {/* Rosy Cheeks */}
            <ellipse cx="36" cy="65" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.85" />
            <ellipse cx="84" cy="65" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.85" />

            {/* Sturdy Columnar Elephant Feet with 3 Toenails */}
            <g fill="#94A3B8" stroke="#475569" strokeWidth="2">
              <rect x="34" y="88" width="16" height="12" rx="4" />
              <rect x="70" y="88" width="16" height="12" rx="4" />
            </g>
            <g fill="#FFFFFF">
              <circle cx="38" cy="98" r="1.5" />
              <circle cx="42" cy="98" r="1.5" />
              <circle cx="46" cy="98" r="1.5" />
              <circle cx="74" cy="98" r="1.5" />
              <circle cx="78" cy="98" r="1.5" />
              <circle cx="82" cy="98" r="1.5" />
            </g>
          </g>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
    >
      {/* High Level Glowing Aura */}
      {showAura && companion.level >= 3 && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: `${size * 0.95}px`,
            height: `${size * 0.95}px`,
            background: 'radial-gradient(circle, #F59E0B66 0%, transparent 70%)'
          }}
          className="absolute rounded-full pointer-events-none filter blur-md z-0"
        />
      )}

      {/* Dynamic Ground Shadow */}
      <motion.div
        animate={
          actionState === 'playing' || actionState === 'happy' || actionState === 'dancing' || actionState === 'bubble_pop'
            ? { scale: [1, 0.65, 1], opacity: [0.4, 0.15, 0.4] }
            : { scale: [1, 0.92, 1], opacity: [0.35, 0.28, 0.35] }
        }
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: `${size * 0.8}px`,
          height: `${size * 0.22}px`,
          bottom: `${size * 0.04}px`
        }}
        className="absolute bg-slate-950/40 rounded-full filter blur-[3px] pointer-events-none z-0"
      />

      {/* Floating Bubbles if Bathing */}
      {actionState === 'bathing' && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <motion.div
            animate={{ y: [0, -35], opacity: [0, 1, 0], scale: [0.8, 1.4], x: [-5, 5] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.1 }}
            className="absolute top-1 left-2 text-2xl"
          >
            🫧
          </motion.div>
          <motion.div
            animate={{ y: [0, -40], opacity: [0, 1, 0], scale: [0.7, 1.3], x: [5, -5] }}
            transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 0.3 }}
            className="absolute top-3 right-2 text-xl"
          >
            🧼
          </motion.div>
          <motion.div
            animate={{ y: [0, -25], opacity: [0, 1, 0], scale: [0.6, 1.1] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute bottom-6 left-4 text-lg"
          >
            🫧
          </motion.div>
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [-8, 8, -8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-0 right-8 text-xl"
          >
            🦆
          </motion.div>
        </div>
      )}

      {/* Floating Zzz if Sleeping */}
      {actionState === 'sleeping' && (
        <div className="absolute top-0 right-1 pointer-events-none z-40">
          <motion.div
            animate={{ y: [0, -30], x: [0, 14], opacity: [0, 1, 0], scale: [0.7, 1.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="text-lg font-black text-indigo-400 drop-shadow-md"
          >
            💤
          </motion.div>
          <motion.div
            animate={{ y: [0, -25], x: [0, -8], opacity: [0, 1, 0], scale: [0.5, 1.1] }}
            transition={{ duration: 2.0, repeat: Infinity, delay: 0.8 }}
            className="text-sm font-black text-purple-300 drop-shadow-md"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* Music Notes if Dancing */}
      {actionState === 'dancing' && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <motion.div
            animate={{ y: [0, -35], x: [-8, 12], opacity: [0, 1, 0], scale: [0.8, 1.3] }}
            transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 0.1 }}
            className="absolute top-0 left-1 text-xl"
          >
            🎵
          </motion.div>
          <motion.div
            animate={{ y: [0, -35], x: [8, -12], opacity: [0, 1, 0], scale: [0.8, 1.3] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.25 }}
            className="absolute top-2 right-1 text-xl"
          >
            🎶
          </motion.div>
          <motion.div
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg"
          >
            ⭐
          </motion.div>
        </div>
      )}

      {/* Vet Hospital Scan effect */}
      {actionState === 'vet_exam' && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.0, repeat: Infinity }}
            className="absolute inset-0 border-2 border-dashed border-emerald-400 rounded-3xl"
          />
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400"
          />
          <span className="absolute -top-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
            🩺 Gezondheidsscan 100%
          </span>
        </div>
      )}

      {/* Floating Sparkles & Treats if Eating */}
      {actionState === 'eating' && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <motion.div
            animate={{ scale: [0.6, 1.3, 0], y: [0, 14], x: [-6, 6] }}
            transition={{ duration: 0.45, repeat: Infinity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ scale: [0, 1.2, 0], y: [-10, -25] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute top-2 right-4 text-xs"
          >
            😋
          </motion.div>
        </div>
      )}

      {/* Main Animated Character Body */}
      <motion.div
        {...getBodyMotionProps()}
        style={{ width: `${size * 0.88}px`, height: `${size * 0.88}px` }}
        className="relative flex items-center justify-center z-10"
      >
        {/* Hat Accessory */}
        {hatElement()}

        {/* Scalable SVG Pet Rig */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-xl overflow-visible"
        >
          {renderPetGraphics()}
        </svg>

        {/* Level Badge Overlay */}
        <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-white shadow-md pointer-events-none">
          <span>Lv.{companion.level}</span>
          <span>{companion.emoji}</span>
        </div>
      </motion.div>
    </div>
  );
};
