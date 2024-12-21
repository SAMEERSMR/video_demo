import { Box } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { ControlButton } from './ControlButton';
import styles from './Controls.module.css';

interface ControlsOverlayProps {
  isVisible: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}

export const ControlsOverlay = ({
  isVisible,
  isPlaying,
  isMuted,
  onPlayPause,
  onMuteToggle,
}: ControlsOverlayProps) => (
  <Box className={`${styles.controlsOverlay} ${isVisible ? styles.visible : ''}`}>
    <ControlButton onClick={onPlayPause}>
      {isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
    </ControlButton>

    <ControlButton onClick={onMuteToggle}>
      {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
    </ControlButton>
  </Box>
); 