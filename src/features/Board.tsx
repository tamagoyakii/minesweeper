import { Box } from '@mui/material';
import Cell from './Cell';
import { borderDown } from 'src/styles/gameStyle';

type BoardProps = {
  board: number[][];
};

export default function Board({ board }: BoardProps) {
  return (
    <Box sx={{ ...borderDown, display: 'flex', flexDirection: 'column' }}>
      {board.map((row, i) => (
        <Box sx={{ display: 'flex' }}>
          {row.map((element, j) => (
            <Cell key={`cell-${i}-${j}`} row={i} col={j} element={element} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
