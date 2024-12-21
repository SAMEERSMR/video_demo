import { useState, useCallback } from 'react';

export const useVideoControls = () => {
  const [showControls, setShowControls] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowControls(false);
  }, []);

  return {
    showControls,
    handleMouseEnter,
    handleMouseLeave,
  };
}; 