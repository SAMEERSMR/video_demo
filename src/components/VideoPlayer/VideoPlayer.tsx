import { useRef, useState, useEffect } from 'react';
import { Box, Group, ActionIcon, Slider, Stack } from '@mantine/core';
import { IconPlayerTrackNext, IconPlayerTrackPrev, IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';
import { useVideoPlayer } from './useVideoPlayer';
import { VideoProgressBar } from './VideoProgressBar';

interface VideoPlayerProps {
  videos: {
    url: string;
    title: string;
  }[];
}

export function VideoPlayer({ videos }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    playerState,
    togglePlay,
    handleTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
  } = useVideoPlayer(videoRef);

  const handleNext = () => {
    setCurrentVideoIndex((prev) => 
      prev === videos.length - 1 ? prev : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => 
      prev === 0 ? prev : prev - 1
    );
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideoIndex].url;
    }
  }, [currentVideoIndex, videos]);

  return (
    <Stack spacing="xs">
      <Box pos="relative">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Box>

      <VideoProgressBar
        progress={playerState.progress}
        onChange={handleVideoProgress}
      />

      <Group position="apart">
        <Group spacing="xs">
          <ActionIcon 
            variant="filled" 
            onClick={handlePrevious}
            disabled={currentVideoIndex === 0}
          >
            <IconPlayerTrackPrev size={16} />
          </ActionIcon>

          <ActionIcon 
            variant="filled" 
            onClick={togglePlay}
          >
            {playerState.isPlaying ? (
              <IconPlayerPause size={16} />
            ) : (
              <IconPlayerPlay size={16} />
            )}
          </ActionIcon>

          <ActionIcon 
            variant="filled" 
            onClick={handleNext}
            disabled={currentVideoIndex === videos.length - 1}
          >
            <IconPlayerTrackNext size={16} />
          </ActionIcon>
        </Group>

        <Slider
          label={`${playerState.speed}x`}
          min={0.5}
          max={2}
          step={0.25}
          value={playerState.speed}
          onChange={handleVideoSpeed}
          style={{ width: '100px' }}
        />
      </Group>
    </Stack>
  );
} 