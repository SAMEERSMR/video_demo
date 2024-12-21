import { useState } from 'react';
import { Box, Slider } from '@mantine/core';

interface VideoProgressBarProps {
  progress: number;
  onChange: (value: number) => void;
}

export function VideoProgressBar({ progress, onChange }: VideoProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Box px="xs">
      <Slider
        value={progress}
        onChange={onChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        styles={(theme) => ({
          track: {
            backgroundColor: theme.colors.gray[2],
            height: 4,
          },
          bar: {
            backgroundColor: theme.colors.blue[6],
            height: 4,
          },
          thumb: {
            display: isDragging ? 'block' : 'none',
            borderWidth: 2,
            backgroundColor: theme.white,
            borderColor: theme.colors.blue[6],
            width: 12,
            height: 12,
          },
        })}
      />
    </Box>
  );
} 