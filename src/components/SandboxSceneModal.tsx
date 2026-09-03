import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X, Volume2, Maximize2, Minimize2, CheckCircle2, RotateCcw } from 'lucide-react';
import { Building, PlayerProfile, SceneItem, MiniQuest, PlacedFurniture } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { ALL_BIOME_ANIMALS } from '../data/biomeAnimals';
import { sound } from '../services/soundService';
import { speech } from '../services/speechService';
import { useFullscreen } from '../hooks/useFullscreen';
import confetti from 'canvas-confetti';

interface SandboxSceneModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: Building;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

// ponytail: characters don't have an authored position in the data model
// (the pilot has at most 3 customers) -- laid out evenly along the top of
// the scene here rather than adding a position field nothing else needs yet.
function characterSlot(index: number, total: number): { x: number; y: number } {
  const spacing = 100 / (total + 1);
  return { x: spacing * (index + 1), y: 18 };
}

export const SandboxSceneModal: React.FC<SandboxSceneModalProps> = ({
  isOpen,
  onClose,
  building,
  profile,
  onUpdateProfile
}) => {
  const { isFullscreen, containerRef, toggleFullscreen } = useFullscreen<HTMLDivElement>();
  const sceneRef = useRef<HTMLDivElement>(null);

  const [placedItemIds, setPlacedItemIds] = useState<string[]>([]);
  const [transformedAwayIds, setTransformedAwayIds] = useState<string[]>([]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [tappedItemIds, setTappedItemIds] = useState<string[]>([]);
  const [satisfiedRequestIds, setSatisfiedRequestIds] = useState<string[]>([]);
  const [consumedItemIds, setConsumedItemIds] = useState<string[]>([]);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [labelItem, setLabelItem] = useState<SceneItem | null>(null);
  const [customerMessage, setCustomerMessage] = useState<{ characterId: string; text: string } | null>(null);
  const [justCompletedQuest, setJustCompletedQuest] = useState<MiniQuest | null>(null);
  const [furnitureLabelId, setFurnitureLabelId] = useState<string | null>(null);
  // Framer Motion tracks drag position as an internal transform separate
  // from React's render, which never gets cleared just because `left`/`top`
  // change -- bumping a per-item key forces a clean remount after every
  // drag gesture (success or fail) so the visual position always matches
  // the logical one instead of drifting from leftover drag offset.
  const [dragResetTick, setDragResetTick] = useState<Record<string, number>>({});

  // Design phase: furniture placement, before customers arrive.
  const [placedFurniture, setPlacedFurniture] = useState<PlacedFurniture[]>([]);
  const [isOpenForCustomers, setIsOpenForCustomers] = useState(true);
  const [furnitureDragResetTick, setFurnitureDragResetTick] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isOpen) return;
    const state = profile.nederlandsWereldProgress?.buildingStates?.[building.id];
    const placed = state?.placedItems || [];
    const transformed = state?.transformedItems || [];
    setPlacedItemIds(placed);
    setTransformedAwayIds(transformed);
    setRevealedIds(
      building.items.filter(i => transformed.includes(i.id) && i.transformsInto).map(i => i.transformsInto!)
    );
    setCompletedQuestIds(profile.nederlandsWereldProgress?.completedQuests || []);
    setTappedItemIds([]);
    setSatisfiedRequestIds([]);
    setConsumedItemIds([]);
    setPlacedFurniture(state?.placedFurniture || []);
    // Buildings with no furniture palette skip the design phase entirely.
    setIsOpenForCustomers(!building.furniturePalette || (state?.isOpenForCustomers ?? false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, building.id]);

  useEffect(() => {
    if (!isOpen || building.ambientPhrases.length === 0) return;
    speech.speak(building.ambientPhrases[0].nl, { rate: 0.9 });
    const interval = setInterval(() => {
      const phrase = building.ambientPhrases[Math.floor(Math.random() * building.ambientPhrases.length)];
      speech.speak(phrase.nl, { rate: 0.9 });
    }, 35000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, building.id]);

  // nextPlaced/nextTransformed are optional and, when omitted, preserve
  // whatever is already persisted -- callers that only need to update
  // completedQuests (e.g. completeQuest) must NOT pass a stale copy of
  // placedItemIds from their own render closure, or they'll clobber a value
  // a sibling call just wrote moments earlier in the same event handler.
  // (Defined above the `if (!isOpen) return null` guard below because the
  // furniture-persistence effect further down needs to call it, and hooks
  // can't follow a conditional return.)
  const persistBuildingState = (
    nextPlaced?: string[],
    nextCompletedQuests?: string[],
    nextTransformed?: string[],
    nextFurniture?: PlacedFurniture[],
    nextIsOpen?: boolean
  ) => {
    onUpdateProfile(prev => {
      const prevProgress = prev.nederlandsWereldProgress || {
        unlockedBuildings: ['bakery'],
        completedQuests: [],
        buildingStates: {}
      };
      const prevBuildingState = prevProgress.buildingStates[building.id];
      return {
        ...prev,
        nederlandsWereldProgress: {
          ...prevProgress,
          completedQuests: nextCompletedQuests ?? prevProgress.completedQuests,
          buildingStates: {
            ...prevProgress.buildingStates,
            [building.id]: {
              placedItems: nextPlaced ?? prevBuildingState?.placedItems ?? [],
              transformedItems: nextTransformed ?? prevBuildingState?.transformedItems ?? [],
              placedFurniture: nextFurniture ?? prevBuildingState?.placedFurniture ?? [],
              isOpenForCustomers: nextIsOpen ?? prevBuildingState?.isOpenForCustomers ?? false
            }
          }
        }
      };
    });
  };

  // Persists placedFurniture whenever it changes, rather than from inside
  // the drag/remove handlers directly -- calling onUpdateProfile (parent
  // state) synchronously from inside setPlacedFurniture's updater callback
  // (needed there to read the true latest `prev` and avoid a stale-closure
  // race across rapid consecutive drags) trips React's "Cannot update a
  // component while rendering a different component" warning. An effect
  // keyed on the value itself sidesteps that while still always persisting
  // the latest state.
  useEffect(() => {
    if (!isOpen) return;
    persistBuildingState(undefined, undefined, undefined, placedFurniture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, placedFurniture]);

  if (!isOpen) return null;

  const handleResetBuilding = () => {
    speech.stop();
    setPlacedItemIds([]);
    setTransformedAwayIds([]);
    setRevealedIds([]);
    setTappedItemIds([]);
    setSatisfiedRequestIds([]);
    setConsumedItemIds([]);
    setCompletedQuestIds(prev => prev.filter(id => !building.quests.some(q => q.id === id)));
    setDragResetTick({});
    setFurnitureDragResetTick({});
    setJustCompletedQuest(null);
    setCustomerMessage(null);
    setLabelItem(null);
    setPlacedFurniture([]);
    setIsOpenForCustomers(!building.furniturePalette);
    sound.playPop();

    const buildingQuestIds = building.quests.map(q => q.id);
    onUpdateProfile(prev => {
      const prevProgress = prev.nederlandsWereldProgress;
      if (!prevProgress) return prev;
      return {
        ...prev,
        nederlandsWereldProgress: {
          ...prevProgress,
          completedQuests: prevProgress.completedQuests.filter(id => !buildingQuestIds.includes(id)),
          buildingStates: {
            ...prevProgress.buildingStates,
            [building.id]: { placedItems: [], transformedItems: [], placedFurniture: [], isOpenForCustomers: false }
          }
        }
      };
    });
  };

  const essentialPlacedCount = placedFurniture.filter(pf =>
    building.furniturePalette?.find(f => f.id === pf.furnitureId)?.essential
  ).length;
  const minEssentialToOpen = building.minEssentialToOpen ?? 3;

  // All three handlers below update placedFurniture via the updater form,
  // reading `prev` fresh rather than the outer `placedFurniture` render
  // closure -- two drags fired back-to-back (plausible: a kid placing
  // several furniture pieces quickly) could otherwise both read the same
  // stale closure before either update commits, so the second drag would
  // silently overwrite the first instead of appending to it. Persistence
  // itself happens in the useEffect above, not here, to avoid updating the
  // parent profile from inside this component's own setState updater.
  const handleFurniturePaletteDragEnd = (piece: NonNullable<Building['furniturePalette']>[number], info: PanInfo) => {
    setFurnitureDragResetTick(prev => ({ ...prev, [`palette-${piece.id}`]: (prev[`palette-${piece.id}`] || 0) + 1 }));
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      info.point.x < rect.left || info.point.x > rect.right ||
      info.point.y < rect.top || info.point.y > rect.bottom
    ) {
      return; // dropped outside the scene -- tile just springs back to the palette
    }
    const xPercent = ((info.point.x - rect.left) / rect.width) * 100;
    const yPercent = ((info.point.y - rect.top) / rect.height) * 100;
    const instance: PlacedFurniture = {
      instanceId: `${piece.id}-${Date.now()}`,
      furnitureId: piece.id,
      x: Math.max(5, Math.min(95, xPercent)),
      y: Math.max(5, Math.min(95, yPercent))
    };
    setPlacedFurniture(prev => [...prev, instance]);
    sound.playPop();
  };

  const handlePlacedFurnitureDragEnd = (instanceId: string, info: PanInfo) => {
    setFurnitureDragResetTick(prev => ({ ...prev, [instanceId]: (prev[instanceId] || 0) + 1 }));
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPercent = Math.max(5, Math.min(95, ((info.point.x - rect.left) / rect.width) * 100));
    const yPercent = Math.max(5, Math.min(95, ((info.point.y - rect.top) / rect.height) * 100));
    setPlacedFurniture(prev => prev.map(pf => (pf.instanceId === instanceId ? { ...pf, x: xPercent, y: yPercent } : pf)));
  };

  const handleRemoveFurniture = (instanceId: string) => {
    sound.playPop();
    setPlacedFurniture(prev => prev.filter(pf => pf.instanceId !== instanceId));
  };

  const handleOpenForCustomers = () => {
    setIsOpenForCustomers(true);
    persistBuildingState(undefined, undefined, undefined, undefined, true);
    sound.playVictory();
    confetti({ particleCount: 60, spread: 80 });
    speech.speak('De bakkerij is nu open voor klanten!', { rate: 0.9 });
  };

  const handleTapFurniture = (piece: NonNullable<Building['furniturePalette']>[number]) => {
    sound.playPop();
    speech.speak(piece.vocab.audioText || piece.vocab.word, { rate: 0.85 });
    recordWordHeard(piece.vocab.word);
    setFurnitureLabelId(piece.id);
    setTimeout(() => setFurnitureLabelId(prev => (prev === piece.id ? null : prev)), 2500);
  };

  const recordWordHeard = (word: string) => {
    onUpdateProfile(prev => {
      const stats = prev.nederlandsWereldWordStats || {};
      const existing = stats[word]?.heard || 0;
      return { ...prev, nederlandsWereldWordStats: { ...stats, [word]: { heard: existing + 1 } } };
    });
  };

  const rewardPlayer = (coins: number, stars: number) => {
    onUpdateProfile(prev => ({ ...prev, coins: prev.coins + coins, stars: prev.stars + stars, score: prev.score + coins }));
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    sound.playVictory();
  };

  const completeQuest = (quest: MiniQuest, completedListOverride?: string[]) => {
    const base = completedListOverride ?? completedQuestIds;
    if (base.includes(quest.id)) return;
    const next = [...base, quest.id];
    setCompletedQuestIds(next);
    persistBuildingState(undefined, next);
    rewardPlayer(quest.rewardCoins, quest.rewardStars);
    setJustCompletedQuest(quest);
    setTimeout(() => setJustCompletedQuest(prev => (prev?.id === quest.id ? null : prev)), 3500);
  };

  const checkQuestsAfterTap = (tapped: string[]) => {
    building.quests
      .filter(q => (q.type === 'collect' || q.type === 'discover') && !completedQuestIds.includes(q.id))
      .forEach(q => {
        if (q.requiredItemIds.every(id => tapped.includes(id))) completeQuest(q);
      });
  };

  const checkQuestsAfterPlace = (placed: string[]) => {
    building.quests
      .filter(q => q.type === 'place' && !completedQuestIds.includes(q.id))
      .forEach(q => {
        if (q.requiredItemIds.every(id => placed.includes(id))) completeQuest(q);
      });
  };

  const handleTapItem = (item: SceneItem) => {
    sound.playPop();
    speech.speak(item.vocab.audioText || item.vocab.word, { rate: 0.85 });
    recordWordHeard(item.vocab.word);
    setLabelItem(item);
    setTimeout(() => setLabelItem(prev => (prev?.id === item.id ? null : prev)), 2500);
    if (!tappedItemIds.includes(item.id)) {
      const next = [...tappedItemIds, item.id];
      setTappedItemIds(next);
      checkQuestsAfterTap(next);
    }
  };

  const handleServe = (characterId: string, requestId: string, itemId: string) => {
    const character = building.characters.find(c => c.id === characterId);
    const request = character?.requests.find(r => r.id === requestId);
    if (!request || satisfiedRequestIds.includes(requestId)) return;
    if (!request.requiredItemIds.includes(itemId)) return;

    const nextSatisfied = [...satisfiedRequestIds, requestId];
    setSatisfiedRequestIds(nextSatisfied);
    // The served item is handed to the customer -- it must stop rendering
    // (including in whatever zone it was previously placed in), or it looks
    // like giving it away silently failed and left it sitting in the basket.
    setConsumedItemIds(prev => [...prev, itemId]);
    if (placedItemIds.includes(itemId)) {
      const nextPlaced = placedItemIds.filter(id => id !== itemId);
      setPlacedItemIds(nextPlaced);
      persistBuildingState(nextPlaced, completedQuestIds);
    }
    setCustomerMessage({ characterId, text: request.thankYouNl });
    speech.speak(request.thankYouNl, { rate: 0.9 });
    sound.playCorrect();
    onUpdateProfile(prev => ({ ...prev, coins: prev.coins + request.rewardCoins }));
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 } });
    setTimeout(() => setCustomerMessage(null), 3000);

    building.quests
      .filter(q => q.type === 'serve' && q.requiredItemIds.includes(requestId))
      .forEach(q => completeQuest(q));
  };

  // Distance from a point to the nearest edge of a rect (0 if the point is
  // already inside it).
  const distanceToRect = (x: number, y: number, r: DOMRect): number => {
    const dx = Math.max(r.left - x, 0, x - r.right);
    const dy = Math.max(r.top - y, 0, y - r.bottom);
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleDragEnd = (item: SceneItem, info: PanInfo) => {
    // Always bump, regardless of whether the drop succeeds below, so the
    // item's motion.div remounts and Framer Motion's internal drag x/y
    // resets to match wherever it should actually render.
    setDragResetTick(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    if (!sceneRef.current) return;

    // Nearest-valid-target snapping rather than exact rect containment.
    // Rect-based hit-testing (even with generous padding) turned out to be
    // fragile across viewport sizes/fullscreen -- confirmed live: reports of
    // a drop registering on the wrong nearby item, and drops right next to
    // the basket not registering at all. Since each item only ever has ONE
    // real destination (only one zone accepts a given item id, likewise for
    // character requests), there's no ambiguity in always picking whichever
    // valid target is physically closest to the drop point -- it removes
    // pixel-precision as a requirement entirely.
    let bestCharacter: { characterId: string; requestId: string; distance: number } | null = null;
    for (const character of building.characters) {
      const openRequest = character.requests.find(r => !satisfiedRequestIds.includes(r.id));
      if (!openRequest || !openRequest.requiredItemIds.includes(item.id)) continue;
      const el = sceneRef.current?.querySelector(`[data-character-id="${character.id}"]`);
      const rect = el?.getBoundingClientRect();
      if (!rect) continue;
      const distance = distanceToRect(info.point.x, info.point.y, rect);
      if (!bestCharacter || distance < bestCharacter.distance) {
        bestCharacter = { characterId: character.id, requestId: openRequest.id, distance };
      }
    }

    let bestZone: { zone: (typeof building.dropZones)[number]; distance: number } | null = null;
    for (const z of building.dropZones) {
      if (!z.acceptsItemIds.includes(item.id)) continue;
      const el = sceneRef.current?.querySelector(`[data-zone-id="${z.id}"]`);
      const rect = el?.getBoundingClientRect();
      if (!rect) continue;
      const distance = distanceToRect(info.point.x, info.point.y, rect);
      if (!bestZone || distance < bestZone.distance) {
        bestZone = { zone: z, distance };
      }
    }

    // Generous, but not unlimited -- without a cap, a drop nowhere near
    // either valid target would still commit to whichever one happens to be
    // (however distantly) closer, which can silently match the wrong thing
    // on the opposite side of the scene. 320px is comfortably more than
    // enough slack for real imprecision without spanning the whole scene.
    const MAX_SNAP_DISTANCE = 320;
    if (bestCharacter && bestCharacter.distance > MAX_SNAP_DISTANCE) bestCharacter = null;
    if (bestZone && bestZone.distance > MAX_SNAP_DISTANCE) bestZone = null;

    if (!bestCharacter && !bestZone) return; // nothing close enough to count as a real attempt

    if (bestCharacter && (!bestZone || bestCharacter.distance <= bestZone.distance)) {
      handleServe(bestCharacter.characterId, bestCharacter.requestId, item.id);
      return;
    }

    sound.playCorrect();

    if (item.transformsInto) {
      // Reveal the transformed item at the spot where the transform happened
      // (e.g. bread appears where the dough was, at the oven) -- it is NOT
      // "placed" yet. The player still has to drag it into an accepting zone
      // (the basket) themselves for a 'place' quest to see it as delivered.
      const nextTransformed = [...transformedAwayIds, item.id];
      setTransformedAwayIds(nextTransformed);
      setRevealedIds(prev => [...prev, item.transformsInto!]);
      persistBuildingState(placedItemIds, completedQuestIds, nextTransformed);
      return;
    }

    if (!placedItemIds.includes(item.id)) {
      const nextPlaced = [...placedItemIds, item.id];
      setPlacedItemIds(nextPlaced);
      persistBuildingState(nextPlaced, completedQuestIds);
      checkQuestsAfterPlace(nextPlaced);
    }
  };

  const visibleItems = building.items.filter(item => {
    if (transformedAwayIds.includes(item.id)) return false;
    if (consumedItemIds.includes(item.id)) return false;
    if (item.hiddenUntilTransformed && !revealedIds.includes(item.id)) return false;
    return true;
  });

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-3 sm:p-4'} bg-slate-950/60 backdrop-blur-sm overflow-y-auto`}>
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`bg-white ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0'
            : 'w-full max-w-4xl rounded-3xl shadow-2xl border border-amber-100 max-h-[92vh]'
        } overflow-hidden flex flex-col`}
      >
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              {building.emoji}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">{building.name}</h3>
              <p className="text-xs text-amber-100 font-medium">Sleep, tik en ontdek Nederlandse woorden!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetBuilding}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
              title="Begin opnieuw"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
              title={isFullscreen ? 'Verlaat Volledig Scherm' : 'Volledig Scherm'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { speech.stop(); onClose(); }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quest checklist strip -- full text, no truncation (was cutting
            objectives off mid-word and making them unreadable); wraps to
            two lines instead of scrolling off-screen. Hidden during the
            design phase: every quest here is food/customer related and
            makes no sense before the bakery has opened. */}
        {isOpenForCustomers && (
        <div className="bg-amber-50/80 border-b border-amber-200/70 px-4 py-2 flex flex-wrap items-center gap-2">
          {building.quests.map(q => {
            const done = completedQuestIds.includes(q.id);
            return (
              <span
                key={q.id}
                className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border flex items-center gap-1.5 max-w-full ${
                  done ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-amber-800 border-amber-300'
                }`}
              >
                {done && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                <span>{q.promptNl}</span>
              </span>
            );
          })}
        </div>
        )}

        {/* Design phase: furniture palette + progress + open button */}
        {building.furniturePalette && !isOpenForCustomers && (
          <div className="bg-sky-50 border-b border-sky-200 px-4 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs font-black text-sky-800 uppercase">
                Richt de bakkerij in! Sleep meubels naar binnen.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-sky-700">
                  Geplaatst: {essentialPlacedCount}/{minEssentialToOpen} essentiële items
                </span>
                <button
                  onClick={handleOpenForCustomers}
                  disabled={essentialPlacedCount < minEssentialToOpen}
                  className="text-xs font-black uppercase px-3 py-1.5 rounded-full bg-emerald-500 text-white disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-emerald-600 transition-all"
                >
                  Open de Bakkerij!
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {building.furniturePalette.map(piece => (
                <motion.div
                  key={`palette-${piece.id}-${furnitureDragResetTick[`palette-${piece.id}`] || 0}`}
                  drag
                  dragSnapToOrigin
                  dragMomentum={false}
                  onDragEnd={(_e, info) => handleFurniturePaletteDragEnd(piece, info)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing bg-white rounded-xl border border-sky-200 shadow-sm px-2 py-1.5"
                  style={{ touchAction: 'none' }}
                >
                  {piece.imageUrl ? (
                    <img
                      src={piece.imageUrl}
                      alt={piece.vocab.word}
                      draggable={false}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      className="w-10 h-10 rounded-lg object-cover select-none pointer-events-none"
                    />
                  ) : (
                    <span className="text-2xl select-none pointer-events-none">{piece.emoji}</span>
                  )}
                  <span className="text-[9px] font-bold text-sky-700 select-none pointer-events-none">{piece.vocab.word}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Scene */}
        <div
          ref={sceneRef}
          className="relative flex-1 overflow-hidden bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200 min-h-[420px]"
          style={
            building.backgroundImageUrl
              ? { backgroundImage: `url(${building.backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
        >
          {/* Drop zones, characters and food items are the "open for
              customers" gameplay -- kept out of the design phase so kids
              furnish the room first, then customers arrive. */}
          {isOpenForCustomers && building.dropZones.map(zone => (
            <div
              key={zone.id}
              data-zone-id={zone.id}
              className="absolute rounded-2xl border-2 border-dashed border-amber-500/50 bg-amber-100/30 flex items-end justify-center pb-1"
              style={{
                left: `${zone.position.x}%`,
                top: `${zone.position.y}%`,
                width: `${zone.position.width}%`,
                height: `${zone.position.height}%`
              }}
            >
              <span className="text-[10px] font-black text-amber-700 uppercase bg-white/70 px-1.5 rounded">{zone.label}</span>
            </div>
          ))}

          {/* Placed furniture -- decor layer. Draggable/removable only during
              the design phase; once open for customers it's a static
              background layer and existing food-prep/customer mechanics
              render on top of it unchanged (no z-index set here, so items'
              explicit zIndex:10 always wins). */}
          {placedFurniture.map(pf => {
            const piece = building.furniturePalette?.find(p => p.id === pf.furnitureId);
            if (!piece) return null;
            return (
              <motion.div
                key={`${pf.instanceId}-${furnitureDragResetTick[pf.instanceId] || 0}`}
                drag={!isOpenForCustomers}
                dragConstraints={sceneRef}
                dragMomentum={false}
                onDragEnd={(_e, info) => handlePlacedFurnitureDragEnd(pf.instanceId, info)}
                onTap={() => handleTapFurniture(piece)}
                whileHover={!isOpenForCustomers ? { scale: 1.06 } : undefined}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${!isOpenForCustomers ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                style={{ left: `${pf.x}%`, top: `${pf.y}%` }}
              >
                {!isOpenForCustomers && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveFurniture(pf.instanceId); }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center shadow z-10"
                    title="Verwijder"
                  >
                    ×
                  </button>
                )}
                {piece.imageUrl ? (
                  <img
                    src={piece.imageUrl}
                    alt={piece.vocab.word}
                    draggable={false}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    className="w-14 h-14 rounded-xl object-cover shadow select-none pointer-events-none"
                  />
                ) : (
                  <span className="text-3xl select-none drop-shadow-md">{piece.emoji}</span>
                )}
                <AnimatePresence>
                  {furnitureLabelId === piece.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none"
                    >
                      {piece.vocab.article ? `${piece.vocab.article} ${piece.vocab.word}` : piece.vocab.word}
                      <span className="text-slate-300"> · {piece.vocab.english}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Characters */}
          {isOpenForCustomers && building.characters.map((character, index) => {
            const animal = ALL_BIOME_ANIMALS.find(a => a.id === character.animalId);
            const slot = characterSlot(index, building.characters.length);
            const openRequest = character.requests.find(r => !satisfiedRequestIds.includes(r.id));
            return (
              <div
                key={character.id}
                data-character-id={character.id}
                className="absolute flex flex-col items-center gap-1 -translate-x-1/2"
                style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
              >
                {openRequest && (
                  <div className="bg-white rounded-xl border-2 border-slate-200 shadow-md px-2.5 py-1.5 max-w-[140px] text-center mb-1">
                    <p className="text-[11px] font-bold text-slate-800">{openRequest.speechNl}</p>
                  </div>
                )}
                {customerMessage?.characterId === character.id && (
                  <div className="bg-emerald-500 text-white rounded-xl px-2.5 py-1 text-[11px] font-black mb-1">
                    {customerMessage.text}
                  </div>
                )}
                <AnimalAvatar animalId={character.animalId} size="md" isAnimated interactive={false} />
                <span className="text-[10px] font-black text-slate-700 bg-white/80 px-1.5 rounded">{animal?.name.split(' ')[0]}</span>
              </div>
            );
          })}

          {/* Items */}
          {isOpenForCustomers && visibleItems.map(item => {
            const zoneForPlaced = item.transformsInto
              ? undefined
              : building.dropZones.find(z => z.acceptsItemIds.includes(item.id) && placedItemIds.includes(item.id));
            // Multiple items can end up placed in the same zone (e.g. bread
            // AND cookie in the basket) -- rendering them all dead-center
            // stacked them exactly on top of each other, so only the topmost
            // one could actually be seen or grabbed again. Fan them out
            // horizontally by their order among items sharing that zone.
            let renderPos = zoneForPlaced ? { x: zoneForPlaced.position.x + zoneForPlaced.position.width / 2, y: zoneForPlaced.position.y + zoneForPlaced.position.height / 2 } : item.position;
            if (zoneForPlaced) {
              const siblings = building.items.filter(
                i => placedItemIds.includes(i.id) && building.dropZones.find(z => z.id === zoneForPlaced!.id && z.acceptsItemIds.includes(i.id))
              );
              const indexInZone = siblings.findIndex(i => i.id === item.id);
              const spacing = Math.min(6, zoneForPlaced.position.width / Math.max(siblings.length, 1));
              const offsetX = (indexInZone - (siblings.length - 1) / 2) * spacing;
              renderPos = { x: renderPos.x + offsetX, y: renderPos.y };
            }

            return (
              <motion.div
                key={`${item.id}-${dragResetTick[item.id] || 0}`}
                drag={item.draggable}
                dragConstraints={sceneRef}
                dragMomentum={false}
                onDragEnd={(_e, info) => handleDragEnd(item, info)}
                onTap={() => handleTapItem(item)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${item.draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                style={{ left: `${renderPos.x}%`, top: `${renderPos.y}%`, zIndex: 10 }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.vocab.word}
                    draggable={false}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md select-none pointer-events-none"
                  />
                ) : (
                  <span className="text-4xl sm:text-5xl select-none drop-shadow-md">{item.emoji}</span>
                )}

                <AnimatePresence>
                  {labelItem?.id === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none"
                    >
                      {item.vocab.article ? `${item.vocab.article} ${item.vocab.word}` : item.vocab.word}
                      <span className="text-slate-300"> · {item.vocab.english}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Quest completion toast */}
          <AnimatePresence>
            {justCompletedQuest && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-black text-sm px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 z-20"
              >
                <CheckCircle2 className="w-4 h-4" /> Opdracht voltooid! +{justCompletedQuest.rewardCoins} munten
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-500">
          <Volume2 className="w-3.5 h-3.5" /> Tik op een voorwerp om het woord te horen. Sleep voorwerpen naar de juiste plek!
        </div>
      </motion.div>
    </div>
  );
};
