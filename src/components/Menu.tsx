import CheckIcon from '@mui/icons-material/Check';
import { Box, Divider, colors } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { difficultySets, setDifficulty } from 'src/store/difficultySlice';
import { resetGame, setGame } from 'src/store/gameSlice';
import { RootState } from 'src/store/store';
import { flexCol } from 'src/styles/gameStyle';
import { Difficulty } from 'src/types/gameTypes';

type MenuProps = {
  handleMenuClose: () => void;
  handleCustomModalOpen: () => void;
  handleRecordModalOpen: () => void;
};

export default function Menu({
  handleMenuClose,
  handleCustomModalOpen,
  handleRecordModalOpen,
}: MenuProps) {
  const dispatch = useDispatch();
  const { currentDifficulty } = useSelector(
    (state: RootState) => state.difficulty
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
    const { width, height, bombs } = difficultySets[difficulty];
    dispatch(setDifficulty({ difficulty }));
    dispatch(setGame({ width, height, bombs }));
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
        ...flexCol,
        alignItems: 'start',
        backgroundColor: 'grey.400',
        border: 1,
        borderColor: 'black',
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
      <MenuButton label='Personal Best' onClick={handleRecordModalOpen} />
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
