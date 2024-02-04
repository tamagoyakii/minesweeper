import { Backdrop, Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/store';
import { Difficulty } from 'src/types/gameTypes';

type SuccessModalProps = {
  openSuccessModal: boolean;
  handleSuccessModalClose: () => void;
};

export default function SuccessModal({
  openSuccessModal,
  handleSuccessModalClose,
}: SuccessModalProps) {
  const { difficulty, width, height, plantedBombs, clicks } = useSelector(
    (state: RootState) => state.game
  );
  const { recentRecord, bestRecord } = useSelector(
    (state: RootState) => state.record[difficulty]
  );

  const renderRecord = () => {
    if (difficulty === Difficulty.Custom) {
      return (
        <Typography variant='h4'>{`Game parameters: ${width}x${height} w/ ${plantedBombs} bombs `}</Typography>
      );
    } else {
      return (
        <Typography variant='h4'>{`Your best ${difficulty} time is: ${bestRecord} seconds`}</Typography>
      );
    }
  };

  return (
    <Backdrop
      sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openSuccessModal}
      onClick={handleSuccessModalClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          background: 'white',
          color: 'black',
          borderRadius: 3,
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: 5,
        }}
      >
        <Typography variant='h3'>HURRAY!</Typography>
        <Typography variant='h4'>
          Congratulations on winning Minesweeper
        </Typography>
        <Typography variant='h4'>{`Game time: ${recentRecord} seconds`}</Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          {renderRecord()}
          <Typography variant='h4'>{`Number of clicks was: ${clicks}`}</Typography>
        </Box>
        <Button
          variant='outlined'
          size='large'
          fullWidth
          onClick={handleSuccessModalClose}
        >
          Close
        </Button>
      </Box>
    </Backdrop>
  );
}
