import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import NumberPad from 'src/components/NumberPad';
import { setRecord } from 'src/store/recordSlice';
import { RootState } from 'src/store/store';

export default function Timer() {
  const dispatch = useDispatch();
  const { difficulty, isPlaying, succeded, exploded } = useSelector(
    (state: RootState) => state.game
  );
  const [second, setSecond] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !succeded && !exploded) {
      interval = setInterval(() => {
        setSecond((prev) => {
          if (prev < 999) return prev + 1;
          return prev;
        });
      }, 1000);
    }
    if (!isPlaying) setSecond(0);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, succeded, exploded]);

  useEffect(() => {
    if (succeded) {
      dispatch(setRecord({ difficulty, record: second }));
    }
  }, [succeded]);

  return <NumberPad value={second} />;
}
