import { Box, Container } from '@mui/material';
import Header from 'src/features/Header';
import Board from 'src/features/Board';
import { borderUp } from 'src/styles/gameStyle';
import Menu from './Menu';

export default function Game() {
  return (
    <Container
      maxWidth='sm'
      sx={{
        backgroundColor: 'grey.300',
        display: 'flex',
        flexDirection: 'column',
        border: 1,
        borderRadius: 3,
        borderColor: 'grey.300',
        p: 2,
        gap: 1,
      }}
    >
      <Menu />
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
    </Container>
  );
}
