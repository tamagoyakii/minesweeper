export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
  Custom = 'Custom',
}

export type FlagTypes = 'blank' | 'bombflagged' | 'bombquestion';

export interface Element {
  element: number;
  isRevealed: boolean;
  flagType: FlagTypes;
}

export interface GameState {
  difficulty: Difficulty;
  board: Element[][];
  plantedBombs: number;
  remainingBombs: number;
  remainingMines: number;
  width: number;
  height: number;
  isPlaying: boolean;
  exploded: boolean;
  succeded: boolean;
  clicks: number;
}
