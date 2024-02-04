import { useDispatch, useSelector } from 'react-redux';

import { resetGame } from 'src/store/gameSlice';
import { RootState } from 'src/store/store';

export default function ResetButton() {
  const dispatch = useDispatch();
  const exploded = useSelector((state: RootState) => state.game.exploded);
  const imageSize = 50;

  const imageURL = () => {
    if (exploded) return 'facedead';
    return 'facesmile';
  };

  const handleGameReset = () => {
    dispatch(resetGame());
  };

  return (
    <img
      src={`https://freeminesweeper.org/images/${imageURL()}.gif`}
      width={imageSize}
      height={imageSize}
      alt=''
      onClick={handleGameReset}
    />
  );
}
