import { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setDifficulty } from 'src/features/gameSlice';
import { Difficulty } from 'src/types/gameTypes';

type MenuProps = {
  currentDifficulty: Difficulty;
};

export default function Menu({ currentDifficulty }: MenuProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useDispatch();

  const difficulties = [
    Difficulty.Beginner,
    Difficulty.Intermediate,
    Difficulty.Expert,
    Difficulty.Custom,
  ];

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'black',
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    height: '1.8rem',
    fontSize: '1.1rem',
    cursor: 'pointer',
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    dispatch(setDifficulty(difficulty));
    setOpenDropdown(false);
  };

  return (
    <Box sx={{ alignSelf: 'start' }}>
      <Box onClick={() => setOpenDropdown(!openDropdown)} fontWeight={600}>
        Menu
      </Box>
      {openDropdown && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'grey.400',
            border: 1,
            borderColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            // gap: '3px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: 23 }}></Box>
            <button style={buttonStyle}>New</button>
          </Box>
          {/* <hr /> */}
          {difficulties.map((difficulty) => (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: 23 }}>
                {currentDifficulty === difficulty && (
                  <CheckIcon fontSize='small' />
                )}
              </Box>
              <button
                onClick={() => handleDifficultyChange(difficulty)}
                style={buttonStyle}
              >
                {difficulty}
              </button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
