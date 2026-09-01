import { useEffect, useRef, useState } from 'react';
import { sound } from '../services/soundService';

/**
 * Fullscreen toggle for a modal's outer container, using the real browser
 * Fullscreen API (falls back to a plain state toggle in sandboxed iframes
 * where requestFullscreen isn't available). Attach `containerRef` to the
 * element that should go fullscreen.
 */
export function useFullscreen<T extends HTMLElement = HTMLDivElement>() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    sound.playPop();
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          const el = containerRef.current as any;
          if (el.requestFullscreen) {
            await el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            await el.webkitRequestFullscreen();
          } else if (el.msRequestFullscreen) {
            await el.msRequestFullscreen();
          } else {
            setIsFullscreen(prev => !prev);
          }
        } else {
          setIsFullscreen(prev => !prev);
        }
      } else {
        const doc = document as any;
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      // Fallback for sandboxed iframe environments
      setIsFullscreen(prev => !prev);
    }
  };

  return { isFullscreen, containerRef, toggleFullscreen };
}
