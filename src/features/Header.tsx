import { Box } from '@mui/material';
import { borderDown } from 'src/styles/gameStyle';
import NumberPad from 'src/features/NumberPad';
import ResetButton from 'src/features/ResetButton';

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
      <NumberPad />
      <ResetButton />
      <NumberPad />
    </Box>
  );
}
