import React, { useState, useRef, useEffect } from 'react';
import { lookupDutchWord } from '../services/dutchDictionaryService';
import { DictionaryEntry } from '../data/dutchDictionaryData';
import { DutchDictionaryTooltip } from './DutchDictionaryTooltip';

interface InteractiveDutchTextProps {
  text: string;
  className?: string;
  highlightBold?: boolean; // Highlight **bold** target words with special styling
  onWordClick?: (word: string, entry: DictionaryEntry) => void;
}

export const InteractiveDutchText: React.FC<InteractiveDutchTextProps> = ({
  text,
  className = '',
  highlightBold = true,
  onWordClick
}) => {
  const [activeEntry, setActiveEntry] = useState<DictionaryEntry | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#dutch-dictionary-tooltip-container') && !target.closest('.interactive-dutch-word')) {
        setActiveEntry(null);
        setTooltipPosition(null);
        setIsPinned(false);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleMouseEnterWord = (rawWord: string, e: React.MouseEvent<HTMLSpanElement>) => {
    if (isPinned) return;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top
    };

    hoverTimerRef.current = setTimeout(() => {
      const entry = lookupDutchWord(rawWord);
      setActiveEntry(entry);
      setTooltipPosition(position);
    }, 120);
  };

  const handleMouseLeaveWord = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    if (!isPinned) {
      // Small grace delay before hiding tooltip
      hoverTimerRef.current = setTimeout(() => {
        setActiveEntry(null);
        setTooltipPosition(null);
      }, 350);
    }
  };

  const handleClickWord = (rawWord: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top
    };

    const entry = lookupDutchWord(rawWord);
    setActiveEntry(entry);
    setTooltipPosition(position);
    setIsPinned(true);

    if (onWordClick) {
      onWordClick(rawWord, entry);
    }
  };

  // Parse text into tokens (bold words vs regular words vs whitespace)
  const parseTokens = () => {
    if (!text) return [];

    // Split by markdown bold (**...**) and whitespace/punctuation
    const parts = text.split(/(\*\*.*?\*\*|\n+|\s+)/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // Handle newlines
      if (part.includes('\n')) {
        return <br key={index} />;
      }

      // Check if it's whitespace
      if (/^\s+$/.test(part)) {
        return <span key={index}>{part}</span>;
      }

      // Check if it is a markdown bold target word
      const isBold = part.startsWith('**') && part.endsWith('**');
      const cleanWord = isBold ? part.slice(2, -2) : part;

      // Split into words and punctuation
      const subTokens = cleanWord.split(/([a-zA-Z0-9áéíóúäëïöüÁÉÍÓÚÄËÏÖÜ-]+|[.,!?:;'"”’»)_*`~]+)/g);

      return (
        <span key={index} className={isBold && highlightBold ? 'font-bold' : ''}>
          {subTokens.map((sub, sIdx) => {
            if (!sub) return null;

            const isWord = /[a-zA-Z0-9áéíóúäëïöüÁÉÍÓÚÄËÏÖÜ]/.test(sub);

            if (isWord) {
              return (
                <span
                  key={sIdx}
                  onMouseEnter={(e) => handleMouseEnterWord(sub, e)}
                  onMouseLeave={handleMouseLeaveWord}
                  onClick={(e) => handleClickWord(sub, e)}
                  className={`interactive-dutch-word inline-block transition-all duration-150 cursor-pointer rounded-xs px-0.5 select-text ${
                    isBold
                      ? 'bg-amber-100/90 text-amber-950 font-black border-b-2 border-amber-400 hover:bg-amber-200'
                      : 'hover:bg-amber-50 hover:text-amber-900 hover:underline hover:decoration-amber-400 hover:decoration-dotted hover:underline-offset-3'
                  }`}
                  title={`Klik of zweef voor betekenis: ${sub}`}
                >
                  {sub}
                </span>
              );
            }

            // Normal punctuation or symbol
            return <span key={sIdx}>{sub}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <>
      <span className={`interactive-dutch-text-root ${className}`}>
        {parseTokens()}
      </span>

      {/* Floating Dictionary Popover */}
      <DutchDictionaryTooltip
        entry={activeEntry}
        position={tooltipPosition}
        onClose={() => {
          setActiveEntry(null);
          setTooltipPosition(null);
          setIsPinned(false);
        }}
        isPinned={isPinned}
      />
    </>
  );
};
