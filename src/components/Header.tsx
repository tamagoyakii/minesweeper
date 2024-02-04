import { Box } from '@mui/material';

import BombCounter from 'src/components/BombCounter';
import ResetButton from 'src/components/ResetButton';
import Timer from 'src/components/Timer';
import { borderDown, flexRow } from 'src/styles/gameStyle';

export default function Header() {
  return (
    <Box sx={{ ...borderDown, ...flexRow }}>
      <BombCounter />
      <ResetButton />
      <Timer />
    </Box>
  );
}
