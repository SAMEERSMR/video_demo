import { Box, Group } from '@mantine/core';
import styles from './VideoPlayer.module.css';

interface VideoThumbnailsProps {
  videos: {
    url: string;
    title: string;
  }[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function VideoThumbnails({ videos, currentIndex, onSelect }: VideoThumbnailsProps) {
  return (
    <Group gap="xs" style={{ overflowX: 'auto', padding: '10px 0' }}>
      {videos.map((video, index) => (
        <Box
          key={video.url}
          onClick={() => onSelect(index)}
          className={`${styles.thumbnailContainer} ${currentIndex === index ? styles.thumbnailContainerActive : ''}`}
        >
          <video
            src={video.url}
            className={styles.thumbnailVideo}
            preload="metadata"
          />
          <Box className={styles.thumbnailTitle}>
            {video.title}
          </Box>
        </Box>
      ))}
    </Group>
  );
} 