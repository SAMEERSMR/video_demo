import { useState, RefObject } from 'react';

interface PlayerState {
  isPlaying: boolean;
  progress: number;
  speed: number;
}

export const useVideoPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    progress: 0,
    speed: 1,
  });

  const togglePlay = () => {
    if (videoRef.current) {
      setPlayerState({
        ...playerState,
        isPlaying: !playerState.isPlaying,
      });

      if (!playerState.isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = 
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setPlayerState({
        ...playerState,
        progress,
      });
    }
  };

  const handleVideoProgress = (value: number) => {
    if (videoRef.current) {
      const time = (value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setPlayerState({
        ...playerState,
        progress: value,
      });
    }
  };

  const handleVideoSpeed = (value: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = value;
      setPlayerState({
        ...playerState,
        speed: value,
      });
    }
  };

  return {
    playerState,
    togglePlay,
    handleTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
  };
}; 