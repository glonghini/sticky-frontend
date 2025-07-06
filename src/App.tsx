import { useAppContext } from './context/AppContext.tsx';
import { StoryCreator } from './pages/StoryCreator/StoryCreator.tsx';
import { ArtSelector } from './pages/ArtSelector/ArtSelector.tsx';
import { FinalStory } from './pages/FinalStory/FinalStory.tsx';
import { Container, Typography } from '@mui/material';

function App() {
  const { step } = useAppContext();

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Sticky - Graphic Novel case - Gabriel Longhini
      </Typography>
      {step === 'story' && <StoryCreator />}
      {step === 'art' && <ArtSelector />}
      {step === 'final' && <FinalStory />}
    </Container>
  );
}

export default App;