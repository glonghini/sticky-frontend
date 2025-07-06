// src/pages/StoryCreator/StoryCreator.tsx
import React from 'react';
import { useStoryCreator } from './useStoryCreator';
import { Button, TextField, Typography, CircularProgress, Alert, Card, CardContent, Grid } from '@mui/material';

export const StoryCreator: React.FC = () => {
  const { state, handlers } = useStoryCreator();

  return <Grid container spacing={1}>
    {
      !state.hasGenerated ?
        <>
          <Grid size={12}>
            <Typography variant="h5" gutterBottom>Create Your Story</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Story Briefing"
              value={state.brief}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlers.setBrief(e.target.value)}
              margin="normal" multiline rows={3}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              fullWidth
              label="Number of Scenes"
              value={state.sceneCount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => (/^\d+$/.test(e.target.value) || e.target.value === '') ? handlers.setSceneCount(Number(e.target.value)) : null}
              margin="normal"
            />
          </Grid>
          {/* Spacer */}
          <Grid />
          <Grid size={12}>
            <Button
              variant="contained"
              onClick={handlers.handleCreate}
              disabled={state.isLoading}
            >
              {state.isLoading ? <CircularProgress size={24} /> : 'Generate Draft'}
            </Button>
          </Grid>
        </>
        :
        null
    }
    {
      state.story.length > 0 ?
        <>
          <Grid>
            <Button
              variant="contained"
              onClick={handlers.startAgain}
              color='warning'
            >
              Start again
            </Button>
          </Grid>
          {/* Spacer */}
          {/* <Grid flexGrow={1} />
          <Grid size={12}>
            <Typography variant="h5">Refinements</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Refinement Prompt (e.g., 'Make scene 2 more mysterious')"
              value={state.refinementPrompt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlers.setRefinementPrompt(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              onClick={handlers.handleRefine}
              disabled={state.isLoading || !state.refinementPrompt}
            >
              {state.isLoading ? <CircularProgress size={24} /> : 'Refine Story'}
            </Button>
          </Grid> */}
          {/* Spacer */}
          <Grid flexGrow={1} />
          <Grid>
            <Button variant="contained" color="primary" onClick={handlers.goToNextStep} disabled={state.isLoading || !state.hasGenerated}>
              Next: Choose Art Style
            </Button>
          </Grid>
          <Grid size={12}>
            <Typography variant="h5">Story Draft</Typography>
          </Grid>
          {
            state.story.map((scene, index) => <Grid size={12} key={index}>
              <Card key={scene.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="overline">SCENE {scene.id}</Typography>
                  <Typography sx={{ fontStyle: 'italic', mb: 1 }}><u>Narrator</u>: {scene.narrator}</Typography>
                  <Typography><strong>{scene.character}:</strong> "{scene.dialogue}"</Typography>
                </CardContent>
              </Card>
            </Grid>)
          }
        </>
        :
        null
    }
    {
      state.error ?
        <Grid size={12}>
          <Alert severity="error">{state.error}</Alert>
        </Grid>
        :
        null
    }
  </Grid>
};