export type HomeTileGroup = 'learn' | 'play' | 'explore' | 'progress';
export type HomeTileSize = 'standard' | 'large' | 'xl';

export interface HomeTile {
  id: string;
  group: HomeTileGroup;
  title: string;
  subtitle: string;
  emoji: string;
  size: HomeTileSize;
  accented?: boolean;
  theme: string;
  onClick: () => void;
}

// Bright, distinct color per tile (not one dark gradient shared per group) --
// each tile gets its own saturated hue so the grid reads as colorful and
// easy to tell apart at a glance, matching a kids'-app home screen rather
// than a uniform near-black dashboard.
const TILE_THEMES = {
  amber: 'from-amber-500 to-orange-600 border-amber-300/60 hover:border-amber-200',
  blue: 'from-blue-500 to-indigo-600 border-blue-300/60 hover:border-blue-200',
  violet: 'from-violet-500 to-purple-600 border-violet-300/60 hover:border-violet-200',
  pink: 'from-pink-500 to-rose-600 border-pink-300/60 hover:border-pink-200',
  red: 'from-red-500 to-rose-700 border-red-300/60 hover:border-red-200',
  cyan: 'from-cyan-500 to-teal-600 border-cyan-300/60 hover:border-cyan-200',
  emerald: 'from-emerald-500 to-green-600 border-emerald-300/60 hover:border-emerald-200',
  orange: 'from-orange-500 to-amber-600 border-orange-300/60 hover:border-orange-200',
  sky: 'from-sky-500 to-blue-600 border-sky-300/60 hover:border-sky-200',
  indigo: 'from-indigo-500 to-purple-700 border-indigo-300/60 hover:border-indigo-200',
  yellow: 'from-yellow-500 to-amber-600 border-yellow-300/60 hover:border-yellow-200',
  slate: 'from-blue-700 to-slate-800 border-blue-300/50 hover:border-blue-200',
  lime: 'from-lime-500 to-green-700 border-lime-300/60 hover:border-lime-200'
} as const;

export interface HomeTileHandlers {
  openRpgAdventure: () => void;
  openVerbArena: () => void;
  openDictionary: () => void;
  openSpellingFactory: () => void;
  openArcade: () => void;
  openBossArena: () => void;
  openTamagotchi: () => void;
  openTestSelector: () => void;
  openExpedition: () => void;
  goToSanctuary: () => void;
  goToMap: () => void;
  goToBadges: () => void;
  openScoreboard: () => void;
}

export interface HomeTileContext {
  rpgEmoji: string;
  rpgTitle: string;
  rpgSubtitle: string;
  expeditionEmoji: string;
  expeditionTitle: string;
  expeditionSubtitle: string;
}

export function buildHomeTiles(handlers: HomeTileHandlers, ctx: HomeTileContext): HomeTile[] {
  return [
    // Learn
    {
      id: 'verb-zones', group: 'learn', size: 'large', accented: true, emoji: '⚡',
      title: 'Sterke Werkwoorden Zones',
      subtitle: '10 zones, 200 werkwoorden, verdien een dierbeloning per zone!',
      theme: TILE_THEMES.amber, onClick: handlers.openVerbArena
    },
    {
      id: 'dictionary', group: 'learn', size: 'standard', emoji: '📚',
      title: 'Nederlands Woordenboek',
      subtitle: '7-traps woordontleding, Cito signaalwoorden & synoniemen!',
      theme: TILE_THEMES.blue, onClick: handlers.openDictionary
    },
    {
      id: 'spelling-factory', group: 'learn', size: 'standard', emoji: '🧪',
      title: 'Spelling Fabriek',
      subtitle: 'Maak nieuwe woorden in de magische spellingfabriek!',
      theme: TILE_THEMES.violet, onClick: handlers.openSpellingFactory
    },
    {
      id: 'test-mode', group: 'learn', size: 'standard', emoji: '📝',
      title: 'Toetsweek',
      subtitle: '50 vragen, meteen het antwoord zien, en een eindscore!',
      theme: TILE_THEMES.lime, onClick: handlers.openTestSelector
    },
    // Play
    {
      id: 'arcade', group: 'play', size: 'standard', emoji: '🕹️',
      title: 'Safari Arcade Arena',
      subtitle: 'Ballon Popper, Woord Sprint & Cito Turbo Dash!',
      theme: TILE_THEMES.pink, onClick: handlers.openArcade
    },
    {
      id: 'boss-arena', group: 'play', size: 'standard', emoji: '⚔️',
      title: 'Poké-Boss Duel Arena',
      subtitle: "Vecht tegen de DT-Draak, 't Kofschip & de Klanken-Golem!",
      theme: TILE_THEMES.red, onClick: handlers.openBossArena
    },
    {
      id: 'tamagotchi', group: 'play', size: 'standard', emoji: '🐾',
      title: 'Dierenkamer',
      subtitle: 'Verzorg, aai en voed je huisdier in de Dierenkamer!',
      theme: TILE_THEMES.cyan, onClick: handlers.openTamagotchi
    },
    // Explore
    {
      id: 'expedition', group: 'explore', size: 'standard', emoji: ctx.expeditionEmoji,
      title: ctx.expeditionTitle,
      subtitle: ctx.expeditionSubtitle,
      theme: TILE_THEMES.emerald, onClick: handlers.openExpedition
    },
    {
      id: 'sanctuary', group: 'explore', size: 'standard', emoji: '🦁',
      title: 'Dierenpark',
      subtitle: 'Bekijk en verzorg al je ontgrendelde dieren!',
      theme: TILE_THEMES.orange, onClick: handlers.goToSanctuary
    },
    {
      id: 'map', group: 'explore', size: 'standard', emoji: '🗺️',
      title: 'Wereldkaart',
      subtitle: 'Kies uit 7 werelddelen om te verkennen!',
      theme: TILE_THEMES.sky, onClick: handlers.goToMap
    },
    // Progress
    {
      id: 'rpg-adventure', group: 'progress', size: 'xl', emoji: ctx.rpgEmoji,
      title: ctx.rpgTitle,
      subtitle: ctx.rpgSubtitle,
      theme: TILE_THEMES.indigo, onClick: handlers.openRpgAdventure
    },
    {
      id: 'badges', group: 'progress', size: 'standard', emoji: '🏅',
      title: 'Medailles',
      subtitle: 'Bekijk al je verdiende badges en prestaties!',
      theme: TILE_THEMES.yellow, onClick: handlers.goToBadges
    },
    {
      id: 'scoreboard', group: 'progress', size: 'standard', emoji: '📊',
      title: 'Ouder Scorebord',
      subtitle: 'Bekijk de voortgang en statistieken van je kind!',
      theme: TILE_THEMES.slate, onClick: handlers.openScoreboard
    }
  ];
}

export const HOME_TILE_GROUP_LABELS: Record<HomeTileGroup, string> = {
  learn: '📖 Leren',
  play: '🎮 Spelen',
  explore: '🧭 Ontdekken',
  progress: '🏆 Voortgang'
};
