import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import Mine from 'src/components/Mine';
import { checkFlag, openArea, sweepMine } from 'src/store/gameSlice';
import { RootState } from 'src/store/store';
import { borderDown } from 'src/styles/gameStyle';

export default function Board() {
  const dispatch = useDispatch();
  const { board, exploded } = useSelector((state: RootState) => state.game);
  const [rightClicked, setRightClicked] = useState(false);

  const handleMouseDown = (button: number) => {
    if (button === 2) setRightClicked(true);
  };

  const handleMouseUp = (button: number, row: number, col: number) => {
    const { element, isRevealed, flagType } = board[row][col];
    if (exploded) return;
    // 우클릭 상태에서 좌클릭한 경우, "Area Open" 처리
    if (button === 0 && rightClicked) {
      if (isRevealed && element >= 0) {
        dispatch(openArea({ row, col }));
      }
    }
    // 좌클릭한 경우, 일반적인 칸 열기 처리
    if (button === 0 && !rightClicked) {
      if (!isRevealed && flagType !== 'bombflagged') {
        dispatch(sweepMine({ row, col }));
      }
    }
    // 우클릭을 떼는 경우, 플래그 처리
    if (button !== 0 && rightClicked) {
      if (!isRevealed) {
        dispatch(checkFlag({ row, col }));
      }
    }
    if (button === 2) setRightClicked(false);
  };

  useEffect(() => {
    setRightClicked(false);
  }, [board]);

  return (
    <Box sx={{ ...borderDown, display: 'flex', flexDirection: 'column' }}>
      {board.map((row, i) => (
        <Box key={`row-${i}`} sx={{ display: 'flex' }}>
          {row.map((el, j) => (
            <div
              key={`el-${i}-${j}`}
              onMouseDown={(e) => handleMouseDown(e.button)}
              onMouseUp={(e) => handleMouseUp(e.button, i, j)}
            >
              <Mine key={`cell-${i}-${j}`} mine={el} />
            </div>
          ))}
        </Box>
      ))}
    </Box>
  );
}
