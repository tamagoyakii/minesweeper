import { useSelector } from 'react-redux';

import NumberPad from 'src/components/NumberPad';
import { RootState } from 'src/store/store';

export default function BombCounter() {
  const remainingBombs = useSelector(
    (state: RootState) => state.game.remainingBombs
  );

  return <NumberPad value={remainingBombs} />;
}
