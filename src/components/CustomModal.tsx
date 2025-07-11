import { useState } from 'react';

import { Backdrop, Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setDifficulty } from 'src/store/difficultySlice';
import { setGame } from 'src/store/gameSlice';
import { flexCol, flexRow } from 'src/styles/gameStyle';
import { Difficulty } from 'src/types/gameTypes';

type CustomModalProps = {
  openCustomModal: boolean;
  handleCustomModalClose: () => void;
};

export default function CustomModal({
  openCustomModal,
  handleCustomModalClose,
}: CustomModalProps) {
  const dispatch = useDispatch();
  const [customSetting, setCustomSetting] = useState({
    width: '10',
    height: '10',
    bombs: '10',
  });

  const handleInputChange = (key: string, value: string) => {
    setCustomSetting((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSettingApply = () => {
    const width = Number(customSetting.width);
    const height = Number(customSetting.height);
    const bombs = Number(customSetting.bombs);

    if (
      isNaN(width) ||
      isNaN(height) ||
      isNaN(bombs) ||
      width < 8 ||
      height < 8 ||
      bombs < 1 ||
      width > 100 ||
      height > 100 ||
      bombs > (width * height * 1) / 3
    ) {
      alert(
        'Minesweeper dimensions invalid:\nGame Height: from 8 to 100\nGame Width: From 8 to 100\nBombs: Max 1/3 of total squares'
      );
      return;
    }
    dispatch(
      setDifficulty({ difficulty: Difficulty.Custom, width, height, bombs })
    );
    dispatch(setGame({ width, height, bombs }));
    handleCustomModalClose();
  };

  return (
    <Backdrop
      sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openCustomModal}
      onClick={handleCustomModalClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          ...flexCol,
          gap: 5,
          background: 'white',
          color: 'black',
          borderRadius: 3,
          p: 5,
        }}
      >
        <Typography variant='h3'>Custom Game Setup</Typography>
        <Box sx={{ ...flexCol, gap: 2 }}>
          {Object.entries(customSetting).map(([key, value]) => (
            <Box key={key} sx={{ ...flexRow, gap: 1 }}>
              <Typography variant='h5'>{key}</Typography>
              <TextField
                value={value}
                hiddenLabel
                size='small'
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ ...flexRow, color: 'black', gap: 3 }}>
          <Button
            variant='outlined'
            size='large'
            fullWidth
            onClick={handleCustomModalClose}
          >
            Close
          </Button>
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={handleSettingApply}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
}
