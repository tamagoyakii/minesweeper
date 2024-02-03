import { Box } from '@mui/material';
import { borderUp } from 'src/styles/gameStyle';

type CellProps = {
  row: number;
  col: number;
  element: number;
};

export default function Cell({ row, col, element }: CellProps) {
  return <Box sx={{ ...borderUp, width: 20, height: 20 }}></Box>;
}
