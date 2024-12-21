import React, { useState, useCallback } from 'react';
import { Box, Slider, Text } from '@mantine/core';
import styles from './VideoPlayer.module.css';

interface VideoProgressBarProps {
  progress: number;
  onChange: (value: number) => void;
  duration?: number;
}

export function VideoProgressBar({ progress, onChange, duration = 0 }: VideoProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;
    setHoverValue(position * duration);
  }, [duration]);

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const currentTime = (progress / 100) * duration;

  return (
    <Box className={styles.progressBarContainer}>
      <Box
        onMouseMove={handleMouseMove}
        onMouseLeave={(_e) => {
          handleMouseLeave();
        }}
        className={styles.progressBarWrapper}
      >
        <Box className={`${styles.progressTooltip} ${styles.currentTimeTooltip}`}>
          <Text size="xs" color="white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </Box>

        <Slider
          value={isNaN(progress) ? 0 : progress}
          onChange={onChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          size="xs"
          label={null}
          classNames={{
            root: styles.progressSlider,
            track: styles.progressTrack,
            bar: styles.progressBar,
            thumb: `${styles.progressThumb} ${isDragging ? styles.progressThumbDragging : styles.progressThumbIdle}`,
          }}
        />
        
        {hoverValue !== null && (
          <Box
            className={styles.progressTooltip}
            style={{ left: `${((hoverValue ?? 0) / duration) * 100}%` }}
          >
            <Text size="xs" color="white">
              {formatTime(hoverValue)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
} 