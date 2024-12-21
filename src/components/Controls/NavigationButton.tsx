import { Box, Text } from '@mantine/core';
import { IconPlayerTrackNext, IconPlayerTrackPrev } from '@tabler/icons-react';
import styles from './Controls.module.css';

interface NavigationButtonProps {
  direction: 'next' | 'prev';
  onClick: () => void;
  disabled: boolean;
}

export const NavigationButton = ({ direction, onClick, disabled }: NavigationButtonProps) => (
  <Box
    onClick={!disabled ? onClick : undefined}
    className={`${styles.navigationButton} ${direction === 'next' ? styles.navigationButtonNext : styles.navigationButtonPrev}`}
    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
  >
    {direction === 'prev' && <IconPlayerTrackPrev size={20} />}
    <Text size="sm" fw={500}>{direction === 'next' ? 'Next' : 'Previous'}</Text>
    {direction === 'next' && <IconPlayerTrackNext size={20} />}
  </Box>
); 