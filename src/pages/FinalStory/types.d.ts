// This re-uses the Scene definition but with a key difference in meaning
export interface Scene {
  id: number;
  narrator: string;
  character: string;
  dialogue: string;
  // In the final story, this prompt becomes the final image URL
  characterImagePrompt: string;
  backgroundPrompt: string; // Likely empty
}

// This is the shape of the entire session object returned on finalization
export interface FinalStoryData {
  id: number;
  uuid: string;
  initialBriefing: string;
  sceneCount: number;
  currentStoryState: Scene[];
  createdAt: string;
  updatedAt: string;
}