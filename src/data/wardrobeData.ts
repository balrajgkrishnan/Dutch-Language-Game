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
  // Hats
  { id: 'hat-safari', type: 'hat', name: 'Klassieke Safarihoed', emoji: '🤠', unlockRequirement: 'Standaard uitrusting', unlockedByDefault: true, categoryName: 'Hoofddeksel' },
  { id: 'hat-explorer', type: 'hat', name: 'Tropenhelm', emoji: '🪖', unlockRequirement: 'Voltooi 5 verhalen', unlockedByDefault: false, categoryName: 'Hoofddeksel' },
  { id: 'hat-crown', type: 'hat', name: 'Koninklijke Leeuwenkroon', emoji: '👑', unlockRequirement: 'Behaal 20 sterren', unlockedByDefault: false, categoryName: 'Hoofddeksel' },
  { id: 'hat-beanie', type: 'hat', name: 'Poolgebied Muts', emoji: '🎿', unlockRequirement: 'Ontgrendel Poolgebied', unlockedByDefault: false, categoryName: 'Hoofddeksel' },

  // Outfits
  { id: 'outfit-khaki', type: 'outfit', name: 'Kaki Safari Vest', emoji: '🧥', unlockRequirement: 'Standaard uitrusting', unlockedByDefault: true, categoryName: 'Kleding' },
  { id: 'outfit-jungle', type: 'outfit', name: 'Regenwoud Ranger Pak', emoji: '🦺', unlockRequirement: 'Beantwoord 25 vragen goed', unlockedByDefault: false, categoryName: 'Kleding' },
  { id: 'outfit-diver', type: 'outfit', name: 'Oceaan Duikpak', emoji: '🤿', unlockRequirement: 'Ontgrendel Oceaan Wereld', unlockedByDefault: false, categoryName: 'Kleding' },
  { id: 'outfit-royal', type: 'outfit', name: 'Gouden Kampioenen Tuniek', emoji: '🥋', unlockRequirement: 'Reeks van 10 vragen', unlockedByDefault: false, categoryName: 'Kleding' },

  // Backpacks
  { id: 'bag-canvas', type: 'backpack', name: 'Leren Safari Rugzak', emoji: '🎒', unlockRequirement: 'Standaard uitrusting', unlockedByDefault: true, categoryName: 'Rugzak' },
  { id: 'bag-research', type: 'backpack', name: 'Onderzoekers Tas met Kaarten', emoji: '💼', unlockRequirement: 'Voltooi 3 woordenschat missies', unlockedByDefault: false, categoryName: 'Rugzak' },
  { id: 'bag-golden', type: 'backpack', name: 'Gouden Trofee Rugzak', emoji: '🧳', unlockRequirement: 'Ontgrendel 10 dieren', unlockedByDefault: false, categoryName: 'Rugzak' },

  // Glasses & Accessories
  { id: 'glass-none', type: 'glasses', name: 'Geen Bril', emoji: '👁️', unlockRequirement: 'Standaard', unlockedByDefault: true, categoryName: 'Bril & Accessoires' },
  { id: 'glass-magnify', type: 'glasses', name: 'Gouden Speurbril', emoji: '👓', unlockRequirement: 'Behaal 90% nauwkeurigheid', unlockedByDefault: false, categoryName: 'Bril & Accessoires' },
  { id: 'glass-sunglass', type: 'glasses', name: 'Savanne Zonnebril', emoji: '🕶️', unlockRequirement: 'Voer 5 dieren', unlockedByDefault: false, categoryName: 'Bril & Accessoires' },
  { id: 'glass-binoculars', type: 'glasses', name: 'Verrekijker om de nek', emoji: '🔭', unlockRequirement: 'Voltooi alle Boerderij levels', unlockedByDefault: false, categoryName: 'Bril & Accessoires' }
];

export const INITIAL_CUSTOMIZATION = {
  hairStyle: 'vlechtjes',
  hairColor: '#4a2c11',
  hat: 'hat-safari',
  outfit: 'outfit-khaki',
  backpack: 'bag-canvas',
  glasses: 'glass-none',
  boots: 'boots-leather',
  badgePin: 'star-pin',
  unlockedItems: ['hat-safari', 'outfit-khaki', 'bag-canvas', 'glass-none']
};
