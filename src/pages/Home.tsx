import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { videos } from '../assets/videos';
import styles from './Home.module.css';
import { Box } from '@mantine/core';

export function Home() {
  return (
    <Box className={styles.container}>
      <VideoPlayer videos={videos} />
    </Box>
  );
}

export default Home;