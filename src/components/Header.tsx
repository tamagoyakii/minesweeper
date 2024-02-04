import { Box } from '@mui/material';

import BombCounter from 'src/components/BombCounter';
import ResetButton from 'src/components/ResetButton';
import Timer from 'src/components/Timer';
import { borderDown } from 'src/styles/gameStyle';

export default function Header() {
  return (
    <Box
      sx={{
        ...borderDown,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <BombCounter />
      <ResetButton />
      <Timer />
    </Box>
  );
}
