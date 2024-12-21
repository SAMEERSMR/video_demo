import { Box } from '@mantine/core';
import styles from './Controls.module.css';

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ControlButton = ({ onClick, children }: ControlButtonProps) => (
  <Box onClick={onClick} className={styles.controlButton}>
    {children}
  </Box>
); 