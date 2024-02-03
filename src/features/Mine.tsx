import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import { sweepElement } from 'src/features/gameSlice';

type CellProps = {
  row: number;
  col: number;
};

export default function Mine({ row, col }: CellProps) {
  const dispatch = useDispatch();
  const { element, isRevealed } = useSelector(
    (state: RootState) => state.game.board[row][col]
  );
  const imageSize = 30;

  const imageURL = () => {
    if (element >= 0) return `open${element}`;
    if (element === -1) return 'bombrevealed';
    if (element === -2) return 'bombdeath';
  };

  const handleCellClick = () => {
    if (isRevealed) return;
    dispatch(sweepElement({ row, col }));
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
      src='https://freeminesweeper.org/images/blank.gif'
      width={imageSize}
      height={imageSize}
      alt=''
      onClick={handleCellClick}
    />
  );
}
