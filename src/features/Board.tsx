import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import { difficultySettings } from 'src/features/gameSlice';
import Mine from 'src/features/Mine';
import { borderDown } from 'src/styles/gameStyle';

export default function Board() {
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const rows = difficultySettings[difficulty].rows;
  const cols = difficultySettings[difficulty].cols;

  return (
    <Box sx={{ ...borderDown, display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: rows }, (_, i) => (
        <Box key={`row-${i}`} sx={{ display: 'flex' }}>
          {Array.from({ length: cols }, (_, j) => (
            <Mine key={`cell-${i}-${j}`} row={i} col={j} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
