import { Box } from '@mui/material';

import ResetButton from 'src/features/ResetButton';
import Timer from 'src/features/Timer';
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
      {/* <NumberPad /> */}
      <ResetButton />
      <Timer />
    </Box>
  );
}
