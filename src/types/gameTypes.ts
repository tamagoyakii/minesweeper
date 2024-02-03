export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
  Custom = 'Custom',
}

export interface CellData {
  element: number;
  isRevealed: boolean;
}

export interface GameState {
  difficulty: Difficulty;
  board: CellData[][];
  plantedMines: number;
  remainingMines: number;
  time: number;
  isPlaying: boolean;
  exploded: boolean;
}
