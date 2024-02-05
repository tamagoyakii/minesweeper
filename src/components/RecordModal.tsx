import { Backdrop, Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/store';
import { flexCol, flexRow } from 'src/styles/gameStyle';

type RecordModalProps = {
  openRecordModal: boolean;
  handleRecordMdalClose: () => void;
};

export default function RecordModal({
  openRecordModal,
  handleRecordMdalClose,
}: RecordModalProps) {
  const records = useSelector((state: RootState) => state.record);

  return (
    <Backdrop
      sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openRecordModal}
      onClick={handleRecordMdalClose}
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
        <Typography variant='h3'>Personal Best Times</Typography>
        <Box sx={{ ...flexCol, gap: 2, width: '70%' }}>
          {Object.entries(records).map(([difficulty, record]) => (
            <Box
              key={difficulty}
              sx={{ ...flexRow, justifyContent: 'space-between' }}
            >
              <Typography variant='h5'>{`${difficulty}`}</Typography>
              <Typography variant='h5'>{`${record.bestRecord} seconds`}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant='outlined'
          size='large'
          fullWidth
          onClick={handleRecordMdalClose}
        >
          Close
        </Button>
      </Box>
    </Backdrop>
  );
}
