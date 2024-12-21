import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';

const videos = [
  {
    url: 'https://example.com/video1.mp4',
    title: 'Video 1',
  },
  {
    url: 'https://example.com/video2.mp4',
    title: 'Video 2',
  },
];

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <VideoPlayer videos={videos} />
    </div>
  );
}

export default App; 