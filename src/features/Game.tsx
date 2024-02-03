import { Box } from '@mui/material';

import Appbar from 'src/features/Appbar';
import Board from 'src/features/Board';
import Header from 'src/features/Header';
import { borderUp } from 'src/styles/gameStyle';

export default function Game() {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.400',
        display: 'flex',
        flexDirection: 'column',
        border: 1,
        borderRadius: 3,
        p: 2,
        gap: 1,
      }}
    >
      <Appbar />
      <Box
        sx={{
          ...borderUp,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Header />
        <Board />
      </Box>
    </Box>
  );
}
