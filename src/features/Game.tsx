import { Box, Container } from '@mui/material';
import Header from 'src/features/Header';
import Board from 'src/features/Board';
import { borderUp } from 'src/styles/gameStyle';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { useState } from 'react';

export default function Game() {
  const { difficulty, board, firstClick } = useSelector(
    (state: RootState) => state.game
  );
  const [time, setTime] = useState(0);

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
        <Board board={board} />
      </Box>
    </Box>
  );
}
