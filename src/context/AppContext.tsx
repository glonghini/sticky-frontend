import React, { createContext, useState, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Scene, FinalStoryData } from '../pages/FinalStory/types'; // Using FinalStory types as the source of truth

// Define the shape of the context value
interface AppContextType {
  step: 'story' | 'art' | 'final';
  setStep: Dispatch<SetStateAction<'story' | 'art' | 'final'>>;
  sessionId: string | null;
  setSessionId: Dispatch<SetStateAction<string | null>>;
  story: Scene[];
  setStory: Dispatch<SetStateAction<Scene[]>>;
  finalStoryData: FinalStoryData | null;
  setFinalStoryData: Dispatch<SetStateAction<FinalStoryData | null>>;
  resetApp: () => void;
}

// Create the context with a null default value, as it will be provided by the Provider
const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<'story' | 'art' | 'final'>('story');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [story, setStory] = useState<Scene[]>([]);
  const [finalStoryData, setFinalStoryData] = useState<FinalStoryData | null>(null);

  const resetApp = () => {
    setStep('story');
    setSessionId(null);
    setStory([]);
    setFinalStoryData(null);
  };

  const value = {
    step, setStep,
    sessionId, setSessionId,
    story, setStory,
    finalStoryData, setFinalStoryData,
    resetApp,
  };

  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};

// Custom hook with a check to ensure it's used within a provider
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};