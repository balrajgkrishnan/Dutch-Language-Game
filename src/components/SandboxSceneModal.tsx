import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X, Volume2, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { Building, PlayerProfile, SceneItem, MiniQuest } from '../types';
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
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [labelItem, setLabelItem] = useState<SceneItem | null>(null);
  const [customerMessage, setCustomerMessage] = useState<{ characterId: string; text: string } | null>(null);
  const [justCompletedQuest, setJustCompletedQuest] = useState<MiniQuest | null>(null);

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

  if (!isOpen) return null;

  // nextPlaced/nextTransformed are optional and, when omitted, preserve
  // whatever is already persisted -- callers that only need to update
  // completedQuests (e.g. completeQuest) must NOT pass a stale copy of
  // placedItemIds from their own render closure, or they'll clobber a value
  // a sibling call just wrote moments earlier in the same event handler.
  const persistBuildingState = (nextPlaced?: string[], nextCompletedQuests?: string[], nextTransformed?: string[]) => {
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
              transformedItems: nextTransformed ?? prevBuildingState?.transformedItems ?? []
            }
          }
        }
      };
    });
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

  const handleDragEnd = (item: SceneItem, info: PanInfo) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Characters first (serve interactions take priority over zones). Uses
    // real DOM rects (with generous padding) rather than the layout's slot
    // percentages -- the avatar renders below the character's nominal slot
    // position (pushed down by its speech bubble), so a percentage-distance
    // check against the raw slot anchor missed real drops onto the avatar.
    const padding = 24;
    for (const character of building.characters) {
      const el = sceneRef.current?.querySelector(`[data-character-id="${character.id}"]`);
      const charRect = el?.getBoundingClientRect();
      if (!charRect) continue;
      const withinCharacter =
        info.point.x >= charRect.left - padding &&
        info.point.x <= charRect.right + padding &&
        info.point.y >= charRect.top - padding &&
        info.point.y <= charRect.bottom + padding;
      if (withinCharacter) {
        const openRequest = character.requests.find(r => !satisfiedRequestIds.includes(r.id));
        if (openRequest) {
          handleServe(character.id, openRequest.id, item.id);
          return;
        }
      }
    }

    const dropXPercent = ((info.point.x - rect.left) / rect.width) * 100;
    const dropYPercent = ((info.point.y - rect.top) / rect.height) * 100;

    const zone = building.dropZones.find(
      z =>
        dropXPercent >= z.position.x &&
        dropXPercent <= z.position.x + z.position.width &&
        dropYPercent >= z.position.y &&
        dropYPercent <= z.position.y + z.position.height
    );
    if (!zone || !zone.acceptsItemIds.includes(item.id)) return;

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

        {/* Quest checklist strip */}
        <div className="bg-amber-50/80 border-b border-amber-200/70 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {building.quests.map(q => {
            const done = completedQuestIds.includes(q.id);
            return (
              <span
                key={q.id}
                className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full whitespace-nowrap border flex items-center gap-1 ${
                  done ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-amber-800 border-amber-300'
                }`}
                title={q.promptNl}
              >
                {done && <CheckCircle2 className="w-3 h-3" />}
                {q.promptNl.length > 30 ? `${q.promptNl.slice(0, 30)}...` : q.promptNl}
              </span>
            );
          })}
        </div>

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
          {/* Drop zones */}
          {building.dropZones.map(zone => (
            <div
              key={zone.id}
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

          {/* Characters */}
          {building.characters.map((character, index) => {
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
          {visibleItems.map(item => {
            const zoneForPlaced = item.transformsInto
              ? undefined
              : building.dropZones.find(z => z.acceptsItemIds.includes(item.id) && placedItemIds.includes(item.id));
            const renderPos = zoneForPlaced
              ? { x: zoneForPlaced.position.x + zoneForPlaced.position.width / 2, y: zoneForPlaced.position.y + zoneForPlaced.position.height / 2 }
              : item.position;

            return (
              <motion.div
                key={item.id}
                drag={item.draggable}
                dragConstraints={sceneRef}
                dragMomentum={false}
                onDragEnd={(_e, info) => handleDragEnd(item, info)}
                onClick={() => handleTapItem(item)}
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
