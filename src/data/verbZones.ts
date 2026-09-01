import { PlayerProfile, VerbItem, ZoneRewardAnimal } from '../types';
import { WERKWOORDEN_DATA, getZoneIndex, getVerbsInZone, getTotalZoneCount } from './werkwoorden';

export interface ZoneMeta {
  index: number;
  title: string;
  tierLabel: 'beginner' | 'intermediate' | 'advanced';
  reward: ZoneRewardAnimal;
}

// A dedicated small roster, separate from the 73-animal expedition/sanctuary
// roster in biomeAnimals.ts, so the two unlock systems never collide.
export const ZONE_REWARDS: ZoneMeta[] = [
  { index: 0, title: 'Zone 1: Eerste Stappen', tierLabel: 'beginner', reward: { id: 'zone-muis', name: 'Milo het Muisje', title: 'De Nieuwsgierige Beginner', emoji: '🐭' } },
  { index: 1, title: 'Zone 2: Groeiende Moed', tierLabel: 'beginner', reward: { id: 'zone-egel', name: 'Eef de Egel', title: 'De Volhoudende Ontdekker', emoji: '🦔' } },
  { index: 2, title: 'Zone 3: Sterke Basis', tierLabel: 'beginner', reward: { id: 'zone-vos', name: 'Finn de Vos', title: 'De Slimme Speurder', emoji: '🦊' } },
  { index: 3, title: 'Zone 4: Verder Bouwen', tierLabel: 'intermediate', reward: { id: 'zone-das', name: 'Daan de Das', title: 'De Vastberaden Bouwer', emoji: '🦡' } },
  { index: 4, title: 'Zone 5: Nieuwe Uitdagingen', tierLabel: 'intermediate', reward: { id: 'zone-otter', name: 'Ollie de Otter', title: 'De Vrolijke Doorzetter', emoji: '🦦' } },
  { index: 5, title: 'Zone 6: Klimmende Kennis', tierLabel: 'intermediate', reward: { id: 'zone-lynx', name: 'Luna de Lynx', title: 'De Scherpe Waarnemer', emoji: '🐆' } },
  { index: 6, title: 'Zone 7: Woordmeester in Wording', tierLabel: 'intermediate', reward: { id: 'zone-havik', name: 'Hugo de Havik', title: 'De Alziende Verkenner', emoji: '🦅' } },
  { index: 7, title: 'Zone 8: Gevorderde Grammatica', tierLabel: 'advanced', reward: { id: 'zone-wolf', name: 'Wilma de Wolf', title: 'De Wijze Strijder', emoji: '🐺' } },
  { index: 8, title: 'Zone 9: Meesterlijke Werkwoorden', tierLabel: 'advanced', reward: { id: 'zone-beer', name: 'Boris de Beer', title: 'De Machtige Meester', emoji: '🐻' } },
  { index: 9, title: 'Zone 10: Grootmeester Sterke Werkwoorden', tierLabel: 'advanced', reward: { id: 'zone-draak', name: 'Drika de Draak', title: 'De Legendarische Grootmeester', emoji: '🐉' } },
];

/** A verb counts as mastered once it's been answered fully correctly at least once. */
function isVerbMastered(verb: VerbItem, profile: PlayerProfile): boolean {
  return profile.questionHistory?.[`verb-${verb.infinitief}`]?.wasCorrect === true;
}

export function getZoneProgress(zoneIndex: number, profile: PlayerProfile): { mastered: number; total: number } {
  const verbs = getVerbsInZone(zoneIndex, WERKWOORDEN_DATA);
  return {
    mastered: verbs.filter(v => isVerbMastered(v, profile)).length,
    total: verbs.length
  };
}

export function isZoneComplete(zoneIndex: number, profile: PlayerProfile): boolean {
  const { mastered, total } = getZoneProgress(zoneIndex, profile);
  return total > 0 && mastered === total;
}

export function isZoneUnlocked(zoneIndex: number, profile: PlayerProfile): boolean {
  if (zoneIndex === 0) return true;
  return isZoneComplete(zoneIndex - 1, profile);
}

export function getZoneMeta(zoneIndex: number): ZoneMeta | undefined {
  return ZONE_REWARDS.find(z => z.index === zoneIndex);
}

/**
 * Picks the next verb to quiz within a zone. Always serves a not-yet-mastered
 * verb (whichever was least recently attempted, or never attempted), so a
 * verb that's already been answered correctly never crowds out one that
 * still needs work. Root-cause fix for zone progress feeling "stuck": the
 * previous cycleIndex-modulo-into-all-20-verbs approach made a wrong verb's
 * retry wait for a full lap through every verb in the zone (including
 * already-mastered ones), not just the still-needed ones.
 */
export function pickNextVerbInZone(zoneVerbs: VerbItem[], profile: PlayerProfile): VerbItem | undefined {
  if (zoneVerbs.length === 0) return undefined;
  const notYetMastered = zoneVerbs.filter(v => !isVerbMastered(v, profile));
  const pool = notYetMastered.length > 0 ? notYetMastered : zoneVerbs;
  const history = profile.questionHistory || {};
  return [...pool].sort((a, b) => {
    const aSeen = history[`verb-${a.infinitief}`]?.lastSeen ?? 0;
    const bSeen = history[`verb-${b.infinitief}`]?.lastSeen ?? 0;
    return aSeen - bSeen;
  })[0];
}

export { getZoneIndex, getVerbsInZone, getTotalZoneCount };
