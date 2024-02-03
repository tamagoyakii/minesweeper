import { useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import NumberPad from 'src/features/NumberPad';

export default function BombCounter() {
  const remainingBombs = useSelector(
    (state: RootState) => state.game.remainingBombs
  );

  return <NumberPad value={remainingBombs} />;
}
