import { Backdrop, Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/store';
import { flexCol } from 'src/styles/gameStyle';
import { Difficulty } from 'src/types/gameTypes';

type SuccessModalProps = {
  openSuccessModal: boolean;
  handleSuccessModalClose: () => void;
};

export default function SuccessModal({
  openSuccessModal,
  handleSuccessModalClose,
}: SuccessModalProps) {
  const { currentDifficulty, width, height, bombs } = useSelector(
    (state: RootState) => state.difficulty
  );
  const clicks = useSelector((state: RootState) => state.game.clicks);
  const { recentRecord, bestRecord } = useSelector(
    (state: RootState) => state.record[currentDifficulty]
  );

  const renderRecord = () => {
    if (currentDifficulty === Difficulty.Custom) {
      return (
        <Typography variant='h4'>{`Game parameters: ${width}x${height} w/ ${bombs} bombs `}</Typography>
      );
    } else {
      return (
        <Typography variant='h4'>{`Your best ${currentDifficulty} time is: ${bestRecord} seconds`}</Typography>
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
          ...flexCol,
          alignItems: 'start',
          gap: 5,
          background: 'white',
          color: 'black',
          borderRadius: 3,
          p: 5,
        }}
      >
        <Typography variant='h3'>HURRAY!</Typography>
        <Typography variant='h4'>
          Congratulations on winning Minesweeper
        </Typography>
        <Typography variant='h4'>{`Game time: ${recentRecord} seconds`}</Typography>
        <Box sx={{ ...flexCol, alignItems: 'start' }}>
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
