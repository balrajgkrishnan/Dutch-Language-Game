export interface TocaCustomization {
  baseId: string; // e.g. 'ridheya_explorer', 'hemali_scholar', 'maya_vet', 'skye_scout', 'nova_tech', 'zoe_skater', 'luna_cozy', 'aria_princess'
  skinTone: string; // hex code
  hairStyle: string; // 'space_buns', 'long_waves', 'pigtail_braids', 'cool_bob', 'wolf_cut', 'box_braids', 'messy_bun', 'high_ponytail', 'short_curls', 'side_undercut', 'fairy_twin_tails', 'curly_frohawk', 'detective_slick'
  hairColor: string; // hex code
  eyes: string; // 'sparkle', 'chill', 'wink', 'excited', 'heart_eyes', 'scholar_focus', 'laughing_happy', 'determined'
  mouth: string; // 'smile', 'bubblegum', 'grin', 'open_happy', 'tongue_out', 'smirk', 'lollipop', 'kitty_mouth'
  faceSticker?: string; // 'none', 'freckles', 'star_stickers', 'paw_tattoo', 'butterfly_paint', 'band_aid', 'glitter_blush', 'heart_cheeks', 'whiskers_paint'
  outfit: string; // 'safari_cargo', 'vet_scrubs', 'skater_hoodie', 'techwear_jacket', 'denim_overalls', 'gamer_sweater', 'detective_trench', 'rainforest_explorer', 'royal_princess_gown', 'magical_mage_robe', 'cozy_onesie', 'sporty_tracksuit'
  headwear: string; // 'none', 'dj_headphones', 'bucket_hat', 'cat_ear_headset', 'skater_beanie', 'cap_backward', 'bandana', 'royal_tiara', 'flower_crown', 'detective_hat', 'wizard_hat', 'bear_ear_beanie'
  glasses: string; // 'none', 'round_glasses', 'cool_sunnies', 'star_shades', 'heart_glasses', 'cyber_visor', 'scholar_wireframes', 'monocle'
  handheld: string; // 'none', 'vet_tablet', 'polaroid_camera', 'walkie_talkie', 'pocket_pet', 'skateboard', 'magnifying_glass', 'spellbook', 'magic_wand', 'butterfly_net', 'boba_tea', 'baby_owl'
  aura?: string; // 'none', 'sparkle_stars', 'magical_hearts', 'safari_leaves', 'music_beats', 'cyber_glow', 'rainbow_aura', 'firefly_lights'
}

export interface TocaPreset {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  themeColor: string;
  badge: string;
  customization: TocaCustomization;
}

export const TOCA_SKIN_TONES = [
  { id: 'skin-1', name: 'Zacht Porselein', color: '#FDE4CE' },
  { id: 'skin-2', name: 'Zonnig Perzik', color: '#FCD5B5' },
  { id: 'skin-3', name: 'Warme Honing', color: '#F1BE9B' },
  { id: 'skin-4', name: 'Gouden Tan', color: '#D99B72' },
  { id: 'skin-5', name: 'Warme Karamel', color: '#B8784E' },
  { id: 'skin-6', name: 'Rijke Hazelnoot', color: '#965832' },
  { id: 'skin-7', name: 'Diepe Chocolade', color: '#703D1E' },
  { id: 'skin-8', name: 'Donker Brons', color: '#4E2612' },
  { id: 'skin-9', name: 'Sprookjes Lavendel', color: '#E8D5F9' },
  { id: 'skin-10', name: 'Maanlicht Zilver', color: '#E2E8F0' }
];

export const TOCA_HAIR_COLORS = [
  { id: 'hc-espresso', name: 'Diep Espresso', color: '#24140E' },
  { id: 'hc-chocolate', name: 'Puur Chocolade', color: '#4A2818' },
  { id: 'hc-caramel', name: 'Karamel Kastanje', color: '#783E1E' },
  { id: 'hc-auburn', name: 'Koper Rood', color: '#A03B1E' },
  { id: 'hc-blonde', name: 'Goud Blond', color: '#E5B869' },
  { id: 'hc-platinum', name: 'Platina IJsblond', color: '#F6E8C3' },
  { id: 'hc-pastel-pink', name: 'Pastel Roze', color: '#FF70A6' },
  { id: 'hc-magenta', name: 'Neon Fuchsia', color: '#E11D48' },
  { id: 'hc-lavender', name: 'Cyber Lavendel', color: '#A370F7' },
  { id: 'hc-violet', name: 'Diep Paars', color: '#6D28D9' },
  { id: 'hc-cyan', name: 'Oceaan Cyaan', color: '#06B6D4' },
  { id: 'hc-mint', name: 'Neon Mint', color: '#34D399' },
  { id: 'hc-sunset', name: 'Sunset Oranje', color: '#F97316' },
  { id: 'hc-midnight', name: 'Midnight Blauw', color: '#1E3A8A' },
  { id: 'hc-emerald', name: 'Smaragd Groen', color: '#047857' },
  { id: 'hc-silver', name: 'Zilver Wit', color: '#CBD5E1' }
];

export const TOCA_HAIR_STYLES = [
  { id: 'long_waves', name: 'Hemali Long Waves', icon: '✨', description: 'Lange golvende donkere lokken met schittering' },
  { id: 'pigtail_braids', name: 'Ridheya Twin Braids', icon: '👧', description: 'Twee speelse Franse vlechtjes met bloemetjes' },
  { id: 'space_buns', name: 'Space Buns & Clips', icon: '🪐', description: 'Twee trendy dotjes met pastel haarspeldjes' },
  { id: 'cool_bob', name: 'Cool Bob & Bangs', icon: '💇‍♀️', description: 'Strakke moderne bob met trendy speldjes' },
  { id: 'wolf_cut', name: 'Wavy Wolf Cut', icon: '🐺', description: 'Stoere golvende lokken in moderne laagjes' },
  { id: 'box_braids', name: 'Box Braids & Kralen', icon: '💫', description: 'Prachtige lange vlechten met gouden kralen' },
  { id: 'messy_bun', name: 'Messy Skater Bun', icon: '🛹', description: 'Nonchalant hoog knotje met speelse lokken' },
  { id: 'high_ponytail', name: 'High Ponytail', icon: '🎀', description: 'Hoge sportieve staart met scrunchie' },
  { id: 'short_curls', name: 'Volumineuze Krullen', icon: '🌀', description: 'Mooie volle krullenbos met bloem' },
  { id: 'side_undercut', name: 'Skater Side-Sweep', icon: '⚡', description: 'Stoer asymmetrisch kapsel met schuine pony' },
  { id: 'fairy_twin_tails', name: 'Fairy Twin Tails', icon: '🧚‍♀️', description: 'Lange betoverende staartjes met sterrenclips' },
  { id: 'curly_frohawk', name: 'Curly Mohawk Fade', icon: '🔥', description: 'Trendy krullende hanenkam met coole fade' },
  { id: 'detective_slick', name: 'Slimme Zijscheiding', icon: '🔍', description: 'Nette stijlvolle look voor echte onderzoekers' }
];

export const TOCA_EYES = [
  { id: 'sparkle', name: 'Anime Sparkle Ogen', icon: '✨', desc: 'Grote glanzende ogen met dubbele sterretjes' },
  { id: 'scholar_focus', name: 'Slimme Speurneus Blik', icon: '🧐', desc: 'Oplettende, intelligente detective blik' },
  { id: 'chill', name: 'Relaxed & Knipoog', icon: '😉', desc: 'Zelfverzekerde blik met een vriendelijke glimlach' },
  { id: 'wink', name: 'Dappere Knipoog', icon: '⭐', desc: 'Ondeugende knipoog met een gouden glitter' },
  { id: 'excited', name: 'Super Blij / Gouden Sterren', icon: '🤩', desc: 'Ogen vol gouden sterretjes en verwondering' },
  { id: 'heart_eyes', name: 'Hartjes Ogen', icon: '😍', desc: 'Verliefd op alle schattige dieren in het park' },
  { id: 'laughing_happy', name: 'Vrolijke Lachoogjes', icon: '😊', desc: 'Blije boogjes van puur plezier' },
  { id: 'determined', name: 'Moedige Explorer', icon: '🦁', desc: 'Klaar om elk raadsel en geheim op te lossen' }
];

export const TOCA_MOUTHS = [
  { id: 'smile', name: 'Lieve Glimlach', icon: '🙂' },
  { id: 'grin', name: 'Tandjes Grin', icon: '😁' },
  { id: 'open_happy', name: 'Enthousiaste Mond', icon: '😃' },
  { id: 'bubblegum', name: 'Roze Kauwgombal', icon: '🫧' },
  { id: 'tongue_out', name: 'Grappige Tong', icon: '😋' },
  { id: 'smirk', name: 'Clever Detective Smirk', icon: '😏' },
  { id: 'lollipop', name: 'Regenboog Lolly', icon: '🍭' },
  { id: 'kitty_mouth', name: 'Schattig Kattenbekje :3', icon: '🐱' }
];

export const TOCA_FACE_STICKERS = [
  { id: 'none', name: 'Geen Stickers', icon: '❌' },
  { id: 'freckles', name: 'Zomer Sproetjes', icon: '🍓' },
  { id: 'star_stickers', name: 'Glitter Sterren & Hartjes', icon: '⭐' },
  { id: 'paw_tattoo', name: 'Safari Pootjes Paint', icon: '🐾' },
  { id: 'butterfly_paint', name: 'Vlinder Face Paint', icon: '🦋' },
  { id: 'band_aid', name: 'Pastel Avonturen Pleister', icon: '🩹' },
  { id: 'glitter_blush', name: 'Fairy Sparkle Blush', icon: '💖' },
  { id: 'heart_cheeks', name: 'Hartjes Wangen', icon: '💕' },
  { id: 'whiskers_paint', name: 'Kittensnorharen', icon: '🐱' }
];

export const TOCA_OUTFITS = [
  {
    id: 'rainforest_explorer',
    name: 'Ridheya Jungle Explorer',
    icon: '🧭',
    style: 'Khaki avonturiersjasje + kompasgesp + bladerenbadge',
    tag: 'Natuurheld'
  },
  {
    id: 'detective_trench',
    name: 'Hemali Detective Mantel',
    icon: '🕵️‍♀️',
    style: 'Klassieke tweed mantel + notitieboekzakje + gouden knopen',
    tag: 'Slimme Speurder'
  },
  {
    id: 'safari_cargo',
    name: 'Streetwear Safari Cargo',
    icon: '🎒',
    style: 'Khaki utility vest + witte crop top + oranje utility riemen',
    tag: 'Cool Scout'
  },
  {
    id: 'vet_scrubs',
    name: 'Pro Dierenarts Scrubs',
    icon: '🩺',
    style: 'Mintgroene scrubs + stethoscoop + pootjes-borduurwerk',
    tag: 'Dierenarts'
  },
  {
    id: 'skater_hoodie',
    name: 'Oversized Dino Skater Hoodie',
    icon: '🛹',
    style: 'Donkere skater hoodie met mint dinosaurus & veterkoordjes',
    tag: 'Skater'
  },
  {
    id: 'techwear_jacket',
    name: 'Urban Explorer Techwear',
    icon: '⚡',
    style: 'Teal windbreaker + neon gespen + utility borstriem',
    tag: 'Cyber Explorer'
  },
  {
    id: 'denim_overalls',
    name: '90s Retro Denim Dungarees',
    icon: '👖',
    style: 'Spijker-tuinbroek + vrolijke gestreepte longsleeve',
    tag: 'Retro Vibe'
  },
  {
    id: 'gamer_sweater',
    name: 'Cozy Pixel Heart Sweater',
    icon: '💜',
    style: 'Chunky paarse gebreide trui met 8-bit hartje',
    tag: 'Cozy Gamer'
  },
  {
    id: 'royal_princess_gown',
    name: 'Magische Sterren Prinsessenjurk',
    icon: '👑',
    style: 'Koninklijk lavendel gewaad met goudborduurwerk & robijn broche',
    tag: 'Prinses'
  },
  {
    id: 'magical_mage_robe',
    name: 'Mystieke Tovenaarsmantel',
    icon: '🧙‍♀️',
    style: 'Middernachtblauwe cape met gouden sterren & maansluiting',
    tag: 'Magiër'
  },
  {
    id: 'cozy_onesie',
    name: 'Fluffy Dieren Onesie',
    icon: '☁️',
    style: 'Superzacht pastel slaappakje met wolkjes & capuchon',
    tag: 'Droomtijd'
  },
  {
    id: 'sporty_tracksuit',
    name: 'Retro Sportjack & Neon Bies',
    icon: '🏃‍♀️',
    style: 'Kleurrijk atletisch trainingsjack met rits',
    tag: 'Sportief'
  }
];

export const TOCA_HEADWEAR = [
  { id: 'none', name: 'Geen Hoofddeksel', icon: '❌', desc: 'Puur jouw eigen haarstijl' },
  { id: 'royal_tiara', name: 'Gouden Koninklijke Tiara', icon: '👑', desc: 'Glanzende tiara met roze saffieren' },
  { id: 'flower_crown', name: 'Bloemenkrans der Natuur', icon: '🌸', desc: 'Vlecht van madeliefjes en rozen' },
  { id: 'detective_hat', name: 'Hemali Detective Pet', icon: '🕵️‍♀️', desc: 'Klassieke ruitjespet voor speurders' },
  { id: 'dj_headphones', name: 'DJ Draadloze Koptelefoon', icon: '🎧', desc: 'Over je oren met oplichtende neon accenten' },
  { id: 'cat_ear_headset', name: 'Gaming Kattenoren Headset', icon: '🐱', desc: 'Met oplichtende paarse oortjes' },
  { id: 'bucket_hat', name: 'Safari Explorer Bucket Hat', icon: '👒', desc: 'Hip vissershoedje met jungle-embleem' },
  { id: 'skater_beanie', name: 'Neon Skater Muts', icon: '🧢', desc: 'Zachte gebreide muts met logo' },
  { id: 'cap_backward', name: 'Achterstevoren Pet', icon: '🧢', desc: 'Streetwear pet met klep naar achter' },
  { id: 'bandana', name: 'Safari Avonturen Bandana', icon: '🧣', desc: 'Geknoopte hippe rode bandana' },
  { id: 'wizard_hat', name: 'Magiërs Puntmuts', icon: '🧙‍♀️', desc: 'Met gouden sterren en maansikkel' },
  { id: 'bear_ear_beanie', name: 'Beren-Oren Wintermuts', icon: '🐻', desc: 'Met zachte pluizige berenoortjes' }
];

export const TOCA_GLASSES = [
  { id: 'none', name: 'Geen Bril', icon: '❌', desc: 'Geen bril nodig' },
  { id: 'round_glasses', name: 'Ridheya Ronde Goudbril', icon: '👓', desc: 'Karakteristieke heldere ronde goudglazen' },
  { id: 'scholar_wireframes', name: 'Hemali Slimme Rechthoekbril', icon: '🤓', desc: 'Moderne strakke detective glazen' },
  { id: 'cool_sunnies', name: 'Cat-Eye Festival Zonnebril', icon: '🕶️', desc: 'Super stoere zwarte zonnebril' },
  { id: 'star_shades', name: 'Sterren Glitter Shades', icon: '⭐', desc: 'Gele transparante festivalbril' },
  { id: 'heart_glasses', name: 'Roze Hartjes Bril', icon: '💖', desc: 'Schattige roze hartvormige zonnebril' },
  { id: 'cyber_visor', name: 'Neon Cyber Visor', icon: '🥽', desc: 'Futuristische oplichtende blauwe bril' },
  { id: 'monocle', name: 'Gouden Detective Monocle', icon: '🧐', desc: 'Klassiek monocle met kettinkje' }
];

export const TOCA_HANDHELD = [
  { id: 'none', name: 'Geen Item', icon: '❌', desc: 'Handen vrij' },
  { id: 'magnifying_glass', name: 'Ridheya Vergrootglas', icon: '🔍', desc: 'Groot goud vergrootglas om sporen te zoeken' },
  { id: 'spellbook', name: 'Hemali Magisch Boek', icon: '📖', desc: 'Oud toverboek met spreuken & notities' },
  { id: 'vet_tablet', name: 'Dierenarts Scanner Tablet', icon: '📱', desc: 'Meet direct de hartslag van gewonde dieren' },
  { id: 'polaroid_camera', name: 'Wildlife Polaroid Camera', icon: '📷', desc: 'Maakt direct foto’s van zeldzame dieren' },
  { id: 'walkie_talkie', name: 'Safari Walkie-Talkie', icon: '📻', desc: 'Praat direct met je zussen op afstand!' },
  { id: 'pocket_pet', name: 'Kitten in Heuptasje', icon: '🐱', desc: 'Lief klein poesje dat gezellig meekijkt' },
  { id: 'skateboard', name: 'Custom Skateboard', icon: '🛹', desc: 'Stoer deck onder de arm' },
  { id: 'magic_wand', name: 'Sterren Toverstaf', icon: '🪄', desc: 'Laat gouden vonken en sterren dwarrelen' },
  { id: 'butterfly_net', name: 'Vlindernet met Blauwe Vlinder', icon: '🦋', desc: 'Veilig observeren en weer vrijlaten' },
  { id: 'boba_tea', name: 'Pastel Strawberry Boba', icon: '🧋', desc: 'Lekker drankje met tapioca parels' },
  { id: 'baby_owl', name: 'Kleine Uil Ollie op Pols', icon: '🦉', desc: 'Een schattig uiltje dat meevliegt' }
];

export const TOCA_AURAS = [
  { id: 'none', name: 'Geen Aura', icon: '❌', desc: 'Rustige achtergrond' },
  { id: 'sparkle_stars', name: 'Dwarrelende Gouden Sterren', icon: '✨', desc: 'Fonkelende sterrenstof rondom je hoofd' },
  { id: 'magical_hearts', name: 'Zwevende Liefdeshartjes', icon: '💖', desc: 'Warme roze hartjes' },
  { id: 'safari_leaves', name: 'Jungle Bladeren Bries', icon: '🍃', desc: 'Wervelende groene regenwoud bladeren' },
  { id: 'music_beats', name: 'Muzieknoten & Beats', icon: '🎵', desc: 'Vrolijke gekleurde noten' },
  { id: 'cyber_glow', name: 'Neon Cyber Grid', icon: '⚡', desc: 'Oplichtende cyaan energiestralen' },
  { id: 'rainbow_aura', name: 'Pastel Regenboog Halo', icon: '🌈', desc: 'Zachte magische regenboog gloed' },
  { id: 'firefly_lights', name: 'Gouden Vuurvliegjes', icon: '💡', desc: 'Warme zwevende lichtjes van de savanne' }
];

export const TOCA_PRESETS: TocaPreset[] = [
  {
    id: 'ridheya_explorer',
    name: 'Ridheya de Dappere Verkenner',
    tagline: 'Nieuwsgierig, Dierenliefhebber & Spoorzoeker',
    bio: 'Met haar heldere ronde bril en gouden vergrootglas ontdekt Ridheya de kleinste insecten, zeldzame planten en redt ze elk dier in het oerwoud.',
    themeColor: '#10B981',
    badge: 'Protagonist Groep 3-4',
    customization: {
      baseId: 'ridheya_explorer',
      skinTone: '#D99B72',
      hairStyle: 'pigtail_braids',
      hairColor: '#4A2818',
      eyes: 'sparkle',
      mouth: 'smile',
      faceSticker: 'freckles',
      outfit: 'rainforest_explorer',
      headwear: 'flower_crown',
      glasses: 'round_glasses',
      handheld: 'magnifying_glass',
      aura: 'safari_leaves'
    }
  },
  {
    id: 'hemali_scholar',
    name: 'Hemali de Magische Speurneus',
    tagline: 'Intellectueel, Probleemoplosser & Detective',
    bio: 'Gewapend met haar magische toverboek, slimme detectivejas en scherpe logica ontrafelt Hemali elk moeilijk Cito-woord en mysterieus verhaal.',
    themeColor: '#8B5CF6',
    badge: 'Protagonist Groep 5-6',
    customization: {
      baseId: 'hemali_scholar',
      skinTone: '#B8784E',
      hairStyle: 'long_waves',
      hairColor: '#24140E',
      eyes: 'scholar_focus',
      mouth: 'smirk',
      faceSticker: 'star_stickers',
      outfit: 'detective_trench',
      headwear: 'detective_hat',
      glasses: 'scholar_wireframes',
      handheld: 'spellbook',
      aura: 'sparkle_stars'
    }
  },
  {
    id: 'maya_vet',
    name: 'Maya The Cool Dierenarts',
    tagline: 'Veterinair Genie & Wildlife Redder',
    bio: 'Altijd paraat met haar mintgroene scrub, stethoscoop en pocket-scanner om gewonde savannedieren te verzorgen en genezen.',
    themeColor: '#059669',
    badge: 'Pro Dierenarts',
    customization: {
      baseId: 'maya_vet',
      skinTone: '#FCD5B5',
      hairStyle: 'space_buns',
      hairColor: '#24140E',
      eyes: 'sparkle',
      mouth: 'smile',
      faceSticker: 'paw_tattoo',
      outfit: 'vet_scrubs',
      headwear: 'cat_ear_headset',
      glasses: 'round_glasses',
      handheld: 'vet_tablet',
      aura: 'magical_hearts'
    }
  },
  {
    id: 'skye_scout',
    name: 'Skye The Safari Ranger',
    tagline: 'Streetwear Explorer & Ranger',
    bio: 'Houdt van oversized cargo vesten, bucket hats en bewaakt samen met haar walkie-talkie alle olifanten en leeuwen.',
    themeColor: '#F59E0B',
    badge: 'Safari Ranger',
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
      handheld: 'walkie_talkie',
      aura: 'safari_leaves'
    }
  },
  {
    id: 'nova_tech',
    name: 'Nova The Wild Streamer',
    tagline: 'Tech-Savvy Wildlife Fotografe',
    bio: 'Fotografeert met haar vintage polaroid de zeldzaamste dieren en luistert naar coole beats tijdens het speuren door de wildernis.',
    themeColor: '#6366F1',
    badge: 'Cyber Streamer',
    customization: {
      baseId: 'nova_tech',
      skinTone: '#965832',
      hairStyle: 'box_braids',
      hairColor: '#A03B1E',
      eyes: 'excited',
      mouth: 'open_happy',
      faceSticker: 'star_stickers',
      outfit: 'techwear_jacket',
      headwear: 'dj_headphones',
      glasses: 'cyber_visor',
      handheld: 'polaroid_camera',
      aura: 'cyber_glow'
    }
  },
  {
    id: 'zoe_skater',
    name: 'Zoë The Dino Skater',
    tagline: 'Nonchalante Dierenvriend & Skater',
    bio: 'Rolt op haar skateboard door het park, draagt een oversized dino-hoodie en heeft altijd een lief kitten in haar buideltasje.',
    themeColor: '#06B6D4',
    badge: 'Urban Skater',
    customization: {
      baseId: 'zoe_skater',
      skinTone: '#FDE4CE',
      hairStyle: 'cool_bob',
      hairColor: '#FF70A6',
      eyes: 'wink',
      mouth: 'bubblegum',
      faceSticker: 'band_aid',
      outfit: 'skater_hoodie',
      headwear: 'cap_backward',
      glasses: 'none',
      handheld: 'pocket_pet',
      aura: 'music_beats'
    }
  },
  {
    id: 'aria_princess',
    name: 'Prinses Aria der Dieren',
    tagline: 'Koninklijke Beschermer van het Woud',
    bio: 'Draagt een fonkelende tiara en een sterrenjurk. Samen met haar baby-uil Ollie beschermt zij de magische oorden van het park.',
    themeColor: '#EC4899',
    badge: 'Koninklijk',
    customization: {
      baseId: 'aria_princess',
      skinTone: '#FCD5B5',
      hairStyle: 'fairy_twin_tails',
      hairColor: '#E5B869',
      eyes: 'heart_eyes',
      mouth: 'smile',
      faceSticker: 'glitter_blush',
      outfit: 'royal_princess_gown',
      headwear: 'royal_tiara',
      glasses: 'none',
      handheld: 'baby_owl',
      aura: 'sparkle_stars'
    }
  },
  {
    id: 'luna_cozy',
    name: 'Luna The Pet Hugger',
    tagline: 'Gamer & Huisdieren Fluisteraar',
    bio: 'Draagt een comfy trui, leest graag dierenboeken en kent alle geluiden van vogels en dolfijnen uit haar hoofd.',
    themeColor: '#A855F7',
    badge: 'Cozy Vibe',
    customization: {
      baseId: 'luna_cozy',
      skinTone: '#703D1E',
      hairStyle: 'messy_bun',
      hairColor: '#A370F7',
      eyes: 'sparkle',
      mouth: 'kitty_mouth',
      faceSticker: 'heart_cheeks',
      outfit: 'gamer_sweater',
      headwear: 'bear_ear_beanie',
      glasses: 'heart_glasses',
      handheld: 'boba_tea',
      aura: 'firefly_lights'
    }
  }
];

export const DEFAULT_TOCA_CUSTOMIZATION: TocaCustomization = TOCA_PRESETS[0].customization;

