export interface Scene {
  id: number;
  narrator: string;
  character: string;
  dialogue: string;
  // These will be present in the initial draft
  characterImagePrompt: string;
  backgroundPrompt: string;
}