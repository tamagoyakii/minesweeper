export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
  Custom = 'Custom',
}

export type FlagTypes = 'blank' | 'bombflagged' | 'bombquestion';

export interface CellData {
  element: number;
  isRevealed: boolean;
  flagType: FlagTypes;
}

export interface GameState {
  difficulty: Difficulty;
  board: CellData[][];
  plantedBombs: number;
  remainingBombs: number;
  time: number;
  isPlaying: boolean;
  exploded: boolean;
}
