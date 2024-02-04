import { MouseEventHandler } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import { checkFlag, sweepMine } from 'src/features/gameSlice';

type MineProps = {
  row: number;
  col: number;
};

export default function Mine({ row, col }: MineProps) {
  const dispatch = useDispatch();
  const { element, isRevealed, flagType } = useSelector(
    (state: RootState) => state.game.board[row][col]
  );
  const { exploded } = useSelector((state: RootState) => state.game);
  const imageSize = 30;

  const imageURL = () => {
    if (element === -1) return 'bombrevealed';
    if (element === -2) return 'bombdeath';
    if (element === -3) return 'bombmisflagged';
    return `open${element}`;
  };

  const handleLeftClick = () => {
    if (isRevealed || exploded) return;
    dispatch(sweepMine({ row, col }));
  };

  const handleRightClick: MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    dispatch(checkFlag({ row, col }));
  };

  return isRevealed ? (
    <img
      src={`https://freeminesweeper.org/images/${imageURL()}.gif`}
      width={imageSize}
      height={imageSize}
      alt=''
    />
  ) : (
    <img
      src={`https://freeminesweeper.org/images/${flagType}.gif`}
      width={imageSize}
      height={imageSize}
      alt=''
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    />
  );
}
