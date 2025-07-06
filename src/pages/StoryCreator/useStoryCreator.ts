// src/pages/StoryCreator/useStoryCreator.ts
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Scene } from './types';
import { _axios } from '../../common/client';

interface StoryResponse {
  sessionId: string;
  story: Scene[];
}

export const useStoryCreator = () => {
  const { setStep, sessionId, setSessionId, story, setStory } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [brief, setBrief] = useState<string>('A hardboiled detective in a rainy, cyberpunk city gets a mysterious case from a femme fatale.');
  const [sceneCount, setSceneCount] = useState<number>(3);
  const [refinementPrompt, setRefinementPrompt] = useState<string>('');

  const handleCreate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await _axios.post<StoryResponse>('/stories', { briefing: brief, sceneCount });
      console.log(response.data);
      setSessionId(response.data.sessionId);
      setStory(response.data.story);
    } catch (err) {
      setError('Failed to create story. Please check the backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!sessionId || !refinementPrompt) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await _axios.patch<StoryResponse>(`/stories/${sessionId}`, { prompt: refinementPrompt });
      console.log(response.data);
      setStory(response.data.story);
      setRefinementPrompt('');
    } catch (err) {
      setError('Failed to refine story.');
    } finally {
      setIsLoading(false);
    }
  };

  const startAgain = () => {
    setSessionId(null);
    setStory([]);
  };

  const goToNextStep = () => setStep('art');

  return {
    state: { isLoading, error, brief, sceneCount, refinementPrompt, story, hasGenerated: !!sessionId },
    handlers: { setBrief, setSceneCount, setRefinementPrompt, handleCreate, handleRefine, goToNextStep, startAgain },
  };
};