import { Box } from '@mui/material';
import Cell from './Cell';
import { borderDown } from 'src/styles/gameStyle';

export default function Board() {
  return (
    <Box sx={{ ...borderDown }}>
      <Cell />
    </Box>
  );
}
