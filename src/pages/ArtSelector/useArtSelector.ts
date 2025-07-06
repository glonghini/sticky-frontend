// src/pages/ArtSelector/useArtSelector.ts
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { FinalStoryData } from '../FinalStory/types';
import { _axios } from '../../common/client';
import type { ArtStyle } from './types';

export const useArtSelector = () => {
  const { setStep, sessionId, setFinalStoryData } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [artStyles, setArtStyles] = useState<ArtStyle[]>([]);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState<number | null>(null);
  const [refinementPrompts, setRefinementPrompts] = useState<string[]>(['', '', '']);

  const handleGetStyles = async () => {
    setIsLoading(true); setError('');
    try {
      const response = await _axios.get<ArtStyle[]>(`/art-styles/${sessionId}`);
      console.log(response.data);
      setArtStyles(response.data);
    } catch (err) { setError('Failed to get art styles.'); }
    finally { setIsLoading(false); }
  };

  const handleRefineStyle = async (index: number) => {
    const style = artStyles[index];
    const prompt = refinementPrompts[index];
    if (!style || !prompt) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await _axios.patch<{ newImageUrl: string }>(`/art-styles/${sessionId}`, {
        originalImageUrl: style.imageUrl,
        originalImagePrompt: style.imagePrompt,
        refinementPrompt: prompt,
      });
      const newArtStyles = [...artStyles];
      newArtStyles[index].imageUrl = response.data.newImageUrl;
      setArtStyles(newArtStyles);
    } catch (err) { setError('Failed to refine art style.'); }
    finally { setIsLoading(false); }
  };

  const handleFinalize = async () => {
    if (selectedStyleIndex === null) return;
    const selectedStyle = artStyles[selectedStyleIndex];

    setIsLoading(true); setError('');
    try {
      const response = await _axios.post<FinalStoryData>(`/final-story/${sessionId}`, {
        referenceImageUrl: selectedStyle.imageUrl,
      });
      console.log(response.data)
      setFinalStoryData(response.data);
      setStep('final');
    } catch (err) { setError('Failed to finalize story. This can take a while and might time out.'); }
    finally { setIsLoading(false); }
  };

  const handlePromptChange = (index: number, value: string) => {
    const newPrompts = [...refinementPrompts];
    newPrompts[index] = value;
    setRefinementPrompts(newPrompts);
  };

  const goBack = () => setStep('story');

  return {
    state: { isLoading, error, artStyles, selectedStyleIndex, refinementPrompts },
    handlers: { handleGetStyles, handleRefineStyle, handleFinalize, handlePromptChange, setSelectedStyleIndex, goBack },
  };
};