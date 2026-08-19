export interface TocaCustomization {
  baseId: string; // e.g. 'zoe', 'maya', 'skye', 'nova', 'luna', 'custom'
  skinTone: string; // hex code
  hairStyle: string; // 'space_buns', 'cool_bob', 'wolf_cut', 'box_braids', 'messy_bun', 'high_ponytail', 'short_curls'
  hairColor: string; // hex code
  eyes: string; // 'sparkle', 'chill', 'wink', 'excited', 'focused'
  mouth: string; // 'smile', 'bubblegum', 'grin', 'smirk', 'open_happy'
  faceSticker?: string; // 'none', 'freckles', 'star_stickers', 'paw_tattoo', 'blush_heavy'
  outfit: string; // 'safari_cargo', 'vet_scrubs', 'skater_hoodie', 'techwear_jacket', 'denim_overalls', 'gamer_sweater'
  headwear: string; // 'none', 'dj_headphones', 'bucket_hat', 'cat_ear_headset', 'skater_beanie', 'cap_backward', 'bandana'
  glasses: string; // 'none', 'round_glasses', 'cool_sunnies', 'star_shades'
  handheld: string; // 'none', 'vet_tablet', 'polaroid_camera', 'walkie_talkie', 'pocket_pet', 'skateboard'
}

export interface TocaPreset {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  themeColor: string;
  customization: TocaCustomization;
}

export const TOCA_SKIN_TONES = [
  { id: 'skin-1', name: 'Zacht Porselein', color: '#FCD5B5' },
  { id: 'skin-2', name: 'Zonnig Honing', color: '#F1BE9B' },
  { id: 'skin-3', name: 'Gouden Tan', color: '#D99B72' },
  { id: 'skin-4', name: 'Warme Karamel', color: '#B8784E' },
  { id: 'skin-5', name: 'Rijke Chocolade', color: '#824E2B' },
  { id: 'skin-6', name: 'Diep Brons', color: '#563118' }
];

export const TOCA_HAIR_COLORS = [
  { id: 'hc-espresso', name: 'Diep Espresso', color: '#2B1B17' },
  { id: 'hc-caramel', name: 'Karamel Bruin', color: '#6A381F' },
  { id: 'hc-blonde', name: 'Goud Blond', color: '#E5B869' },
  { id: 'hc-auburn', name: 'Koper Rood', color: '#A03B1E' },
  { id: 'hc-pastel-pink', name: 'Pastel Roze', color: '#FF70A6' },
  { id: 'hc-lavender', name: 'Cyber Lavendel', color: '#A370F7' },
  { id: 'hc-cyan', name: 'Oceaan Cyaan', color: '#2EC4B6' },
  { id: 'hc-mint', name: 'Neon Mint', color: '#70E4BA' }
];

export const TOCA_HAIR_STYLES = [
  { id: 'space_buns', name: 'Space Buns', icon: '🪐', description: 'Twee speelse dotjes met losse plukjes' },
  { id: 'cool_bob', name: 'Cool Bob & Bangs', icon: '💇‍♀️', description: 'Strakke moderne bob met haarspeldjes' },
  { id: 'wolf_cut', name: 'Wavy Wolf Cut', icon: '🐺', description: 'Stoere golvende lokken met laagjes' },
  { id: 'box_braids', name: 'Box Braids & Kralen', icon: '✨', description: 'Mooie vlechten met gouden clips' },
  { id: 'messy_bun', name: 'Messy Skater Bun', icon: '🛹', description: 'Lekker nonchalant hoog knotje' },
  { id: 'high_ponytail', name: 'High Ponytail', icon: '🎀', description: 'Hoge sportieve staart met scrunchie' },
  { id: 'short_curls', name: 'Short Curly Afro', icon: '🌀', description: 'Korte volumineuze krulletjes' }
];

export const TOCA_OUTFITS = [
  {
    id: 'safari_cargo',
    name: 'Streetwear Safari Cargo',
    icon: '🧭',
    style: 'Khaki utility vest + crop top + riemen',
    tag: 'Cool Scout'
  },
  {
    id: 'vet_scrubs',
    name: 'Pro Dierenarts Scrubs',
    icon: '🩺',
    style: 'Mintgroene dierenarts outfit met stethoscoop & pootjes-patch',
    tag: 'Dierenarts'
  },
  {
    id: 'skater_hoodie',
    name: 'Oversized Dino Skater Hoodie',
    icon: '🛹',
    style: 'Zwarte/mint hoodie met dinosaurus & baggy jeans',
    tag: 'Skater'
  },
  {
    id: 'techwear_jacket',
    name: 'Urban Explorer Techwear',
    icon: '⚡',
    style: 'Teal windbreaker met neon gespen & heuptas',
    tag: 'Cyber Explorer'
  },
  {
    id: 'denim_overalls',
    name: '90s Denim Dungarees',
    icon: '👖',
    style: 'Spijkerbroek-tuinbroek met gestreepte longsleeve',
    tag: 'Retro Vibe'
  },
  {
    id: 'gamer_sweater',
    name: 'Cozy Pixel Heart Sweater',
    icon: '💜',
    style: 'Fluffy paarse trui met 8-bit hartje & sneakers',
    tag: 'Cozy Gamer'
  }
];

export const TOCA_HEADWEAR = [
  { id: 'none', name: 'Geen Hoofddeksel', icon: '❌' },
  { id: 'dj_headphones', name: 'DJ Draadloze Koptelefoon', icon: '🎧', desc: 'Over je oren of relaxed om de nek' },
  { id: 'bucket_hat', name: 'Safari Bucket Hat', icon: '👒', desc: 'Hip vissershoedje met safarilogo' },
  { id: 'cat_ear_headset', name: 'Gaming Kattenoren Headset', icon: '🐱', desc: 'Met oplichtende oortjes' },
  { id: 'skater_beanie', name: 'Neon Skater Muts', icon: '🧢', desc: 'Recht over je haar' },
  { id: 'cap_backward', name: 'Achterstevoren Pet', icon: '🧢', desc: 'Streetwear pet met klep naar achter' },
  { id: 'bandana', name: 'Safari Bandana', icon: '🧣', desc: 'Geknoopte hippe bandana' }
];

export const TOCA_GLASSES = [
  { id: 'none', name: 'Geen Bril', icon: '❌' },
  { id: 'round_glasses', name: 'Retro Ronde Goudbril', icon: '👓', desc: 'Slimme ronde vintage glazen' },
  { id: 'cool_sunnies', name: 'Matrix / Cat-Eye Zonnebril', icon: '🕶️', desc: 'Super stoere zwarte zonnebril' },
  { id: 'star_shades', name: 'Sterren Glitter Shades', icon: '⭐', desc: 'Gele transparante festivalbril' }
];

export const TOCA_HANDHELD = [
  { id: 'none', name: 'Geen Item', icon: '❌' },
  { id: 'vet_tablet', name: 'Dierenarts Scanner Tablet', icon: '📱', desc: 'Meet direct de gezondheid van dieren' },
  { id: 'polaroid_camera', name: 'Wildlife Polaroid Camera', icon: '📷', desc: 'Maakt direct foto’s in het wild' },
  { id: 'walkie_talkie', name: 'Safari Walkie-Talkie', icon: '📻', desc: 'Praat direct met je zus!' },
  { id: 'pocket_pet', name: 'Kitten in Heuptasje', icon: '🐱', desc: 'Lief kittenkopje gluurt mee' },
  { id: 'skateboard', name: 'Custom Skateboard', icon: '🛹', desc: 'Onder je arm geklemd' }
];

export const TOCA_PRESETS: TocaPreset[] = [
  {
    id: 'maya_vet',
    name: 'Maya The Cool Dierenarts',
    tagline: 'Veterinair Genie & Wildlife Redder',
    bio: 'Altijd paraat met haar mintgroene scrub, stethoscoop en pocket-scanner om gewonde savannedieren te genezen.',
    themeColor: '#10B981',
    customization: {
      baseId: 'maya_vet',
      skinTone: '#F1BE9B',
      hairStyle: 'space_buns',
      hairColor: '#2B1B17',
      eyes: 'sparkle',
      mouth: 'smile',
      faceSticker: 'freckles',
      outfit: 'vet_scrubs',
      headwear: 'cat_ear_headset',
      glasses: 'round_glasses',
      handheld: 'vet_tablet'
    }
  },
  {
    id: 'skye_scout',
    name: 'Skye The Safari Ranger',
    tagline: 'Streetwear Explorer & Spoorzoeker',
    bio: 'Houdt van oversized cargo jackets, bucket hats en bewaakt samen met haar walkie-talkie alle olifanten en leeuwen.',
    themeColor: '#F59E0B',
    customization: {
      baseId: 'skye_scout',
      skinTone: '#D99B72',
      hairStyle: 'wolf_cut',
      hairColor: '#E5B869',
      eyes: 'chill',
      mouth: 'grin',
      faceSticker: 'paw_tattoo',
      outfit: 'safari_cargo',
      headwear: 'bucket_hat',
      glasses: 'cool_sunnies',
      handheld: 'walkie_talkie'
    }
  },
  {
    id: 'nova_tech',
    name: 'Nova The Wild Streamer',
    tagline: 'Tech-Savvy Natuurfotografe',
    bio: 'Fotografeert met haar vintage polaroid de zeldzaamste dieren en luistert naar beats tijdens het speuren.',
    themeColor: '#8B5CF6',
    customization: {
      baseId: 'nova_tech',
      skinTone: '#B8784E',
      hairStyle: 'box_braids',
      hairColor: '#6A381F',
      eyes: 'excited',
      mouth: 'open_happy',
      faceSticker: 'star_stickers',
      outfit: 'techwear_jacket',
      headwear: 'dj_headphones',
      glasses: 'none',
      handheld: 'polaroid_camera'
    }
  },
  {
    id: 'zoe_skater',
    name: 'Zoë The Dino Skater',
    tagline: 'Nonchalante Dierenvriend',
    bio: 'Rolt op haar skateboard door het park, draagt een oversized dino-hoodie en heeft altijd een zacht kitten in haar tas.',
    themeColor: '#06B6D4',
    customization: {
      baseId: 'zoe_skater',
      skinTone: '#FCD5B5',
      hairStyle: 'cool_bob',
      hairColor: '#FF70A6',
      eyes: 'sparkle',
      mouth: 'smile',
      faceSticker: 'freckles',
      outfit: 'skater_hoodie',
      headwear: 'cap_backward',
      glasses: 'none',
      handheld: 'pocket_pet'
    }
  },
  {
    id: 'luna_cozy',
    name: 'Luna The Pet Hugger',
    tagline: 'Gamer & Huisdieren Fluisteraar',
    bio: 'Draagt een comfy trui, leest graag dierenboeken en kent alle geluiden van vogels en dolfijnen uit haar hoofd.',
    themeColor: '#EC4899',
    customization: {
      baseId: 'luna_cozy',
      skinTone: '#824E2B',
      hairStyle: 'messy_bun',
      hairColor: '#A370F7',
      eyes: 'sparkle',
      mouth: 'smile',
      faceSticker: 'star_stickers',
      outfit: 'gamer_sweater',
      headwear: 'none',
      glasses: 'star_shades',
      handheld: 'skateboard'
    }
  }
];

export const DEFAULT_TOCA_CUSTOMIZATION: TocaCustomization = TOCA_PRESETS[0].customization;
