import { useRef, useState, useEffect, useMemo } from 'react';
import { Box, Stack } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { useVideoControls } from '../../hooks/useVideoControls';
import { VideoProgressBar } from './VideoProgressBar';
import { NavigationButton } from '../Controls/NavigationButton';
import { ControlsOverlay } from '../Controls/ControlsOverlay';
import styles from './VideoPlayer.module.css';

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
    toggleMute,
    resetPlayer,
  } = useVideoPlayer(videoRef);

  const {
    showControls,
    handleMouseEnter,
    handleMouseLeave,
  } = useVideoControls();

  const carouselStyles = useMemo(() => ({
    root: { 
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '8px',
    },
    viewport: { 
      height: '100%',
    },
    slide: { 
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    container: { 
      height: '100%',
      transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    control: {
      '&[data-inactive]': {
        opacity: 0,
        cursor: 'default',
      },
      '&[data-orientation="vertical"]': {
        transform: 'rotate(90deg)',
        zIndex: 2,
        transition: 'opacity 300ms ease',
      },
    },
  }), []);

  const videoStyle = useMemo(() => ({ 
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: '8px',
  }), []);

  const handleSlideChange = (index: number) => {
    if (videoRef.current) {
      videoRef.current.pause(); 
    }
    setCurrentVideoIndex(index);
    resetPlayer(); 
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      handleSlideChange(currentVideoIndex + 1);
    } else {
      resetPlayer(); 
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.src = videos[currentVideoIndex].url;
      videoElement.load();
      videoElement.muted = playerState.isMuted;
      videoElement.play().catch(console.error);
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [currentVideoIndex, videos]);

  const videoElements = useMemo(() => (
    videos.map((video, index) => (
      <Carousel.Slide key={video.url}>
        <video
          ref={index === currentVideoIndex ? videoRef : undefined}
          src={video.url}
          onTimeUpdate={handleTimeUpdate}
          style={videoStyle}
          controls={false}
          onEnded={handleNext}
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          muted={playerState.isMuted}
        />
      </Carousel.Slide>
    ))
  ), [videos, currentVideoIndex, videoStyle, handleTimeUpdate, handleNext, playerState.isMuted]);

  return (
    <Stack gap="xs" className={styles.container}>
      <Box className={styles.videoBox} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Carousel
          withControls={false}
          loop={false}
          withIndicators={false}
          draggable={false}
          slideSize="100%"
          align="center"
          orientation="vertical"
          initialSlide={currentVideoIndex}
          onSlideChange={handleSlideChange}
          styles={carouselStyles}
        >
          {videoElements}
        </Carousel>
        
        <VideoProgressBar
          progress={playerState.progress}
          onChange={handleVideoProgress}
          duration={videoRef.current?.duration || 0}
        />
        
        <NavigationButton
          direction="prev"
          onClick={() => handleSlideChange(currentVideoIndex - 1)}
          disabled={currentVideoIndex === 0}
        />
        <NavigationButton
          direction="next"
          onClick={() => handleSlideChange(currentVideoIndex + 1)}
          disabled={currentVideoIndex === videos.length - 1}
        />

        <ControlsOverlay
          isVisible={showControls}
          isPlaying={playerState.isPlaying}
          isMuted={playerState.isMuted}
          onPlayPause={togglePlay}
          onMuteToggle={toggleMute}
        />
      </Box>
    </Stack>
  );
} 