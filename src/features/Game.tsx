import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import Appbar from 'src/features/Appbar';
import Board from 'src/features/Board';
import Header from 'src/features/Header';
import { borderUp } from 'src/styles/gameStyle';

import SuccessModal from './SuccessModal';

export default function Game() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const succeded = useSelector((state: RootState) => state.game.succeded);

  useEffect(() => {
    if (succeded) {
      setOpenSuccessModal(true);
    }
  }, [succeded]);

  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
  };

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
      <SuccessModal
        openSuccessModal={openSuccessModal}
        handleSuccessModalClose={handleSuccessModalClose}
      />
    </Box>
  );
}
