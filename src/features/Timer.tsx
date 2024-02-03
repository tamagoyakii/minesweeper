import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import NumberPad from 'src/features/NumberPad';

export default function Timer() {
  const isPlaying = useSelector((state: RootState) => state.game.isPlaying);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
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
  }, [isPlaying]);

  return <NumberPad value={second} />;
}
