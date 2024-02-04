import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from 'src/app/store';
import Mine from 'src/features/Mine';
import { borderDown } from 'src/styles/gameStyle';

export default function Board() {
  const { width, height } = useSelector((state: RootState) => state.game);

  return (
    <Box sx={{ ...borderDown, display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: height }, (_, i) => (
        <Box key={`row-${i}`} sx={{ display: 'flex' }}>
          {Array.from({ length: width }, (_, j) => (
            <Mine key={`cell-${i}-${j}`} row={i} col={j} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
