import { Box } from '@mui/material';

type NumberPadProps = {
  value: number;
};

export default function NumberPad({ value }: NumberPadProps) {
  const numbers = value.toString().padStart(3, '0').split('');
  const imageHeight = 50;
  const imageWidth = 30;

  return (
    <Box sx={{ display: 'flex' }}>
      {numbers.map((number, i) => (
        <img
          key={`number-${i}`}
          src={`https://freeminesweeper.org/images/time${number}.gif`}
          width={imageWidth}
          height={imageHeight}
          alt=''
        />
      ))}
    </Box>
  );
}
