import { useState, RefObject, useCallback } from 'react';

interface PlayerState {
  isPlaying: boolean;
  progress: number;
  isMuted: boolean;
}

export const useVideoPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: true,
    progress: 0,
    isMuted: true,
  });

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!playerState.isPlaying) {
        await video.play();
        setPlayerState(prev => ({ ...prev, isPlaying: true }));
      } else {
        video.pause();
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error toggling play:', error);
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      }
    }
  }, [playerState.isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setPlayerState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const progress = (video.currentTime / video.duration) * 100;
    setPlayerState(prev => ({
      ...prev,
      progress,
    }));
  }, []);

  const handleVideoProgress = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (value / 100) * video.duration;
    video.currentTime = time;
    setPlayerState(prev => ({
      ...prev,
      progress: value,
    }));
  }, []);

  const resetPlayer = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setPlayerState(prev => ({
      ...prev,
      progress: 0,
      isPlaying: false,
    }));
  }, []);

  return {
    playerState,
    togglePlay,
    handleTimeUpdate,
    handleVideoProgress,
    toggleMute,
    resetPlayer,
  };
}; 