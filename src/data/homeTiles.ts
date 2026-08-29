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

const THEMES: Record<HomeTileGroup, string> = {
  learn: 'from-slate-900 to-emerald-950 border-emerald-500/40 hover:border-emerald-400/70',
  play: 'from-slate-900 via-purple-950 to-indigo-950 border-pink-500/40 hover:border-pink-300',
  explore: 'from-slate-900 to-amber-950 border-amber-500/40 hover:border-amber-400/60',
  progress: 'from-slate-900 to-indigo-950 border-indigo-500/40 hover:border-indigo-300'
};

export interface HomeTileHandlers {
  openRpgAdventure: () => void;
  openReading: () => void;
  openVerbArena: () => void;
  openDictionary: () => void;
  openReporter: () => void;
  openSpellingFactory: () => void;
  openArcade: () => void;
  openBossArena: () => void;
  openTamagotchi: () => void;
  openSisterTeam: () => void;
  openExpedition: () => void;
  goToSanctuary: () => void;
  goToMap: () => void;
  openVetHospital: () => void;
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
      id: 'reading', group: 'learn', size: 'large', emoji: '📖',
      title: 'Voorleesavonturen',
      subtitle: 'Beleef verhalen als een echt prentenboek, pagina voor pagina!',
      theme: THEMES.learn, onClick: handlers.openReading
    },
    {
      id: 'verb-zones', group: 'learn', size: 'standard', accented: true, emoji: '⚡',
      title: 'Sterke Werkwoorden Zones',
      subtitle: '10 zones, 200 werkwoorden, verdien een dierbeloning per zone!',
      theme: THEMES.learn, onClick: handlers.openVerbArena
    },
    {
      id: 'dictionary', group: 'learn', size: 'standard', emoji: '📚',
      title: 'Nederlands Woordenboek',
      subtitle: '7-traps woordontleding, Cito signaalwoorden & synoniemen!',
      theme: THEMES.learn, onClick: handlers.openDictionary
    },
    {
      id: 'reporter', group: 'learn', size: 'standard', emoji: '📰',
      title: "Hemali's Reporter Missie",
      subtitle: 'Onderzoek het safaripark als een echte verslaggever!',
      theme: THEMES.learn, onClick: handlers.openReporter
    },
    {
      id: 'spelling-factory', group: 'learn', size: 'standard', emoji: '🧪',
      title: "Ridheya's Spelling Fabriek",
      subtitle: 'Maak nieuwe woorden in de magische spellingfabriek!',
      theme: THEMES.learn, onClick: handlers.openSpellingFactory
    },
    // Play
    {
      id: 'arcade', group: 'play', size: 'standard', emoji: '🕹️',
      title: 'Safari Arcade Arena',
      subtitle: 'Ballon Popper, Woord Sprint & Cito Turbo Dash!',
      theme: THEMES.play, onClick: handlers.openArcade
    },
    {
      id: 'boss-arena', group: 'play', size: 'standard', emoji: '⚔️',
      title: 'Poké-Boss Duel Arena',
      subtitle: "Vecht tegen de DT-Draak, 't Kofschip & de Klanken-Golem!",
      theme: THEMES.play, onClick: handlers.openBossArena
    },
    {
      id: 'tamagotchi', group: 'play', size: 'standard', emoji: '🐾',
      title: 'Dierenkamer',
      subtitle: 'Verzorg, aai en voed je huisdier in de Dierenkamer!',
      theme: THEMES.play, onClick: handlers.openTamagotchi
    },
    {
      id: 'sister-team', group: 'play', size: 'standard', emoji: '🤝',
      title: 'Sister Team Samen-Quest',
      subtitle: 'Werk samen met je zus aan een speciale missie!',
      theme: THEMES.play, onClick: handlers.openSisterTeam
    },
    // Explore
    {
      id: 'expedition', group: 'explore', size: 'standard', emoji: ctx.expeditionEmoji,
      title: ctx.expeditionTitle,
      subtitle: ctx.expeditionSubtitle,
      theme: THEMES.explore, onClick: handlers.openExpedition
    },
    {
      id: 'sanctuary', group: 'explore', size: 'standard', emoji: '🦁',
      title: 'Dierenpark',
      subtitle: 'Bekijk en verzorg al je ontgrendelde dieren!',
      theme: THEMES.explore, onClick: handlers.goToSanctuary
    },
    {
      id: 'map', group: 'explore', size: 'standard', emoji: '🗺️',
      title: 'Wereldkaart',
      subtitle: 'Kies uit 7 werelddelen om te verkennen!',
      theme: THEMES.explore, onClick: handlers.goToMap
    },
    {
      id: 'vet-hospital', group: 'explore', size: 'standard', emoji: '🏥',
      title: 'Dierenziekenhuis',
      subtitle: 'Help Dokter Ridheya zieke dieren beter maken!',
      theme: THEMES.explore, onClick: handlers.openVetHospital
    },
    // Progress
    {
      id: 'rpg-adventure', group: 'progress', size: 'xl', emoji: ctx.rpgEmoji,
      title: ctx.rpgTitle,
      subtitle: ctx.rpgSubtitle,
      theme: THEMES.progress, onClick: handlers.openRpgAdventure
    },
    {
      id: 'badges', group: 'progress', size: 'standard', emoji: '🏅',
      title: 'Medailles',
      subtitle: 'Bekijk al je verdiende badges en prestaties!',
      theme: THEMES.progress, onClick: handlers.goToBadges
    },
    {
      id: 'scoreboard', group: 'progress', size: 'standard', emoji: '📊',
      title: 'Ouder Scorebord',
      subtitle: 'Bekijk de voortgang en statistieken van je kind!',
      theme: THEMES.progress, onClick: handlers.openScoreboard
    }
  ];
}

export const HOME_TILE_GROUP_LABELS: Record<HomeTileGroup, string> = {
  learn: '📖 Leren',
  play: '🎮 Spelen',
  explore: '🧭 Ontdekken',
  progress: '🏆 Voortgang'
};
