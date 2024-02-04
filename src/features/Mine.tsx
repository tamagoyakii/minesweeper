import { MouseEventHandler, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import { checkFlag, openArea, sweepMine } from 'src/features/gameSlice';

type MineProps = {
  row: number;
  col: number;
};

export default function Mine({ row, col }: MineProps) {
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const dispatch = useDispatch();
  const { element, isRevealed, flagType } = useSelector(
    (state: RootState) => state.game.board[row][col]
  );
  const exploded = useSelector((state: RootState) => state.game.exploded);
  const imageSize = 30;

  const imageURL = () => {
    if (!isRevealed) return flagType;
    if (element === -1) return 'bombrevealed';
    if (element === -2) return 'bombdeath';
    if (element === -3) return 'bombmisflagged';
    return `open${element}`;
  };

  const handleMouseDown: MouseEventHandler<HTMLImageElement> = (e) => {
    if (e.button === 2) setRightClicked(true);
    if (e.button === 0) setLeftClicked(true);
  };

  const handleMouseUp: MouseEventHandler<HTMLImageElement> = (e) => {
    if (exploded) return;
    // 우클릭 상태에서 좌클릭한 경우, "Area Open" 처리
    if (leftClicked && rightClicked) {
      if (isRevealed && element >= 0) {
        dispatch(openArea({ row, col }));
      }
    }

    // 좌클릭한 경우, 일반적인 칸 열기 처리
    if (leftClicked && !rightClicked) {
      if (!isRevealed && flagType !== 'bombflagged') {
        dispatch(sweepMine({ row, col }));
      }
    }

    // 우클릭을 떼는 경우, 플래그 처리
    if (!leftClicked && rightClicked) {
      if (!isRevealed) {
        dispatch(checkFlag({ row, col }));
      }
    }

    if (e.button === 0) setLeftClicked(false);
    if (e.button === 2) setRightClicked(false);
  };

  return (
    <img
      src={`https://freeminesweeper.org/images/${imageURL()}.gif`}
      width={imageSize}
      height={imageSize}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      alt=''
    />
  );
}
