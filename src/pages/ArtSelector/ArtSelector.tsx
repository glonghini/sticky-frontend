// src/pages/ArtSelector/ArtSelector.tsx
import React from 'react';
import { useArtSelector } from './useArtSelector';
import { Button, Typography, CircularProgress, Alert, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';

export const ArtSelector: React.FC = () => {
  const { state, handlers } = useArtSelector();

  return <Grid container spacing={2}>
    <Grid size={12}>
      <Typography variant="h5" gutterBottom>Choose The Art Style</Typography>
    </Grid>
    <Grid>
      <Button
        variant="contained"
        color='warning'
        onClick={handlers.goBack}
      >
        Back to Story
      </Button>
    </Grid>
    <Grid>
      {
        state.artStyles.length === 0 ?
          <Button
            variant="contained"
            onClick={handlers.handleGetStyles}
            disabled={state.isLoading}
          >
            {state.isLoading ? <CircularProgress size={24} /> : 'Generate Art Styles'}
          </Button>
          :
          null
      }
    </Grid>
    <Grid size={12}>
      {
        state.error ?
          <Alert severity="error" sx={{ my: 2 }}>{state.error}</Alert>
          :
          null
      }
    </Grid>
    <Grid>
      <Button
        variant="outlined"
        onClick={handlers.handleGetStyles}
        disabled={state.isLoading}
      >
        Re-roll All Styles
      </Button>
    </Grid>
    {/* Spacer */}
    <Grid flexGrow={1} />
    <Grid>
      <Button
        variant="contained"
        color="success"
        onClick={handlers.handleFinalize}
        disabled={state.isLoading || state.selectedStyleIndex === null}
      >
        {state.isLoading ? <CircularProgress size={24} /> : 'Generate Final Story with this Style'}
      </Button>
    </Grid>
    <Grid size={12} />
    {
      state.artStyles.length > 0 ?
        state.artStyles.map((style, index) => <Grid size={4} key={index}>
          <Card sx={{ border: state.selectedStyleIndex === index ? '2px solid' : 'none', borderColor: 'primary.main' }}>
            <CardMedia component="img" height="512" image={style.imageUrl} alt={style.name} />
            <CardContent>
              <Typography variant="h6">{style.name}</Typography>
              <Typography variant="body2">{style.description}</Typography>
            </CardContent>
            <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
              {/* <TextField
                fullWidth
                label="Refine this style..."
                variant="outlined"
                size="small"
                value={state.refinementPrompts[index]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlers.handlePromptChange(index, e.target.value)}
                multiline
                rows={4}
              />
              <Button
                size="small"
                variant="contained"
                onClick={() => handlers.handleRefineStyle(index)}
                disabled={state.isLoading || !state.refinementPrompts[index]}
              >
                Refine Image
              </Button> */}
              <Button
                size="small"
                variant="contained"
                onClick={() => handlers.setSelectedStyleIndex(index)}
              >
                Select Style
              </Button>
            </CardActions>
          </Card>
        </Grid>
        )
        :
        null
    }
  </Grid>
};