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
  const hairColor = customization?.hairColor || '#24140E';
  const hairStyle = customization?.hairStyle || 'space_buns';
  const outfit = customization?.outfit || 'safari_cargo';
  const eyes = customization?.eyes || 'sparkle';
  const mouth = customization?.mouth || 'smile';
  const faceSticker = customization?.faceSticker || 'freckles';
  const headwear = customization?.headwear || 'none';
  const glasses = customization?.glasses || 'none';
  const handheld = customization?.handheld || 'none';
  const aura = customization?.aura || 'none';

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
          {/* Gradients and Filters */}
          <radialGradient id="tocaBlushGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="tocaFairyBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#F472B6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="tocaLensGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="tocaGoldBead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="tocaRainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="25%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          <linearGradient id="tocaRoyalGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          <radialGradient id="tocaMagicHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="tocaCyberAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 0. AURAS & SPECIAL FX (Behind Character) */}
        {aura === 'rainbow_aura' && (
          <g id="aura-rainbow">
            <ellipse cx="100" cy="95" rx="88" ry="88" fill="url(#tocaMagicHalo)" />
            <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="url(#tocaRainbowGrad)" strokeWidth="6" opacity="0.45" strokeLinecap="round" />
          </g>
        )}

        {aura === 'sparkle_stars' && (
          <g id="aura-sparkles">
            <text x="24" y="55" fontSize="16" fill="#FACC15" className="animate-pulse">✨</text>
            <text x="168" y="50" fontSize="18" fill="#FACC15" className="animate-bounce">⭐</text>
            <text x="28" y="140" fontSize="14" fill="#FDE047">✨</text>
            <text x="165" y="130" fontSize="14" fill="#FDE047">⭐</text>
            <text x="96" y="24" fontSize="12" fill="#FBBF24">✨</text>
          </g>
        )}

        {aura === 'magical_hearts' && (
          <g id="aura-hearts">
            <text x="20" y="60" fontSize="16" fill="#F43F5E">💖</text>
            <text x="166" y="55" fontSize="18" fill="#EC4899">💕</text>
            <text x="25" y="135" fontSize="15" fill="#FB7185">💗</text>
            <text x="168" y="130" fontSize="15" fill="#F43F5E">💖</text>
          </g>
        )}

        {aura === 'safari_leaves' && (
          <g id="aura-leaves">
            <text x="20" y="55" fontSize="16" fill="#10B981">🍃</text>
            <text x="168" y="60" fontSize="18" fill="#059669">🌿</text>
            <text x="26" y="140" fontSize="15" fill="#10B981">🌱</text>
            <text x="165" y="135" fontSize="16" fill="#047857">🍃</text>
          </g>
        )}

        {aura === 'music_beats' && (
          <g id="aura-music">
            <text x="22" y="55" fontSize="16" fill="#A855F7">🎵</text>
            <text x="166" y="55" fontSize="18" fill="#EC4899">🎶</text>
            <text x="26" y="135" fontSize="15" fill="#06B6D4">🎧</text>
            <text x="166" y="130" fontSize="15" fill="#8B5CF6">🎵</text>
          </g>
        )}

        {aura === 'cyber_glow' && (
          <g id="aura-cyber">
            <ellipse cx="100" cy="95" rx="85" ry="85" fill="url(#tocaCyberAura)" />
            <circle cx="100" cy="95" r="82" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
            <text x="20" y="55" fontSize="14" fill="#06B6D4">⚡</text>
            <text x="170" y="65" fontSize="14" fill="#38BDF8">⚡</text>
          </g>
        )}

        {aura === 'firefly_lights' && (
          <g id="aura-fireflies">
            <circle cx="28" cy="55" r="5" fill="#FDE047" opacity="0.8" />
            <circle cx="28" cy="55" r="10" fill="#FEF08A" opacity="0.3" />
            <circle cx="170" cy="65" r="6" fill="#FDE047" opacity="0.8" />
            <circle cx="170" cy="65" r="12" fill="#FEF08A" opacity="0.3" />
            <circle cx="35" cy="135" r="4.5" fill="#FDE047" opacity="0.75" />
            <circle cx="164" cy="125" r="5" fill="#FDE047" opacity="0.8" />
          </g>
        )}

        {/* 1. BACK HAIR */}
        {hairStyle === 'space_buns' && (
          <g id="back-hair-space-buns">
            {/* Left Bun */}
            <circle cx="48" cy="54" r="28" fill={hairColor} />
            <circle cx="46" cy="52" r="23" fill={hairColor} opacity="0.9" />
            {/* Right Bun */}
            <circle cx="152" cy="54" r="28" fill={hairColor} />
            <circle cx="154" cy="52" r="23" fill={hairColor} opacity="0.9" />
            {/* Bun Hair ties */}
            <ellipse cx="62" cy="70" rx="7" ry="5" fill="#FF70A6" transform="rotate(-20 62 70)" />
            <ellipse cx="138" cy="70" rx="7" ry="5" fill="#FF70A6" transform="rotate(20 138 70)" />
          </g>
        )}

        {hairStyle === 'long_waves' && (
          <g id="back-hair-long-waves">
            {/* Hemali Signature Long Flowing Hair with Waves */}
            <path d="M42,75 Q20,115 28,165 Q36,190 55,185 Q45,140 60,85 Z" fill={hairColor} />
            <path d="M158,75 Q180,115 172,165 Q164,190 145,185 Q155,140 140,85 Z" fill={hairColor} />
            {/* Extra Volume behind */}
            <path d="M35,90 Q15,145 35,195 Q50,200 65,190 Q40,150 55,95 Z" fill={hairColor} opacity="0.95" />
            <path d="M165,90 Q185,145 165,195 Q150,200 135,190 Q160,150 145,95 Z" fill={hairColor} opacity="0.95" />
          </g>
        )}

        {hairStyle === 'pigtail_braids' && (
          <g id="back-hair-pigtails">
            {/* Ridheya Twin French Braids */}
            <path d="M48,80 Q25,120 30,175 Q40,185 48,175 Q42,130 58,85 Z" fill={hairColor} />
            <path d="M152,80 Q175,120 170,175 Q160,185 152,175 Q158,130 142,85 Z" fill={hairColor} />
            {/* Cute Yellow / Pink Ribbon Ties */}
            <circle cx="32" cy="168" r="6" fill="#FACC15" />
            <circle cx="168" cy="168" r="6" fill="#FACC15" />
            <circle cx="32" cy="168" r="2.5" fill="#F43F5E" />
            <circle cx="168" cy="168" r="2.5" fill="#F43F5E" />
          </g>
        )}

        {hairStyle === 'box_braids' && (
          <g id="back-hair-braids">
            <path d="M44,85 Q26,130 32,185 Q44,190 54,185 Q44,130 60,88 Z" fill={hairColor} />
            <path d="M156,85 Q174,130 168,185 Q156,190 146,185 Q156,130 140,88 Z" fill={hairColor} />
            {/* Gold beads */}
            <rect x="30" y="172" width="14" height="8" rx="3" fill="url(#tocaGoldBead)" />
            <rect x="156" y="172" width="14" height="8" rx="3" fill="url(#tocaGoldBead)" />
            <rect x="42" y="145" width="10" height="6" rx="2" fill="url(#tocaGoldBead)" />
            <rect x="148" y="145" width="10" height="6" rx="2" fill="url(#tocaGoldBead)" />
          </g>
        )}

        {hairStyle === 'wolf_cut' && (
          <g id="back-hair-wolf">
            <path d="M40,80 Q25,120 28,168 Q45,172 60,150 Q46,110 65,80 Z" fill={hairColor} />
            <path d="M160,80 Q175,120 172,168 Q155,172 140,150 Q154,110 135,80 Z" fill={hairColor} />
          </g>
        )}

        {hairStyle === 'high_ponytail' && (
          <g id="back-hair-pony">
            <ellipse cx="148" cy="48" rx="18" ry="14" fill="#06B6D4" />
            <path d="M145,52 Q188,80 182,165 Q168,170 154,142 Q166,95 135,62 Z" fill={hairColor} />
          </g>
        )}

        {hairStyle === 'fairy_twin_tails' && (
          <g id="back-hair-fairy-tails">
            <path d="M42,70 Q10,120 20,185 Q35,190 48,175 Q32,130 55,75 Z" fill={hairColor} />
            <path d="M158,70 Q190,120 180,185 Q165,190 152,175 Q168,130 145,75 Z" fill={hairColor} />
            {/* Magical Stars on Tails */}
            <circle cx="28" cy="115" r="5" fill="#FDE047" />
            <circle cx="172" cy="115" r="5" fill="#FDE047" />
          </g>
        )}

        {hairStyle === 'messy_bun' && (
          <g id="back-hair-messy-bun">
            <circle cx="100" cy="38" r="28" fill={hairColor} />
            <circle cx="114" cy="34" r="16" fill={hairColor} opacity="0.9" />
            <circle cx="86" cy="36" r="17" fill={hairColor} opacity="0.9" />
          </g>
        )}

        {/* 2. BODY & OUTFIT */}
        <g id="body-and-outfit">
          {/* Neck */}
          <rect x="86" y="128" width="28" height="24" rx="6" fill={skin} />
          
          {/* Base Shoulders */}
          <path d="M42,150 Q100,140 158,150 L168,200 L32,200 Z" fill="#E2E8F0" />

          {/* OUTFIT: Rainforest Explorer (Ridheya) */}
          {outfit === 'rainforest_explorer' && (
            <g id="outfit-rainforest-explorer">
              {/* Inner Coral Orange Shirt */}
              <path d="M78,142 L122,142 L124,168 L76,168 Z" fill="#FB923C" />
              {/* Olive Explorer Jacket */}
              <path d="M38,150 Q75,144 84,144 L80,200 L28,200 Z" fill="#4D7C0F" />
              <path d="M162,150 Q125,144 116,144 L120,200 L172,200 Z" fill="#4D7C0F" />
              {/* Gold Buttons */}
              <circle cx="88" cy="160" r="3" fill="#FACC15" />
              <circle cx="88" cy="175" r="3" fill="#FACC15" />
              <circle cx="88" cy="190" r="3" fill="#FACC15" />
              {/* Pocket with Leaf Pin */}
              <rect x="42" y="165" width="26" height="24" rx="3" fill="#3F6212" />
              <text x="55" y="180" fontSize="11" textAnchor="middle">🌿</text>
              {/* Compass on strap */}
              <path d="M120,150 L150,195" stroke="#78350F" strokeWidth="5" />
              <circle cx="138" cy="178" r="7" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
              <line x1="138" y1="173" x2="138" y2="183" stroke="#DC2626" strokeWidth="1.5" />
              <line x1="133" y1="178" x2="143" y2="178" stroke="#1E3A8A" strokeWidth="1.5" />
            </g>
          )}

          {/* OUTFIT: Detective Trench (Hemali) */}
          {outfit === 'detective_trench' && (
            <g id="outfit-detective-trench">
              {/* Crisp White Shirt Collar & Tie */}
              <polygon points="90,140 110,140 100,165" fill="#FFFFFF" />
              <polygon points="97,146 103,146 102,174 98,174" fill="#991B1B" />
              {/* Tweed Brown Detective Coat */}
              <path d="M36,148 Q75,142 86,144 L78,200 L26,200 Z" fill="#78350F" />
              <path d="M164,148 Q125,142 114,144 L122,200 L174,200 Z" fill="#78350F" />
              {/* Double Breasted Golden Buttons */}
              <circle cx="78" cy="162" r="3.5" fill="url(#tocaRoyalGold)" />
              <circle cx="78" cy="178" r="3.5" fill="url(#tocaRoyalGold)" />
              <circle cx="78" cy="192" r="3.5" fill="url(#tocaRoyalGold)" />
              <circle cx="122" cy="162" r="3.5" fill="url(#tocaRoyalGold)" />
              <circle cx="122" cy="178" r="3.5" fill="url(#tocaRoyalGold)" />
              <circle cx="122" cy="192" r="3.5" fill="url(#tocaRoyalGold)" />
              {/* Lapels */}
              <polygon points="55,148 86,144 74,175 48,155" fill="#92400E" />
              <polygon points="145,148 114,144 126,175 152,155" fill="#92400E" />
              {/* Pocket with Pen & Clue Notepad */}
              <rect x="42" y="168" width="22" height="22" rx="2" fill="#582508" />
              <rect x="46" y="162" width="6" height="12" fill="#E2E8F0" />
              <rect x="54" y="160" width="3" height="14" fill="#F59E0B" />
            </g>
          )}

          {/* OUTFIT: Safari Cargo */}
          {outfit === 'safari_cargo' && (
            <g id="outfit-safari-cargo">
              <path d="M78,142 L122,142 L124,168 L76,168 Z" fill="#FFFFFF" />
              <path d="M42,150 Q75,145 82,145 L78,200 L32,200 Z" fill="#C2A676" />
              <path d="M158,150 Q125,145 118,145 L122,200 L168,200 Z" fill="#C2A676" />
              <rect x="74" y="148" width="8" height="52" fill="#F97316" />
              <rect x="118" y="148" width="8" height="52" fill="#F97316" />
              <rect x="42" y="166" width="28" height="24" rx="4" fill="#A88B58" stroke="#8A6E3B" strokeWidth="1.5" />
              <rect x="130" y="166" width="28" height="24" rx="4" fill="#A88B58" stroke="#8A6E3B" strokeWidth="1.5" />
              <circle cx="56" cy="156" r="5" fill="#10B981" />
              <text x="56" y="159" fontSize="6" textAnchor="middle" fill="#FFFFFF" fontWeight="900">★</text>
            </g>
          )}

          {/* OUTFIT: Vet Scrubs */}
          {outfit === 'vet_scrubs' && (
            <g id="outfit-vet-scrubs">
              <path d="M38,150 L162,150 L168,200 L32,200 Z" fill="#10B981" />
              <polygon points="84,142 116,142 100,165" fill={skin} />
              <path d="M84,142 L100,165 L116,142" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
              <rect x="50" y="165" width="26" height="25" rx="3" fill="#059669" />
              <circle cx="63" cy="178" r="4" fill="#A7F3D0" />
              <circle cx="58" cy="172" r="1.8" fill="#A7F3D0" />
              <circle cx="63" cy="170" r="1.8" fill="#A7F3D0" />
              <circle cx="68" cy="172" r="1.8" fill="#A7F3D0" />
              {/* Stethoscope */}
              <path d="M78,145 Q64,165 72,185 Q80,195 90,190" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M122,145 Q136,165 128,185 Q120,195 110,190" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="100" cy="192" r="6" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            </g>
          )}

          {/* OUTFIT: Skater Hoodie */}
          {outfit === 'skater_hoodie' && (
            <g id="outfit-skater-hoodie">
              <path d="M36,148 Q100,138 164,148 L170,200 L30,200 Z" fill="#0F172A" />
              <path d="M72,145 Q100,168 128,145 Q100,158 72,145 Z" fill="#334155" />
              <circle cx="100" cy="178" r="14" fill="#10B981" />
              <path d="M93,178 Q96,172 102,172 Q107,175 106,182 Q100,186 93,178 Z" fill="#0F172A" />
              <line x1="90" y1="156" x2="88" y2="182" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="156" x2="112" y2="182" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="88" cy="183" r="2" fill="#94A3B8" />
              <circle cx="112" cy="183" r="2" fill="#94A3B8" />
            </g>
          )}

          {/* OUTFIT: Techwear */}
          {outfit === 'techwear_jacket' && (
            <g id="outfit-techwear">
              <path d="M36,148 L164,148 L170,200 L30,200 Z" fill="#0E7490" />
              <line x1="100" y1="148" x2="100" y2="200" stroke="#22D3EE" strokeWidth="3" />
              <path d="M48,150 L152,190" stroke="#1E293B" strokeWidth="6" />
              <rect x="94" y="165" width="12" height="10" rx="2" fill="#FACC15" />
              <rect x="42" y="168" width="22" height="22" rx="3" fill="#155E75" />
            </g>
          )}

          {/* OUTFIT: Denim Overalls */}
          {outfit === 'denim_overalls' && (
            <g id="outfit-denim">
              <path d="M38,148 L162,148 L168,200 L32,200 Z" fill="#FEF08A" />
              <line x1="38" y1="158" x2="162" y2="158" stroke="#F43F5E" strokeWidth="3" />
              <line x1="38" y1="172" x2="162" y2="172" stroke="#3B82F6" strokeWidth="3" />
              <line x1="38" y1="186" x2="162" y2="186" stroke="#10B981" strokeWidth="3" />
              <path d="M68,162 L132,162 L136,200 L64,200 Z" fill="#2563EB" />
              <rect x="68" y="146" width="10" height="26" fill="#1D4ED8" />
              <rect x="122" y="146" width="10" height="26" fill="#1D4ED8" />
              <circle cx="73" cy="165" r="3" fill="#E2E8F0" />
              <circle cx="127" cy="165" r="3" fill="#E2E8F0" />
              <rect x="85" y="172" width="30" height="20" rx="3" fill="#1E40AF" />
            </g>
          )}

          {/* OUTFIT: Gamer Sweater */}
          {outfit === 'gamer_sweater' && (
            <g id="outfit-gamer">
              <path d="M34,148 Q100,136 166,148 L172,200 L28,200 Z" fill="#7C3AED" />
              <path d="M78,145 Q100,158 122,145 Q100,152 78,145 Z" fill="#6D28D9" />
              <path d="M94,170 A4,4 0 0,1 100,174 A4,4 0 0,1 106,170 Q112,176 100,186 Q88,176 94,170 Z" fill="#F43F5E" />
            </g>
          )}

          {/* OUTFIT: Royal Princess Gown */}
          {outfit === 'royal_princess_gown' && (
            <g id="outfit-princess">
              {/* Lavender Gown with Gold Star Brooch */}
              <path d="M32,150 Q100,135 168,150 L176,200 L24,200 Z" fill="#C084FC" />
              <path d="M60,152 Q100,142 140,152 L148,200 L52,200 Z" fill="#E879F9" />
              {/* Gold Embroidered Neckline */}
              <path d="M74,144 Q100,165 126,144" fill="none" stroke="url(#tocaRoyalGold)" strokeWidth="4" />
              {/* Sapphire Heart Pendant */}
              <polygon points="94,168 100,162 106,168 100,176" fill="#38BDF8" stroke="url(#tocaRoyalGold)" strokeWidth="1.5" />
              {/* Star sparkles on gown */}
              <text x="80" y="190" fontSize="9" fill="#FEF08A">✨</text>
              <text x="120" y="190" fontSize="9" fill="#FEF08A">✨</text>
            </g>
          )}

          {/* OUTFIT: Magical Mage Robe */}
          {outfit === 'magical_mage_robe' && (
            <g id="outfit-mage">
              {/* Midnight Blue Star Cloak */}
              <path d="M30,148 Q100,135 170,148 L176,200 L24,200 Z" fill="#1E1B4B" />
              {/* Gold Celestial Border */}
              <path d="M96,144 L96,200" stroke="#FACC15" strokeWidth="3" />
              {/* Golden Crescent Moon Brooch */}
              <circle cx="100" cy="156" r="7" fill="#FACC15" />
              <circle cx="103" cy="154" r="5.5" fill="#1E1B4B" />
              {/* Constellation lines */}
              <circle cx="65" cy="175" r="2" fill="#FDE047" />
              <circle cx="80" cy="188" r="2" fill="#FDE047" />
              <line x1="65" y1="175" x2="80" y2="188" stroke="#FDE047" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="135" cy="175" r="2" fill="#FDE047" />
              <circle cx="120" cy="188" r="2" fill="#FDE047" />
              <line x1="135" y1="175" x2="120" y2="188" stroke="#FDE047" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          )}

          {/* OUTFIT: Cozy Onesie */}
          {outfit === 'cozy_onesie' && (
            <g id="outfit-onesie">
              <path d="M34,148 Q100,136 166,148 L172,200 L28,200 Z" fill="#99F6E4" />
              {/* Fluffy White Cloud Belly */}
              <ellipse cx="100" cy="180" rx="26" ry="18" fill="#FFFFFF" />
              {/* Zipper */}
              <line x1="100" y1="145" x2="100" y2="198" stroke="#0D9488" strokeWidth="2" />
              <circle cx="100" cy="152" r="3" fill="#FACC15" />
            </g>
          )}

          {/* OUTFIT: Sporty Tracksuit */}
          {outfit === 'sporty_tracksuit' && (
            <g id="outfit-tracksuit">
              <path d="M34,148 L166,148 L172,200 L28,200 Z" fill="#F43F5E" />
              {/* Colorblock chevron */}
              <polygon points="34,148 100,180 166,148 170,165 100,195 30,165" fill="#3B82F6" />
              <polygon points="30,165 100,195 170,165 172,175 100,200 28,175" fill="#FACC15" />
              {/* Zipper pull */}
              <circle cx="100" cy="150" r="3" fill="#FFFFFF" />
            </g>
          )}
        </g>

        {/* 3. HEAD & FACE BASE */}
        <g id="head-base">
          {/* Cute Soft Toca Head Shape */}
          <rect x="52" y="44" width="96" height="92" rx="46" fill={skin} />

          {/* Cute Left Ear */}
          <circle cx="48" cy="92" r="11" fill={skin} />
          <circle cx="48" cy="92" r="6" fill="#000000" opacity="0.08" />
          <circle cx="42" cy="92" r="2.5" fill="#FDE047" />

          {/* Cute Right Ear */}
          <circle cx="152" cy="92" r="11" fill={skin} />
          <circle cx="152" cy="92" r="6" fill="#000000" opacity="0.08" />

          {/* Rosy Glowing Cheeks */}
          <ellipse cx="68" cy="100" rx="13" ry="8" fill="url(#tocaBlushGlow)" />
          <ellipse cx="132" cy="100" rx="13" ry="8" fill="url(#tocaBlushGlow)" />

          {/* FACE STICKERS & DETAILS */}
          {faceSticker === 'freckles' && (
            <g id="freckles" fill="#78350F" opacity="0.65">
              <circle cx="67" cy="96" r="1.6" />
              <circle cx="73" cy="99" r="1.3" />
              <circle cx="63" cy="101" r="1.4" />
              <circle cx="133" cy="96" r="1.6" />
              <circle cx="127" cy="99" r="1.3" />
              <circle cx="137" cy="101" r="1.4" />
              <circle cx="100" cy="94" r="1.2" />
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
              <circle cx="68" cy="100" r="3.5" fill="#0EA5E9" opacity="0.85" />
              <circle cx="64" cy="95" r="1.5" fill="#0EA5E9" opacity="0.85" />
              <circle cx="68" cy="93" r="1.5" fill="#0EA5E9" opacity="0.85" />
              <circle cx="72" cy="95" r="1.5" fill="#0EA5E9" opacity="0.85" />
            </g>
          )}

          {faceSticker === 'butterfly_paint' && (
            <g id="butterfly-paint">
              <path d="M68,98 Q60,90 64,84 Q72,86 70,95 Z" fill="#A855F7" opacity="0.85" />
              <path d="M68,98 Q58,102 64,108 Q72,104 70,98 Z" fill="#38BDF8" opacity="0.85" />
              <circle cx="70" cy="97" r="1.5" fill="#FACC15" />
            </g>
          )}

          {faceSticker === 'band_aid' && (
            <g id="band-aid">
              <rect x="88" y="93" width="24" height="8" rx="3" fill="#FDBA74" stroke="#FB923C" strokeWidth="1" transform="rotate(-5 100 97)" />
              <circle cx="96" cy="97" r="1" fill="#EA580C" />
              <circle cx="104" cy="97" r="1" fill="#EA580C" />
              <circle cx="100" cy="96" r="2" fill="#F43F5E" />
            </g>
          )}

          {faceSticker === 'glitter_blush' && (
            <g id="glitter-blush">
              <ellipse cx="68" cy="100" rx="14" ry="9" fill="url(#tocaFairyBlush)" />
              <ellipse cx="132" cy="100" rx="14" ry="9" fill="url(#tocaFairyBlush)" />
              <text x="68" y="98" fontSize="8" fill="#FDE047">✨</text>
              <text x="132" y="98" fontSize="8" fill="#FDE047">✨</text>
            </g>
          )}

          {faceSticker === 'heart_cheeks' && (
            <g id="heart-cheeks">
              <text x="68" y="103" fontSize="12" textAnchor="middle" fill="#F43F5E">❤️</text>
              <text x="132" y="103" fontSize="12" textAnchor="middle" fill="#F43F5E">❤️</text>
            </g>
          )}

          {faceSticker === 'whiskers_paint' && (
            <g id="whiskers-paint" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round">
              <line x1="56" y1="98" x2="72" y2="99" />
              <line x1="56" y1="104" x2="72" y2="103" />
              <line x1="128" y1="99" x2="144" y2="98" />
              <line x1="128" y1="103" x2="144" y2="104" />
            </g>
          )}

          {/* NOSE */}
          <ellipse cx="100" cy="97" rx="3.5" ry="2" fill="#000000" opacity="0.15" />

          {/* EXPRESSIVE EYES */}
          {eyes === 'sparkle' && (
            <g id="eyes-sparkle">
              {/* Left Eye */}
              <ellipse cx="76" cy="86" rx="9.5" ry="12.5" fill="#1E293B" />
              <ellipse cx="74" cy="82" rx="4.5" ry="6" fill="#FFFFFF" />
              <circle cx="80" cy="93" r="2.5" fill="#FFFFFF" />
              <path d="M65,79 Q74,73 87,78" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="124" cy="86" rx="9.5" ry="12.5" fill="#1E293B" />
              <ellipse cx="122" cy="82" rx="4.5" ry="6" fill="#FFFFFF" />
              <circle cx="128" cy="93" r="2.5" fill="#FFFFFF" />
              <path d="M113,78 Q126,73 135,79" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {eyes === 'scholar_focus' && (
            <g id="eyes-scholar-focus">
              {/* Hemali Intelligent Observant Eye */}
              <ellipse cx="76" cy="86" rx="9" ry="11" fill="#1E293B" />
              <ellipse cx="74" cy="83" rx="4" ry="5" fill="#FFFFFF" />
              <circle cx="79" cy="91" r="2" fill="#FACC15" />
              <path d="M64,78 Q76,73 88,78" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

              <ellipse cx="124" cy="86" rx="9" ry="11" fill="#1E293B" />
              <ellipse cx="122" cy="83" rx="4" ry="5" fill="#FFFFFF" />
              <circle cx="127" cy="91" r="2" fill="#FACC15" />
              <path d="M112,78 Q124,73 136,78" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {eyes === 'chill' && (
            <g id="eyes-chill">
              <ellipse cx="76" cy="87" rx="8" ry="8" fill="#1E293B" />
              <circle cx="74" cy="85" r="3" fill="#FFFFFF" />
              <path d="M66,83 Q76,80 86,84" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              <path d="M114,88 Q124,80 134,88" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
              <text x="136" y="82" fontSize="9" fill="#FACC15">✨</text>
            </g>
          )}

          {eyes === 'wink' && (
            <g id="eyes-wink">
              <ellipse cx="76" cy="86" rx="9" ry="11" fill="#1E293B" />
              <ellipse cx="74" cy="83" rx="4" ry="5" fill="#FFFFFF" />
              <circle cx="78" cy="91" r="2" fill="#FFFFFF" />
              <path d="M114,88 Q124,78 134,88" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {eyes === 'excited' && (
            <g id="eyes-excited">
              <circle cx="76" cy="86" r="10" fill="#1E293B" />
              <circle cx="124" cy="86" r="10" fill="#1E293B" />
              <text x="76" y="91" fontSize="14" textAnchor="middle" fill="#FDE047">⭐</text>
              <text x="124" y="91" fontSize="14" textAnchor="middle" fill="#FDE047">⭐</text>
            </g>
          )}

          {eyes === 'heart_eyes' && (
            <g id="eyes-heart">
              <text x="76" y="93" fontSize="18" textAnchor="middle" fill="#F43F5E">❤️</text>
              <text x="124" y="93" fontSize="18" textAnchor="middle" fill="#F43F5E">❤️</text>
            </g>
          )}

          {eyes === 'laughing_happy' && (
            <g id="eyes-laughing">
              <path d="M66,88 Q76,76 86,88" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
              <path d="M114,88 Q124,76 134,88" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {eyes === 'determined' && (
            <g id="eyes-determined">
              <ellipse cx="76" cy="86" rx="8.5" ry="9" fill="#1E293B" />
              <circle cx="75" cy="84" r="3" fill="#FFFFFF" />
              <path d="M64,80 L88,85" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

              <ellipse cx="124" cy="86" rx="8.5" ry="9" fill="#1E293B" />
              <circle cx="123" cy="84" r="3" fill="#FFFFFF" />
              <path d="M136,80 L112,85" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          )}

          {/* EXPRESSIVE MOUTH */}
          {mouth === 'smile' && (
            <path d="M91,108 Q100,118 109,108" fill="none" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          )}

          {mouth === 'grin' && (
            <g id="mouth-grin">
              <path d="M88,106 Q100,124 112,106 Z" fill="#E11D48" stroke="#991B1B" strokeWidth="2" />
              <path d="M90,107 Q100,113 110,107" fill="#FFFFFF" />
            </g>
          )}

          {mouth === 'open_happy' && (
            <path d="M89,106 Q100,126 111,106 Z" fill="#991B1B" stroke="#881337" strokeWidth="1.5" />
          )}

          {mouth === 'bubblegum' && (
            <g id="mouth-bubblegum">
              <circle cx="105" cy="112" r="13" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
              <ellipse cx="101" cy="107" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.85" />
            </g>
          )}

          {mouth === 'tongue_out' && (
            <g id="mouth-tongue">
              <path d="M90,107 Q100,115 110,107" fill="none" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="102" cy="115" rx="5" ry="6" fill="#FB7185" stroke="#E11D48" strokeWidth="1" />
              <line x1="102" y1="112" x2="102" y2="118" stroke="#BE123C" strokeWidth="1" />
            </g>
          )}

          {mouth === 'smirk' && (
            <path d="M92,110 Q104,116 112,106" fill="none" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          )}

          {mouth === 'lollipop' && (
            <g id="mouth-lollipop">
              <path d="M90,109 Q100,118 108,109" fill="none" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
              <line x1="105" y1="112" x2="120" y2="125" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="105" cy="112" r="7" fill="url(#tocaRainbowGrad)" stroke="#BE185D" strokeWidth="1" />
            </g>
          )}

          {mouth === 'kitty_mouth' && (
            <path d="M91,108 Q96,114 100,109 Q104,114 109,108" fill="none" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </g>

        {/* 4. FRONT HAIR & BANGS */}
        <g id="front-hair">
          {hairStyle === 'space_buns' && (
            <g id="front-hair-space-buns">
              <path d="M52,66 Q76,92 100,68 Q124,92 148,66 Q150,42 100,42 Q50,42 52,66 Z" fill={hairColor} />
              <path d="M52,70 Q46,105 52,120 Q57,110 58,85 Z" fill={hairColor} />
              <path d="M148,70 Q154,105 148,120 Q143,110 142,85 Z" fill={hairColor} />
              <rect x="58" y="66" width="10" height="4" rx="2" fill="#FACC15" transform="rotate(-15 58 66)" />
              <rect x="132" y="66" width="10" height="4" rx="2" fill="#38BDF8" transform="rotate(15 132 66)" />
            </g>
          )}

          {hairStyle === 'long_waves' && (
            <g id="front-hair-long-waves">
              {/* Hemali Signature Front Styling with Sleek Side Bangs & Highlights */}
              <path d="M48,60 Q80,88 100,64 Q120,88 152,60 Q152,40 100,40 Q48,40 48,60 Z" fill={hairColor} />
              <path d="M48,65 Q38,105 46,132 Q54,112 55,85 Z" fill={hairColor} />
              <path d="M152,65 Q162,105 154,132 Q146,112 145,85 Z" fill={hairColor} />
              {/* Pretty Pearl / Gold Hairpin on Left */}
              <circle cx="56" cy="68" r="3.5" fill="#FDE047" />
              <circle cx="63" cy="68" r="2.5" fill="#FDE047" />
            </g>
          )}

          {hairStyle === 'pigtail_braids' && (
            <g id="front-hair-pigtails">
              {/* Ridheya Front Fringe with Cute Clips */}
              <path d="M50,62 Q75,90 100,66 Q125,90 150,62 Q150,42 100,42 Q50,42 50,62 Z" fill={hairColor} />
              <path d="M50,68 Q44,98 50,118 Q55,102 56,82 Z" fill={hairColor} />
              <path d="M150,68 Q156,98 150,118 Q145,102 144,82 Z" fill={hairColor} />
              {/* Daisy Hairclip */}
              <circle cx="58" cy="64" r="4" fill="#FFFFFF" />
              <circle cx="58" cy="64" r="1.8" fill="#FACC15" />
            </g>
          )}

          {hairStyle === 'cool_bob' && (
            <g id="front-hair-cool-bob">
              <path d="M48,60 Q100,38 152,60 L158,118 Q146,126 142,100 L140,78 Q100,88 60,78 L58,100 Q54,126 42,118 Z" fill={hairColor} />
              <rect x="54" y="74" width="12" height="3.5" rx="1.5" fill="#EC4899" />
              <rect x="54" y="80" width="12" height="3.5" rx="1.5" fill="#FACC15" />
            </g>
          )}

          {hairStyle === 'wolf_cut' && (
            <g id="front-hair-wolf">
              <path d="M48,62 Q70,95 86,72 Q100,98 114,72 Q130,95 152,62 Q150,40 100,40 Q50,40 48,62 Z" fill={hairColor} />
              <path d="M48,70 Q38,105 46,130 Q54,115 56,85 Z" fill={hairColor} />
              <path d="M152,70 Q162,105 154,130 Q146,115 144,85 Z" fill={hairColor} />
            </g>
          )}

          {hairStyle === 'box_braids' && (
            <g id="front-hair-braids">
              <path d="M52,62 Q100,42 148,62 Q130,86 100,64 Q70,86 52,62 Z" fill={hairColor} />
              <rect x="68" y="60" width="6" height="5" rx="1" fill="url(#tocaGoldBead)" />
              <rect x="126" y="60" width="6" height="5" rx="1" fill="url(#tocaGoldBead)" />
            </g>
          )}

          {hairStyle === 'high_ponytail' && (
            <g id="front-hair-pony">
              <path d="M50,60 Q90,92 140,62 Q150,42 100,42 Q50,42 50,60 Z" fill={hairColor} />
              <path d="M50,68 Q44,98 50,118 Q55,105 56,80 Z" fill={hairColor} />
            </g>
          )}

          {hairStyle === 'fairy_twin_tails' && (
            <g id="front-hair-fairy">
              <path d="M48,62 Q76,92 100,66 Q124,92 152,62 Q150,40 100,40 Q50,40 48,62 Z" fill={hairColor} />
              <path d="M48,68 Q40,105 48,125 Q54,108 55,84 Z" fill={hairColor} />
              <path d="M152,68 Q160,105 152,125 Q146,108 145,84 Z" fill={hairColor} />
              <text x="56" y="66" fontSize="10" fill="#FDE047">⭐</text>
              <text x="136" y="66" fontSize="10" fill="#FDE047">⭐</text>
            </g>
          )}

          {hairStyle === 'messy_bun' && (
            <g id="front-hair-messy-bun">
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
              <text x="140" y="58" fontSize="12">🌺</text>
            </g>
          )}

          {hairStyle === 'side_undercut' && (
            <g id="front-hair-undercut">
              <path d="M48,56 Q90,38 152,56 L154,85 Q140,88 135,70 Q100,85 58,60 Z" fill={hairColor} />
              <line x1="48" y1="70" x2="56" y2="65" stroke={hairColor} strokeWidth="3" opacity="0.6" />
              <line x1="48" y1="76" x2="56" y2="71" stroke={hairColor} strokeWidth="3" opacity="0.6" />
            </g>
          )}

          {hairStyle === 'curly_frohawk' && (
            <g id="front-hair-frohawk">
              <circle cx="100" cy="38" r="22" fill={hairColor} />
              <circle cx="85" cy="46" r="16" fill={hairColor} />
              <circle cx="115" cy="46" r="16" fill={hairColor} />
              <circle cx="100" cy="58" r="14" fill={hairColor} />
            </g>
          )}

          {hairStyle === 'detective_slick' && (
            <g id="front-hair-slick">
              <path d="M48,58 Q90,44 152,58 Q140,78 100,68 Q60,78 48,58 Z" fill={hairColor} />
            </g>
          )}
        </g>

        {/* 5. HEADWEAR & ACCESSORIES */}
        {headwear === 'royal_tiara' && (
          <g id="acc-royal-tiara">
            {/* Golden Tiara */}
            <path d="M60,54 L72,28 L86,46 L100,18 L114,46 L128,28 L140,54 Z" fill="url(#tocaRoyalGold)" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="100" cy="22" r="4.5" fill="#EC4899" stroke="#9D174D" strokeWidth="1" />
            <circle cx="72" cy="32" r="3" fill="#38BDF8" />
            <circle cx="128" cy="32" r="3" fill="#38BDF8" />
          </g>
        )}

        {headwear === 'flower_crown' && (
          <g id="acc-flower-crown">
            <path d="M50,56 Q100,38 150,56" fill="none" stroke="#15803D" strokeWidth="4" />
            <circle cx="64" cy="52" r="6" fill="#F43F5E" />
            <circle cx="64" cy="52" r="2" fill="#FEF08A" />
            <circle cx="82" cy="46" r="6" fill="#FFFFFF" />
            <circle cx="82" cy="46" r="2" fill="#FACC15" />
            <circle cx="100" cy="44" r="7" fill="#FB7185" />
            <circle cx="100" cy="44" r="2.5" fill="#FEF08A" />
            <circle cx="118" cy="46" r="6" fill="#FFFFFF" />
            <circle cx="118" cy="46" r="2" fill="#FACC15" />
            <circle cx="136" cy="52" r="6" fill="#F43F5E" />
            <circle cx="136" cy="52" r="2" fill="#FEF08A" />
          </g>
        )}

        {headwear === 'detective_hat' && (
          <g id="acc-detective-hat">
            {/* Hemali Classic Detective Houndstooth Cap */}
            <path d="M48,56 C48,22 152,22 152,56 Z" fill="#92400E" stroke="#582508" strokeWidth="2" />
            {/* Front and back earflaps with ribbon */}
            <path d="M38,58 Q100,42 162,58 L158,66 Q100,52 42,66 Z" fill="#78350F" />
            <circle cx="100" cy="22" r="4" fill="#582508" />
            <path d="M96,24 L94,32 M104,24 L106,32" stroke="#FEF08A" strokeWidth="1.5" />
          </g>
        )}

        {headwear === 'wizard_hat' && (
          <g id="acc-wizard-hat">
            <ellipse cx="100" cy="56" rx="60" ry="14" fill="#1E1B4B" stroke="#FACC15" strokeWidth="2" />
            <polygon points="65,54 100,10 135,54" fill="#1E1B4B" />
            <polygon points="98,10 115,14 100,18" fill="#FACC15" />
            <circle cx="100" cy="40" r="3" fill="#FDE047" />
            <text x="96" y="32" fontSize="9" fill="#FDE047">🌙</text>
          </g>
        )}

        {headwear === 'bear_ear_beanie' && (
          <g id="acc-bear-beanie">
            <circle cx="56" cy="38" r="12" fill="#92400E" />
            <circle cx="56" cy="38" r="6" fill="#FDBA74" />
            <circle cx="144" cy="38" r="12" fill="#92400E" />
            <circle cx="144" cy="38" r="6" fill="#FDBA74" />
            <path d="M50,58 C50,22 150,22 150,58 Z" fill="#78350F" />
            <rect x="46" y="52" width="108" height="14" rx="5" fill="#92400E" />
          </g>
        )}

        {headwear === 'dj_headphones' && (
          <g id="acc-dj-headphones">
            <path d="M42,90 C42,25 158,25 158,90" fill="none" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
            <path d="M42,90 C42,27 158,27 158,90" fill="none" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
            <rect x="34" y="74" width="16" height="32" rx="8" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" />
            <rect x="150" y="74" width="16" height="32" rx="8" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" />
          </g>
        )}

        {headwear === 'cat_ear_headset' && (
          <g id="acc-cat-ears">
            <path d="M44,85 C44,30 156,30 156,85" fill="none" stroke="#6D28D9" strokeWidth="6" />
            <polygon points="56,48 74,18 90,44" fill="#A855F7" stroke="#6D28D9" strokeWidth="2" />
            <polygon points="63,44 74,25 84,42" fill="#F472B6" />
            <polygon points="110,44 126,18 144,48" fill="#A855F7" stroke="#6D28D9" strokeWidth="2" />
            <polygon points="116,42 126,25 137,44" fill="#F472B6" />
            <rect x="36" y="76" width="14" height="28" rx="7" fill="#A855F7" />
            <rect x="150" y="76" width="14" height="28" rx="7" fill="#A855F7" />
          </g>
        )}

        {headwear === 'bucket_hat' && (
          <g id="acc-bucket-hat">
            <path d="M58,54 L66,22 L134,22 L142,54 Z" fill="#0D9488" stroke="#115E59" strokeWidth="2" />
            <ellipse cx="100" cy="54" rx="58" ry="14" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
            <circle cx="100" cy="38" r="8" fill="#FACC15" />
            <text x="100" y="42" fontSize="9" textAnchor="middle" fill="#000000">🌿</text>
          </g>
        )}

        {headwear === 'skater_beanie' && (
          <g id="acc-beanie">
            <path d="M50,60 C50,15 150,15 150,60 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <rect x="46" y="52" width="108" height="15" rx="5" fill="#FB923C" stroke="#EA580C" strokeWidth="1.5" />
            <circle cx="100" cy="60" r="4" fill="#FFFFFF" />
          </g>
        )}

        {headwear === 'cap_backward' && (
          <g id="acc-cap-backward">
            <path d="M50,56 C50,25 150,25 150,56 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            <ellipse cx="100" cy="34" rx="28" ry="8" fill="#1E40AF" />
          </g>
        )}

        {headwear === 'bandana' && (
          <g id="acc-bandana">
            <path d="M48,60 Q100,48 152,60 L150,70 Q100,58 50,70 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
            <polygon points="144,60 162,55 155,70" fill="#EF4444" />
          </g>
        )}

        {/* 6. GLASSES & EYEWEAR */}
        {glasses === 'round_glasses' && (
          <g id="acc-round-glasses">
            {/* Ridheya Signature Round Clear Gold Frames */}
            <circle cx="76" cy="86" r="14.5" fill="#A5F3FC" fillOpacity="0.25" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="70" y1="77" x2="82" y2="89" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="124" cy="86" r="14.5" fill="#A5F3FC" fillOpacity="0.25" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="118" y1="77" x2="130" y2="89" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M90,84 Q100,80 110,84" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {glasses === 'scholar_wireframes' && (
          <g id="acc-scholar-frames">
            {/* Hemali Slim Rectangular Scholar Glasses */}
            <rect x="62" y="76" width="28" height="18" rx="4" fill="#A5F3FC" fillOpacity="0.2" stroke="#1E293B" strokeWidth="2" />
            <line x1="66" y1="80" x2="74" y2="88" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="110" y="76" width="28" height="18" rx="4" fill="#A5F3FC" fillOpacity="0.2" stroke="#1E293B" strokeWidth="2" />
            <line x1="114" y1="80" x2="122" y2="88" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="90" y1="84" x2="110" y2="84" stroke="#1E293B" strokeWidth="2.5" />
          </g>
        )}

        {glasses === 'cool_sunnies' && (
          <g id="acc-cool-sunnies">
            <polygon points="60,80 92,84 88,96 62,94" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <polygon points="140,80 108,84 112,96 138,94" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <line x1="92" y1="84" x2="108" y2="84" stroke="#0F172A" strokeWidth="3" />
            <line x1="64" y1="84" x2="74" y2="92" stroke="url(#tocaLensGlint)" strokeWidth="2" strokeLinecap="round" />
            <line x1="128" y1="84" x2="138" y2="92" stroke="url(#tocaLensGlint)" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {glasses === 'star_shades' && (
          <g id="acc-star-shades">
            <text x="76" y="93" fontSize="22" textAnchor="middle" fill="#FACC15" opacity="0.9">⭐</text>
            <text x="124" y="93" fontSize="22" textAnchor="middle" fill="#FACC15" opacity="0.9">⭐</text>
            <line x1="88" y1="86" x2="112" y2="86" stroke="#F59E0B" strokeWidth="2" />
          </g>
        )}

        {glasses === 'heart_glasses' && (
          <g id="acc-heart-glasses">
            <text x="76" y="94" fontSize="22" textAnchor="middle" fill="#F43F5E" opacity="0.85">❤️</text>
            <text x="124" y="94" fontSize="22" textAnchor="middle" fill="#F43F5E" opacity="0.85">❤️</text>
            <line x1="88" y1="86" x2="112" y2="86" stroke="#BE123C" strokeWidth="2" />
          </g>
        )}

        {glasses === 'cyber_visor' && (
          <g id="acc-cyber-visor">
            <path d="M58,80 L142,80 L138,95 L62,95 Z" fill="#06B6D4" fillOpacity="0.75" stroke="#22D3EE" strokeWidth="2" />
            <line x1="64" y1="84" x2="136" y2="84" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
            <line x1="70" y1="90" x2="130" y2="90" stroke="#FDE047" strokeWidth="1" strokeDasharray="4 2" />
          </g>
        )}

        {glasses === 'monocle' && (
          <g id="acc-monocle">
            <circle cx="124" cy="86" r="14" fill="#A5F3FC" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M138,86 Q150,110 145,145" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        )}

        {/* 7. HANDHELD / COMPANION PROPS */}
        {handheld === 'magnifying_glass' && (
          <g id="prop-magnifying-glass">
            {/* Ridheya Gold Magnifying Glass in hand */}
            <line x1="150" y1="175" x2="175" y2="195" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
            <line x1="150" y1="175" x2="175" y2="195" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="145" cy="165" r="15" fill="#A5F3FC" fillOpacity="0.35" stroke="url(#tocaRoyalGold)" strokeWidth="3.5" />
            <circle cx="145" cy="165" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            <text x="145" y="169" fontSize="9" textAnchor="middle">🔍</text>
          </g>
        )}

        {handheld === 'spellbook' && (
          <g id="prop-spellbook">
            {/* Hemali Magical Spellbook */}
            <rect x="130" y="148" width="34" height="44" rx="4" fill="#581C87" stroke="#FACC15" strokeWidth="2" transform="rotate(-8 130 148)" />
            <circle cx="146" cy="170" r="8" fill="#FACC15" transform="rotate(-8 130 148)" />
            <text x="146" y="174" fontSize="10" textAnchor="middle" transform="rotate(-8 130 148)">✨</text>
            <rect x="144" y="190" width="6" height="12" fill="#F43F5E" transform="rotate(-8 130 148)" />
          </g>
        )}

        {handheld === 'vet_tablet' && (
          <g id="prop-vet-tablet">
            <rect x="132" y="148" width="30" height="42" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" transform="rotate(-10 132 148)" />
            <rect x="136" y="152" width="22" height="32" rx="2" fill="#0284C7" transform="rotate(-10 132 148)" />
            <path d="M138,168 L142,168 L144,162 L147,174 L149,168 L154,168" fill="none" stroke="#FDE047" strokeWidth="1.5" transform="rotate(-10 132 148)" />
          </g>
        )}

        {handheld === 'polaroid_camera' && (
          <g id="prop-polaroid">
            <path d="M142,150 Q160,165 155,185" fill="none" stroke="#EA580C" strokeWidth="2.5" />
            <rect x="134" y="156" width="32" height="26" rx="4" fill="#F1F5F9" stroke="#334155" strokeWidth="1.5" />
            <circle cx="150" cy="169" r="8" fill="#1E293B" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="150" cy="169" r="4" fill="#0284C7" />
            <circle cx="148" cy="167" r="1.5" fill="#FFFFFF" />
            <rect x="138" y="160" width="5" height="4" fill="#F59E0B" />
          </g>
        )}

        {handheld === 'walkie_talkie' && (
          <g id="prop-walkie">
            <line x1="152" y1="145" x2="152" y2="160" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="152" cy="144" r="2" fill="#22C55E" />
            <rect x="140" y="158" width="22" height="34" rx="4" fill="#047857" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="145" y1="172" x2="157" y2="172" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="145" y1="176" x2="157" y2="176" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="145" y1="180" x2="157" y2="180" stroke="#064E3B" strokeWidth="1.5" />
          </g>
        )}

        {handheld === 'pocket_pet' && (
          <g id="prop-pocket-kitten">
            <ellipse cx="148" cy="165" rx="14" ry="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
            <polygon points="138,156 142,145 148,155" fill="#F97316" />
            <polygon points="148,155 154,145 158,156" fill="#F97316" />
            <circle cx="143" cy="164" r="1.5" fill="#000000" />
            <circle cx="153" cy="164" r="1.5" fill="#000000" />
            <polygon points="148,168 146,166 150,166" fill="#F43F5E" />
            <ellipse cx="142" cy="174" rx="3.5" ry="2.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
            <ellipse cx="154" cy="174" rx="3.5" ry="2.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
          </g>
        )}

        {handheld === 'skateboard' && (
          <g id="prop-skateboard">
            <rect x="22" y="145" width="18" height="48" rx="9" fill="#F43F5E" stroke="#881337" strokeWidth="2" transform="rotate(15 22 145)" />
            <circle cx="25" cy="155" r="4" fill="#38BDF8" transform="rotate(15 22 145)" />
            <circle cx="37" cy="185" r="4" fill="#38BDF8" transform="rotate(15 22 145)" />
          </g>
        )}

        {handheld === 'magic_wand' && (
          <g id="prop-wand">
            <line x1="145" y1="185" x2="168" y2="152" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
            <circle cx="168" cy="152" r="6" fill="#FACC15" />
            <text x="168" y="156" fontSize="12" textAnchor="middle">⭐</text>
            <circle cx="178" cy="144" r="1.5" fill="#FDE047" />
            <circle cx="162" cy="138" r="1.5" fill="#FDE047" />
          </g>
        )}

        {handheld === 'butterfly_net' && (
          <g id="prop-net">
            <line x1="145" y1="185" x2="162" y2="150" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <circle cx="166" cy="142" r="11" fill="none" stroke="#22D3EE" strokeWidth="2.5" />
            <ellipse cx="166" cy="146" rx="8" ry="14" fill="#A5F3FC" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1" />
            <text x="166" y="146" fontSize="10" textAnchor="middle">🦋</text>
          </g>
        )}

        {handheld === 'boba_tea' && (
          <g id="prop-boba">
            <rect x="138" y="158" width="18" height="26" rx="4" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
            {/* Boba pearls */}
            <circle cx="143" cy="178" r="2" fill="#831843" />
            <circle cx="147" cy="179" r="2" fill="#831843" />
            <circle cx="151" cy="178" r="2" fill="#831843" />
            <circle cx="145" cy="174" r="2" fill="#831843" />
            <circle cx="149" cy="174" r="2" fill="#831843" />
            {/* Straw */}
            <line x1="147" y1="146" x2="147" y2="175" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {handheld === 'baby_owl' && (
          <g id="prop-baby-owl">
            {/* Mini Ollie perched */}
            <ellipse cx="150" cy="162" rx="11" ry="13" fill="#78350F" stroke="#B45309" strokeWidth="1.5" />
            <ellipse cx="150" cy="165" rx="7" ry="8" fill="#FEF3C7" />
            <circle cx="146" cy="158" r="4.5" fill="#FFFFFF" />
            <circle cx="146" cy="158" r="2.5" fill="#1E293B" />
            <circle cx="154" cy="158" r="4.5" fill="#FFFFFF" />
            <circle cx="154" cy="158" r="2.5" fill="#1E293B" />
            <polygon points="150,161 148,164 152,164" fill="#F59E0B" />
            <text x="150" y="152" fontSize="7" textAnchor="middle">🦉</text>
          </g>
        )}
      </svg>
    </div>
  );
};
