import { Box } from '@mui/material';
import { borderUp } from 'src/styles/gameStyle';
import MoodIcon from '@mui/icons-material/Mood';

export default function ResetButton() {
  return (
    <Box sx={{ ...borderUp }}>
      <Box
        sx={{
          backgroundColor: 'yellow',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MoodIcon fontSize='large' />
      </Box>
    </Box>
  );
}
