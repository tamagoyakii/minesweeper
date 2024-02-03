import { Dispatch, ReactNode, SetStateAction } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Box, Divider, colors } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import { resetGame, setDifficulty } from 'src/features/gameSlice';
import { Difficulty } from 'src/types/gameTypes';

type MenuProps = {
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
};

export default function Menu({ setOpenDropdown }: MenuProps) {
  const dispatch = useDispatch();
  const currentDifficulty = useSelector(
    (state: RootState) => state.game.difficulty
  );

  const difficulties = [
    Difficulty.Beginner,
    Difficulty.Intermediate,
    Difficulty.Expert,
    Difficulty.Custom,
  ];

  const handleDifficultyChange = (difficulty: Difficulty) => {
    dispatch(setDifficulty(difficulty));
    setOpenDropdown(false);
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    setOpenDropdown(false);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: 'grey.400',
        border: 1,
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        p: '5px',
      }}
    >
      <MenuButton label='New' onClick={handleResetGame} />
      <MenuDivider />
      {difficulties.map((difficulty) => (
        <MenuButton
          label={difficulty}
          isChecked={currentDifficulty === difficulty}
          onClick={() => handleDifficultyChange(difficulty)}
        />
      ))}
      <MenuDivider />
      <MenuButton label='Exit' onClick={() => setOpenDropdown(false)} />
    </Box>
  );
}

function MenuButton({
  label,
  isChecked,
  onClick,
}: {
  label: string;
  isChecked?: boolean;
  onClick?: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '&:hover': {
          color: 'blue',
        },
      }}
    >
      <Box sx={{ width: 23 }}>
        {isChecked && <CheckIcon fontSize='small' />}
      </Box>
      {label}
    </Box>
  );
}

function MenuDivider() {
  return (
    <>
      <Divider
        sx={{
          width: '100%',
          backgroundColor: colors.grey[500],
          borderBottomWidth: 2,
        }}
      />
      <Divider
        sx={{ width: '100%', backgroundColor: 'white', borderBottomWidth: 2 }}
      />
    </>
  );
}
