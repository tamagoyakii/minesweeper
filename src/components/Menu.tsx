import CheckIcon from '@mui/icons-material/Check';
import { Box, Divider, colors } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { resetGame, setDifficulty } from 'src/store/gameSlice';
import { RootState } from 'src/store/store';
import { Difficulty } from 'src/types/gameTypes';

type MenuProps = {
  handleMenuClose: () => void;
  handleCustomModalOpen: () => void;
};

export default function Menu({
  handleMenuClose,
  handleCustomModalOpen,
}: MenuProps) {
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
    if (difficulty === Difficulty.Custom) {
      handleCustomModalOpen();
      return;
    }
    dispatch(setDifficulty(difficulty));
    handleMenuClose();
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    handleMenuClose();
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
          key={difficulty}
          label={difficulty}
          isChecked={currentDifficulty === difficulty}
          onClick={() => handleDifficultyChange(difficulty)}
        />
      ))}
      <MenuDivider />
      <MenuButton label='Exit' onClick={handleMenuClose} />
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
