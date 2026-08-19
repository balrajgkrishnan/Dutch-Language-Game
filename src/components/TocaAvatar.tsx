import React from 'react';
import { TocaCustomization } from '../data/tocaAvatarData';

interface TocaAvatarProps {
  customization?: Partial<TocaCustomization>;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export const TocaAvatar: React.FC<TocaAvatarProps> = ({
  customization,
  size = 96,
  className = '',
  animate = true
}) => {
  // Defaults
  const skin = customization?.skinTone || '#F1BE9B';
  const hairColor = customization?.hairColor || '#2B1B17';
  const hairStyle = customization?.hairStyle || 'space_buns';
  const outfit = customization?.outfit || 'safari_cargo';
  const eyes = customization?.eyes || 'sparkle';
  const mouth = customization?.mouth || 'smile';
  const faceSticker = customization?.faceSticker || 'freckles';
  const headwear = customization?.headwear || 'none';
  const glasses = customization?.glasses || 'none';
  const handheld = customization?.handheld || 'none';

  const dim = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dim, height: dim }}
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full drop-shadow-md overflow-visible ${animate ? 'transition-all duration-300 transform' : ''}`}
      >
        <defs>
          <radialGradient id="blushGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="lensGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="goldBead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* 1. BACK HAIR */}
        {hairStyle === 'space_buns' && (
          <g id="back-hair-space-buns">
            {/* Left Bun */}
            <circle cx="50" cy="56" r="28" fill={hairColor} />
            <circle cx="48" cy="54" r="23" fill={hairColor} opacity="0.9" />
            {/* Right Bun */}
            <circle cx="150" cy="56" r="28" fill={hairColor} />
            <circle cx="152" cy="54" r="23" fill={hairColor} opacity="0.9" />
            {/* Bun Hair ties */}
            <ellipse cx="64" cy="72" rx="7" ry="5" fill="#FF70A6" transform="rotate(-20 64 72)" />
            <ellipse cx="136" cy="72" rx="7" ry="5" fill="#FF70A6" transform="rotate(20 136 72)" />
          </g>
        )}

        {hairStyle === 'box_braids' && (
          <g id="back-hair-braids">
            {/* Long Braids Falling Behind */}
            <path d="M45,90 Q30,130 35,185 Q45,190 55,185 Q45,130 60,90 Z" fill={hairColor} />
            <path d="M155,90 Q170,130 165,185 Q155,190 145,185 Q155,130 140,90 Z" fill={hairColor} />
            {/* Gold beads at tips */}
            <rect x="34" y="172" width="14" height="8" rx="3" fill="url(#goldBead)" />
            <rect x="152" y="172" width="14" height="8" rx="3" fill="url(#goldBead)" />
          </g>
        )}

        {hairStyle === 'wolf_cut' && (
          <g id="back-hair-wolf">
            <path d="M40,80 Q25,120 30,165 Q45,170 60,150 Q48,110 65,80 Z" fill={hairColor} />
            <path d="M160,80 Q175,120 170,165 Q155,170 140,150 Q152,110 135,80 Z" fill={hairColor} />
          </g>
        )}

        {hairStyle === 'high_ponytail' && (
          <g id="back-hair-pony">
            <ellipse cx="148" cy="50" rx="20" ry="14" fill="#10B981" />
            <path d="M145,55 Q185,85 180,160 Q168,165 155,140 Q165,95 135,65 Z" fill={hairColor} />
          </g>
        )}

        {hairStyle === 'messy_bun' && (
          <g id="back-hair-messy-bun">
            <circle cx="100" cy="40" r="26" fill={hairColor} />
            <circle cx="112" cy="36" r="14" fill={hairColor} opacity="0.9" />
            <circle cx="88" cy="38" r="16" fill={hairColor} opacity="0.9" />
          </g>
        )}

        {/* 2. BODY & OUTFIT */}
        <g id="body-and-outfit">
          {/* Neck */}
          <rect x="86" y="128" width="28" height="24" rx="6" fill={skin} />
          
          {/* Base Shoulders */}
          <path d="M42,150 Q100,140 158,150 L168,200 L32,200 Z" fill="#E2E8F0" />

          {/* OUTFIT VARIATIONS */}
          {outfit === 'safari_cargo' && (
            <g id="outfit-safari-cargo">
              {/* Inner White Crop Tank */}
              <path d="M78,142 L122,142 L124,168 L76,168 Z" fill="#FFFFFF" />
              {/* Khaki Vest */}
              <path d="M42,150 Q75,145 82,145 L78,200 L32,200 Z" fill="#C2A676" />
              <path d="M158,150 Q125,145 118,145 L122,200 L168,200 Z" fill="#C2A676" />
              {/* Neon Orange Utility Straps */}
              <rect x="74" y="148" width="8" height="52" fill="#F97316" />
              <rect x="118" y="148" width="8" height="52" fill="#F97316" />
              {/* Cargo Pockets */}
              <rect x="42" y="166" width="28" height="24" rx="4" fill="#A88B58" stroke="#8A6E3B" strokeWidth="1.5" />
              <rect x="130" y="166" width="28" height="24" rx="4" fill="#A88B58" stroke="#8A6E3B" strokeWidth="1.5" />
              {/* Explorer Badge Pin */}
              <circle cx="56" cy="156" r="5" fill="#10B981" />
              <text x="56" y="159" fontSize="6" textAnchor="middle" fill="#FFFFFF" fontWeight="900">★</text>
            </g>
          )}

          {outfit === 'vet_scrubs' && (
            <g id="outfit-vet-scrubs">
              {/* Mint Green Scrub Shirt */}
              <path d="M38,150 L162,150 L168,200 L32,200 Z" fill="#10B981" />
              {/* V-Neck Collar */}
              <polygon points="84,142 116,142 100,165" fill={skin} />
              <path d="M84,142 L100,165 L116,142" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
              {/* Scrub Pocket with Paw Embroidery */}
              <rect x="50" y="165" width="26" height="25" rx="3" fill="#059669" />
              <circle cx="63" cy="178" r="4" fill="#A7F3D0" />
              <circle cx="58" cy="172" r="1.8" fill="#A7F3D0" />
              <circle cx="63" cy="170" r="1.8" fill="#A7F3D0" />
              <circle cx="68" cy="172" r="1.8" fill="#A7F3D0" />
              {/* Stethoscope around neck */}
              <path d="M78,145 Q64,165 72,185 Q80,195 90,190" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M122,145 Q136,165 128,185 Q120,195 110,190" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="100" cy="192" r="6" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            </g>
          )}

          {outfit === 'skater_hoodie' && (
            <g id="outfit-skater-hoodie">
              {/* Mint Oversized Hoodie */}
              <path d="M36,148 Q100,138 164,148 L170,200 L30,200 Z" fill="#0F172A" />
              {/* Hood Collar Wings */}
              <path d="M72,145 Q100,168 128,145 Q100,158 72,145 Z" fill="#334155" />
              {/* Cute Mint Dinosaur Silhouette / Graphic */}
              <circle cx="100" cy="178" r="14" fill="#10B981" />
              <path d="M93,178 Q96,172 102,172 Q107,175 106,182 Q100,186 93,178 Z" fill="#0F172A" />
              {/* White Drawstrings */}
              <line x1="90" y1="156" x2="88" y2="182" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="156" x2="112" y2="182" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="88" cy="183" r="2" fill="#94A3B8" />
              <circle cx="112" cy="183" r="2" fill="#94A3B8" />
            </g>
          )}

          {outfit === 'techwear_jacket' && (
            <g id="outfit-techwear">
              {/* Dark Teal Windbreaker */}
              <path d="M36,148 L164,148 L170,200 L30,200 Z" fill="#0E7490" />
              {/* Neon Green Zipper */}
              <line x1="100" y1="148" x2="100" y2="200" stroke="#22D3EE" strokeWidth="3" />
              {/* Cross Belt Harness */}
              <path d="M48,150 L152,190" stroke="#1E293B" strokeWidth="6" />
              <rect x="94" y="165" width="12" height="10" rx="2" fill="#FACC15" />
              <rect x="42" y="168" width="22" height="22" rx="3" fill="#155E75" />
            </g>
          )}

          {outfit === 'denim_overalls' && (
            <g id="outfit-denim">
              {/* Striped Shirt under */}
              <path d="M38,148 L162,148 L168,200 L32,200 Z" fill="#FEF08A" />
              <line x1="38" y1="158" x2="162" y2="158" stroke="#F43F5E" strokeWidth="3" />
              <line x1="38" y1="172" x2="162" y2="172" stroke="#3B82F6" strokeWidth="3" />
              <line x1="38" y1="186" x2="162" y2="186" stroke="#10B981" strokeWidth="3" />
              {/* Blue Denim Overalls */}
              <path d="M68,162 L132,162 L136,200 L64,200 Z" fill="#2563EB" />
              {/* Dungaree Straps */}
              <rect x="68" y="146" width="10" height="26" fill="#1D4ED8" />
              <rect x="122" y="146" width="10" height="26" fill="#1D4ED8" />
              {/* Metal Clasps */}
              <circle cx="73" cy="165" r="3" fill="#E2E8F0" />
              <circle cx="127" cy="165" r="3" fill="#E2E8F0" />
              {/* Center Pocket */}
              <rect x="85" y="172" width="30" height="20" rx="3" fill="#1E40AF" />
            </g>
          )}

          {outfit === 'gamer_sweater' && (
            <g id="outfit-gamer">
              {/* Cozy Purple Chunky Sweater */}
              <path d="M34,148 Q100,136 166,148 L172,200 L28,200 Z" fill="#7C3AED" />
              {/* Soft Ribbed Collar */}
              <path d="M78,145 Q100,158 122,145 Q100,152 78,145 Z" fill="#6D28D9" />
              {/* Pixel Heart Center */}
              <path d="M94,170 A4,4 0 0,1 100,174 A4,4 0 0,1 106,170 Q112,176 100,186 Q88,176 94,170 Z" fill="#F43F5E" />
            </g>
          )}
        </g>

        {/* 3. HEAD & FACE */}
        <g id="head-base">
          {/* Cute Soft Toca Head Shape */}
          <rect x="52" y="44" width="96" height="92" rx="46" fill={skin} />

          {/* Cute Ears */}
          <circle cx="48" cy="92" r="11" fill={skin} />
          <circle cx="48" cy="92" r="6" fill="#000000" opacity="0.08" />
          {/* Cool Ear Piercing Stud */}
          <circle cx="42" cy="92" r="2.5" fill="#FDE047" />

          <circle cx="152" cy="92" r="11" fill={skin} />
          <circle cx="152" cy="92" r="6" fill="#000000" opacity="0.08" />

          {/* Rosy Glowing Cheeks */}
          <ellipse cx="68" cy="100" rx="13" ry="8" fill="url(#blushGlow)" />
          <ellipse cx="132" cy="100" rx="13" ry="8" fill="url(#blushGlow)" />

          {/* Face Stickers / Freckles */}
          {faceSticker === 'freckles' && (
            <g id="freckles" fill="#8B4513" opacity="0.6">
              <circle cx="68" cy="96" r="1.5" />
              <circle cx="73" cy="99" r="1.2" />
              <circle cx="64" cy="101" r="1.3" />
              <circle cx="132" cy="96" r="1.5" />
              <circle cx="127" cy="99" r="1.2" />
              <circle cx="136" cy="101" r="1.3" />
            </g>
          )}

          {faceSticker === 'star_stickers' && (
            <g id="star-stickers">
              <text x="68" y="103" fontSize="11" textAnchor="middle" fill="#FACC15">⭐</text>
              <text x="132" y="103" fontSize="11" textAnchor="middle" fill="#F472B6">💖</text>
            </g>
          )}

          {faceSticker === 'paw_tattoo' && (
            <g id="paw-tattoo">
              <circle cx="68" cy="100" r="3.5" fill="#0EA5E9" opacity="0.8" />
              <circle cx="64" cy="95" r="1.5" fill="#0EA5E9" opacity="0.8" />
              <circle cx="68" cy="93" r="1.5" fill="#0EA5E9" opacity="0.8" />
              <circle cx="72" cy="95" r="1.5" fill="#0EA5E9" opacity="0.8" />
            </g>
          )}

          {/* EXPRESSIVE EYES */}
          {eyes === 'sparkle' && (
            <g id="eyes-sparkle">
              {/* Left Eye */}
              <ellipse cx="76" cy="86" rx="9" ry="12" fill="#1E293B" />
              <ellipse cx="74" cy="82" rx="4" ry="5.5" fill="#FFFFFF" />
              <circle cx="79" cy="92" r="2.2" fill="#FFFFFF" />
              {/* Eyelash */}
              <path d="M66,80 Q74,74 86,79" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="124" cy="86" rx="9" ry="12" fill="#1E293B" />
              <ellipse cx="122" cy="82" rx="4" ry="5.5" fill="#FFFFFF" />
              <circle cx="127" cy="92" r="2.2" fill="#FFFFFF" />
              {/* Eyelash */}
              <path d="M114,79 Q126,74 134,80" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {eyes === 'chill' && (
            <g id="eyes-chill">
              {/* Left Eye */}
              <ellipse cx="76" cy="87" rx="8" ry="8" fill="#1E293B" />
              <circle cx="74" cy="85" r="3" fill="#FFFFFF" />
              <path d="M66,83 Q76,80 86,84" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              {/* Right Wink */}
              <path d="M114,88 Q124,80 134,88" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
              <text x="136" y="82" fontSize="9" fill="#FACC15">✨</text>
            </g>
          )}

          {eyes === 'wink' && (
            <g id="eyes-wink">
              {/* Left Eye Sparkle */}
              <ellipse cx="76" cy="86" rx="9" ry="11" fill="#1E293B" />
              <ellipse cx="74" cy="83" rx="4" ry="5" fill="#FFFFFF" />
              <circle cx="78" cy="91" r="2" fill="#FFFFFF" />
              {/* Right Wink */}
              <path d="M114,88 Q124,78 134,88" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {eyes === 'excited' && (
            <g id="eyes-excited">
              {/* Big Star Eyes */}
              <circle cx="76" cy="86" r="10" fill="#1E293B" />
              <circle cx="124" cy="86" r="10" fill="#1E293B" />
              <text x="76" y="90" fontSize="13" textAnchor="middle" fill="#FDE047">⭐</text>
              <text x="124" y="90" fontSize="13" textAnchor="middle" fill="#FDE047">⭐</text>
            </g>
          )}

          {/* EXPRESSIVE MOUTH */}
          {mouth === 'smile' && (
            <path d="M91,108 Q100,118 109,108" fill="none" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          )}

          {mouth === 'grin' && (
            <path d="M88,106 Q100,122 112,106 Z" fill="#E11D48" stroke="#991B1B" strokeWidth="2" />
          )}

          {mouth === 'bubblegum' && (
            <g id="bubblegum">
              <circle cx="104" cy="112" r="12" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
              <ellipse cx="101" cy="108" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.8" />
            </g>
          )}

          {mouth === 'open_happy' && (
            <path d="M89,106 Q100,124 111,106 Z" fill="#991B1B" />
          )}
        </g>

        {/* 4. FRONT HAIR & BANGS */}
        <g id="front-hair">
          {hairStyle === 'space_buns' && (
            <g id="front-hair-space-buns">
              {/* Bangs across forehead */}
              <path d="M52,66 Q76,92 100,68 Q124,92 148,66 Q150,42 100,42 Q50,42 52,66 Z" fill={hairColor} />
              {/* Side strands framing face */}
              <path d="M52,70 Q46,105 52,120 Q57,110 58,85 Z" fill={hairColor} />
              <path d="M148,70 Q154,105 148,120 Q143,110 142,85 Z" fill={hairColor} />
              {/* Cute Pastel Hair Clips */}
              <rect x="58" y="66" width="10" height="4" rx="2" fill="#FACC15" transform="rotate(-15 58 66)" />
              <rect x="132" y="66" width="10" height="4" rx="2" fill="#38BDF8" transform="rotate(15 132 66)" />
            </g>
          )}

          {hairStyle === 'cool_bob' && (
            <g id="front-hair-cool-bob">
              {/* Clean Bob with Blunt Bangs */}
              <path d="M48,60 Q100,38 152,60 L158,118 Q146,126 142,100 L140,78 Q100,88 60,78 L58,100 Q54,126 42,118 Z" fill={hairColor} />
              {/* Sleek Hairpins */}
              <rect x="54" y="74" width="12" height="3.5" rx="1.5" fill="#EC4899" />
              <rect x="54" y="80" width="12" height="3.5" rx="1.5" fill="#FACC15" />
            </g>
          )}

          {hairStyle === 'wolf_cut' && (
            <g id="front-hair-wolf">
              {/* Choppy Shag Fringe */}
              <path d="M48,62 Q70,95 86,72 Q100,98 114,72 Q130,95 152,62 Q150,40 100,40 Q50,40 48,62 Z" fill={hairColor} />
              <path d="M48,70 Q38,105 46,130 Q54,115 56,85 Z" fill={hairColor} />
              <path d="M152,70 Q162,105 154,130 Q146,115 144,85 Z" fill={hairColor} />
            </g>
          )}

          {hairStyle === 'box_braids' && (
            <g id="front-hair-braids">
              {/* Center Parting Braided Front */}
              <path d="M52,62 Q100,42 148,62 Q130,86 100,64 Q70,86 52,62 Z" fill={hairColor} />
              {/* Golden Hair Cuffs on forehead edges */}
              <rect x="68" y="60" width="6" height="5" rx="1" fill="url(#goldBead)" />
              <rect x="126" y="60" width="6" height="5" rx="1" fill="url(#goldBead)" />
            </g>
          )}

          {hairStyle === 'high_ponytail' && (
            <g id="front-hair-pony">
              {/* Swept Fringe */}
              <path d="M50,60 Q90,92 140,62 Q150,42 100,42 Q50,42 50,60 Z" fill={hairColor} />
              <path d="M50,68 Q44,98 50,118 Q55,105 56,80 Z" fill={hairColor} />
            </g>
          )}

          {hairStyle === 'messy_bun' && (
            <g id="front-hair-messy-bun">
              {/* Curtain Bangs */}
              <path d="M50,62 Q80,88 95,66 Q100,66 105,66 Q120,88 150,62 Q148,42 100,42 Q52,42 50,62 Z" fill={hairColor} />
              <path d="M48,72 Q42,102 48,118 Q54,102 54,82 Z" fill={hairColor} />
              <path d="M152,72 Q158,102 152,118 Q146,102 146,82 Z" fill={hairColor} />
            </g>
          )}

          {hairStyle === 'short_curls' && (
            <g id="front-hair-curls">
              <circle cx="58" cy="54" r="16" fill={hairColor} />
              <circle cx="82" cy="46" r="18" fill={hairColor} />
              <circle cx="118" cy="46" r="18" fill={hairColor} />
              <circle cx="142" cy="54" r="16" fill={hairColor} />
              <circle cx="70" cy="66" r="12" fill={hairColor} />
              <circle cx="130" cy="66" r="12" fill={hairColor} />
            </g>
          )}
        </g>

        {/* 5. HEADWEAR & ACCESSORIES */}
        {headwear === 'dj_headphones' && (
          <g id="acc-dj-headphones">
            {/* Arch over head */}
            <path d="M42,90 C42,25 158,25 158,90" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
            <path d="M42,90 C42,27 158,27 158,90" fill="none" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
            {/* Left Ear Cushion */}
            <rect x="34" y="74" width="16" height="32" rx="8" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" />
            {/* Right Ear Cushion */}
            <rect x="150" y="74" width="16" height="32" rx="8" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" />
          </g>
        )}

        {headwear === 'cat_ear_headset' && (
          <g id="acc-cat-ears">
            {/* Arch */}
            <path d="M44,85 C44,30 156,30 156,85" fill="none" stroke="#6D28D9" strokeWidth="6" />
            {/* Glowing Left Cat Ear */}
            <polygon points="56,48 74,18 90,44" fill="#A855F7" stroke="#6D28D9" strokeWidth="2" />
            <polygon points="63,44 74,25 84,42" fill="#F472B6" />
            {/* Glowing Right Cat Ear */}
            <polygon points="110,44 126,18 144,48" fill="#A855F7" stroke="#6D28D9" strokeWidth="2" />
            <polygon points="116,42 126,25 137,44" fill="#F472B6" />
            {/* Ear Cushions */}
            <rect x="36" y="76" width="14" height="28" rx="7" fill="#A855F7" />
            <rect x="150" y="76" width="14" height="28" rx="7" fill="#A855F7" />
          </g>
        )}

        {headwear === 'bucket_hat' && (
          <g id="acc-bucket-hat">
            {/* Crown of bucket hat */}
            <path d="M58,54 L66,22 L134,22 L142,54 Z" fill="#0D9488" stroke="#115E59" strokeWidth="2" />
            {/* Slanted Brim */}
            <ellipse cx="100" cy="54" rx="58" ry="14" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
            {/* Safari Leaf Badge */}
            <circle cx="100" cy="38" r="8" fill="#FACC15" />
            <text x="100" y="42" fontSize="9" textAnchor="middle" fill="#000000">🌿</text>
          </g>
        )}

        {headwear === 'skater_beanie' && (
          <g id="acc-beanie">
            {/* High slouchy knit beanie */}
            <path d="M50,60 C50,15 150,15 150,60 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            {/* Folded rim */}
            <rect x="46" y="52" width="108" height="15" rx="5" fill="#FB923C" stroke="#EA580C" strokeWidth="1.5" />
            <circle cx="100" cy="60" r="4" fill="#FFFFFF" />
          </g>
        )}

        {headwear === 'cap_backward' && (
          <g id="acc-cap-backward">
            <path d="M50,56 C50,25 150,25 150,56 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            {/* Visor turned backward */}
            <ellipse cx="100" cy="34" rx="28" ry="8" fill="#1E40AF" />
          </g>
        )}

        {headwear === 'bandana' && (
          <g id="acc-bandana">
            <path d="M48,60 Q100,48 152,60 L150,70 Q100,58 50,70 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
            <polygon points="144,60 162,55 155,70" fill="#EF4444" />
          </g>
        )}

        {/* 6. GLASSES */}
        {glasses === 'round_glasses' && (
          <g id="acc-round-glasses">
            {/* Left Lens */}
            <circle cx="76" cy="86" r="14" fill="#A5F3FC" fillOpacity="0.25" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="70" y1="78" x2="80" y2="88" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Right Lens */}
            <circle cx="124" cy="86" r="14" fill="#A5F3FC" fillOpacity="0.25" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="118" y1="78" x2="128" y2="88" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bridge */}
            <path d="M90,84 Q100,80 110,84" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {glasses === 'cool_sunnies' && (
          <g id="acc-cool-sunnies">
            {/* Sleek Black Cat-Eye Sunnies */}
            <polygon points="60,80 92,84 88,96 62,94" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <polygon points="140,80 108,84 112,96 138,94" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <line x1="92" y1="84" x2="108" y2="84" stroke="#0F172A" strokeWidth="3" />
            {/* Glint on lenses */}
            <line x1="64" y1="84" x2="74" y2="92" stroke="url(#lensGlint)" strokeWidth="2" strokeLinecap="round" />
            <line x1="128" y1="84" x2="138" y2="92" stroke="url(#lensGlint)" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {glasses === 'star_shades' && (
          <g id="acc-star-shades">
            <text x="76" y="93" fontSize="22" textAnchor="middle" fill="#FACC15" opacity="0.85">⭐</text>
            <text x="124" y="93" fontSize="22" textAnchor="middle" fill="#FACC15" opacity="0.85">⭐</text>
            <line x1="88" y1="86" x2="112" y2="86" stroke="#F59E0B" strokeWidth="2" />
          </g>
        )}

        {/* 7. HANDHELD / COMPANION PROPS */}
        {handheld === 'pocket_pet' && (
          <g id="prop-pocket-kitten">
            {/* Cute Kitten peeking from right side */}
            <ellipse cx="148" cy="165" rx="14" ry="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
            {/* Kitten Ears */}
            <polygon points="138,156 142,145 148,155" fill="#F97316" />
            <polygon points="148,155 154,145 158,156" fill="#F97316" />
            {/* Kitten Face */}
            <circle cx="143" cy="164" r="1.5" fill="#000000" />
            <circle cx="153" cy="164" r="1.5" fill="#000000" />
            <polygon points="148,168 146,166 150,166" fill="#F43F5E" />
            {/* Little Paws on pouch rim */}
            <ellipse cx="142" cy="174" rx="3.5" ry="2.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
            <ellipse cx="154" cy="174" rx="3.5" ry="2.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
          </g>
        )}

        {handheld === 'vet_tablet' && (
          <g id="prop-vet-tablet">
            <rect x="132" y="148" width="30" height="42" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" transform="rotate(-10 132 148)" />
            <rect x="136" y="152" width="22" height="32" rx="2" fill="#0284C7" transform="rotate(-10 132 148)" />
            {/* Heartbeat Wave */}
            <path d="M138,168 L142,168 L144,162 L147,174 L149,168 L154,168" fill="none" stroke="#FDE047" strokeWidth="1.5" transform="rotate(-10 132 148)" />
          </g>
        )}

        {handheld === 'polaroid_camera' && (
          <g id="prop-polaroid">
            {/* Camera Strap */}
            <path d="M142,150 Q160,165 155,185" fill="none" stroke="#EA580C" strokeWidth="2.5" />
            {/* Camera Body */}
            <rect x="134" y="156" width="32" height="26" rx="4" fill="#F1F5F9" stroke="#334155" strokeWidth="1.5" />
            {/* Lens */}
            <circle cx="150" cy="169" r="8" fill="#1E293B" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="150" cy="169" r="4" fill="#0284C7" />
            <circle cx="148" cy="167" r="1.5" fill="#FFFFFF" />
            {/* Flash */}
            <rect x="138" y="160" width="5" height="4" fill="#F59E0B" />
          </g>
        )}

        {handheld === 'walkie_talkie' && (
          <g id="prop-walkie">
            {/* Antenna */}
            <line x1="152" y1="145" x2="152" y2="160" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="152" cy="144" r="2" fill="#22C55E" />
            {/* Body */}
            <rect x="140" y="158" width="22" height="34" rx="4" fill="#047857" stroke="#064E3B" strokeWidth="1.5" />
            {/* Speaker Grid */}
            <line x1="145" y1="172" x2="157" y2="172" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="145" y1="176" x2="157" y2="176" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="145" y1="180" x2="157" y2="180" stroke="#064E3B" strokeWidth="1.5" />
          </g>
        )}

        {handheld === 'skateboard' && (
          <g id="prop-skateboard">
            {/* Cool Skater Deck under left arm */}
            <rect x="22" y="145" width="18" height="48" rx="9" fill="#F43F5E" stroke="#881337" strokeWidth="2" transform="rotate(15 22 145)" />
            {/* Wheels */}
            <circle cx="25" cy="155" r="4" fill="#38BDF8" transform="rotate(15 22 145)" />
            <circle cx="37" cy="185" r="4" fill="#38BDF8" transform="rotate(15 22 145)" />
          </g>
        )}
      </svg>
    </div>
  );
};
