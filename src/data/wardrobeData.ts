export interface WardrobeItem {
  id: string;
  type: 'hat' | 'outfit' | 'backpack' | 'glasses' | 'boots' | 'badgePin';
  name: string;
  emoji: string;
  unlockRequirement: string;
  unlockedByDefault: boolean;
  categoryName: string;
}

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // 1. HATS & HAIR ACCESSORIES (Girls Edition)
  { id: 'hat-safari', type: 'hat', name: 'Roze Safarihoed met Strik', emoji: '🎀', unlockRequirement: 'Standaard uitrusting', unlockedByDefault: true, categoryName: 'Hoofddeksel' },
  { id: 'hat-tiara', type: 'hat', name: 'Glinsterende Prinsessen Tiara', emoji: '👑', unlockRequirement: 'Behaal 5 sterren', unlockedByDefault: true, categoryName: 'Hoofddeksel' },
  { id: 'hat-flower', type: 'hat', name: 'Lente Bloemenkrans', emoji: '🌸', unlockRequirement: 'Aai 3 dieren in het reservaat', unlockedByDefault: true, categoryName: 'Hoofddeksel' },
  { id: 'hat-butterfly', type: 'hat', name: 'Gouden Vlinder Diadeem', emoji: '🦋', unlockRequirement: 'Voltooi 3 taalquizzen', unlockedByDefault: false, categoryName: 'Hoofddeksel' },
  { id: 'hat-unicorn', type: 'hat', name: 'Magische Eenhoorn Hoed', emoji: '🦄', unlockRequirement: 'Behaal 25 sterren', unlockedByDefault: false, categoryName: 'Hoofddeksel' },
  { id: 'hat-sunhat', type: 'hat', name: 'Zomerse Zonnehoed met Roze Lint', emoji: '👒', unlockRequirement: 'Ontgrendel Savanne', unlockedByDefault: false, categoryName: 'Hoofddeksel' },
  { id: 'hat-earmuffs', type: 'hat', name: 'Donzige Roze Pool Oorwarmers', emoji: '🎿', unlockRequirement: 'Ontgrendel Poolgebied', unlockedByDefault: false, categoryName: 'Hoofddeksel' },

  // 2. OUTFITS (Girls Edition)
  { id: 'outfit-khaki', type: 'outfit', name: 'Pastel Roze Safari Jurk', emoji: '👗', unlockRequirement: 'Standaard uitrusting', unlockedByDefault: true, categoryName: 'Kleding' },
  { id: 'outfit-princess', type: 'outfit', name: 'Prinsessen Safari Tuniek', emoji: '👘', unlockRequirement: 'Behaal 10 sterren', unlockedByDefault: true, categoryName: 'Kleding' },
  { id: 'outfit-jungle', type: 'outfit', name: 'Bloemen & Vlinders Salopette', emoji: '🦺', unlockRequirement: 'Beantwoord 15 vragen goed', unlockedByDefault: false, categoryName: 'Kleding' },
  { id: 'outfit-mermaid', type: 'outfit', name: 'Zeemeermin Koraal Glitter Jurkje', emoji: '🧜‍♀️', unlockRequirement: 'Ontgrendel Oceaan Wereld', unlockedByDefault: false, categoryName: 'Kleding' },
  { id: 'outfit-lavender', type: 'outfit', name: 'Zacht Lavendel Ranger Pakje', emoji: '👚', unlockRequirement: 'Reeks van 5 goede antwoorden', unlockedByDefault: false, categoryName: 'Kleding' },
  { id: 'outfit-golden', type: 'outfit', name: 'Gouden Kampioenen Glitterpak', emoji: '✨', unlockRequirement: 'Ontgrendel 8 dieren', unlockedByDefault: false, categoryName: 'Kleding' },

  // 3. BACKPACKS & BAGS (Girls Edition)
  { id: 'bag-canvas', type: 'backpack', name: 'Schattig Roze Hartjes Rugzakje', emoji: '💖', unlockRequirement: 'Standaard uitrusting', unlockedByDefault: true, categoryName: 'Rugzak' },
  { id: 'bag-unicorn', type: 'backpack', name: 'Pluche Eenhoorn Rugtas', emoji: '🦄', unlockRequirement: 'Lees 2 verhalen', unlockedByDefault: true, categoryName: 'Rugzak' },
  { id: 'bag-flower', type: 'backpack', name: 'Lente Madeliefjes Tas', emoji: '🌸', unlockRequirement: 'Voltooi 4 leesopdrachten', unlockedByDefault: false, categoryName: 'Rugzak' },
  { id: 'bag-vet', type: 'backpack', name: 'Pastel Dierenarts Koffertje', emoji: '🩺', unlockRequirement: 'Voer 4 dieren snacks', unlockedByDefault: false, categoryName: 'Rugzak' },
  { id: 'bag-golden', type: 'backpack', name: 'Fonkelende Sterren Glittertas', emoji: '⭐', unlockRequirement: 'Ontgrendel 10 dieren', unlockedByDefault: false, categoryName: 'Rugzak' },

  // 4. GLASSES & ACCESSORIES (Girls Edition)
  { id: 'glass-none', type: 'glasses', name: 'Bloemetje achter het Oor', emoji: '🌺', unlockRequirement: 'Standaard', unlockedByDefault: true, categoryName: 'Bril & Accessoires' },
  { id: 'glass-heart', type: 'glasses', name: 'Roze Hartjes Zonnebril', emoji: '🕶️', unlockRequirement: 'Standaard', unlockedByDefault: true, categoryName: 'Bril & Accessoires' },
  { id: 'glass-magnify', type: 'glasses', name: 'Gouden Glitter Speurbril', emoji: '👓', unlockRequirement: 'Behaal 90% nauwkeurigheid', unlockedByDefault: false, categoryName: 'Bril & Accessoires' },
  { id: 'glass-necklace', type: 'glasses', name: 'Magische Dieren Vriendschapsketting', emoji: '📿', unlockRequirement: 'Verdien 5 vriendschapshartjes', unlockedByDefault: false, categoryName: 'Bril & Accessoires' },
  { id: 'glass-binoculars', type: 'glasses', name: 'Pastel Roze Verrekijker', emoji: '🔭', unlockRequirement: 'Voltooi alle Boerderij levels', unlockedByDefault: false, categoryName: 'Bril & Accessoires' }
];

export const INITIAL_CUSTOMIZATION = {
  hairStyle: 'vlechtjes met strikjes',
  hairColor: '#4a2c11',
  hat: 'hat-safari',
  outfit: 'outfit-khaki',
  backpack: 'bag-canvas',
  glasses: 'glass-none',
  boots: 'boots-pink',
  badgePin: 'heart-pin',
  unlockedItems: ['hat-safari', 'hat-tiara', 'hat-flower', 'outfit-khaki', 'outfit-princess', 'bag-canvas', 'bag-unicorn', 'glass-none', 'glass-heart']
};
