// src/pages/FinalStory/FinalStory.tsx
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Box, Button, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';

export const FinalStory: React.FC = () => {
  const { finalStoryData, resetApp } = useAppContext();

  if (!finalStoryData) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography>Something went wrong, no final story data found.</Typography>
        <Button onClick={resetApp} variant="contained" sx={{ mt: 2 }}>Start Over</Button>
      </Box>
    );
  }

  return <Grid container spacing={2}>
    <Grid size={12}>
      <Button onClick={resetApp} variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
        Create a New Story
      </Button>
    </Grid>
    <Grid size={12}>
      <Typography variant="h5" gutterBottom>Your Final Story!</Typography>
    </Grid>
    {
      finalStoryData.currentStoryState.map((scene, index) => <Grid size={4} key={index}>
        <Card key={scene.id}>
          <CardMedia
            component="img"
            image={scene.characterImagePrompt} // This holds the final image URL
            alt={`Scene ${scene.id}`}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <CardContent>
              <Typography component="div" variant="h5">Scene {scene.id}</Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontStyle: 'italic', my: 1 }}>
                {scene.narrator}
              </Typography>
              <Typography variant="body1">
                <strong>{scene.character}:</strong> "{scene.dialogue}"
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>)
    }
  </Grid>
}