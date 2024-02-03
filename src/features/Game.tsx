import { useState } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import Board from 'src/features/Board';
import Header from 'src/features/Header';
import Menu from 'src/features/Menu';
import { borderUp } from 'src/styles/gameStyle';

export default function Game() {
  const { difficulty, board } = useSelector((state: RootState) => state.game);

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
      <Menu currentDifficulty={difficulty} />
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
