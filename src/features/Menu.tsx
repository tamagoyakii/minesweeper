import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function Menu() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <Box sx={{ alignSelf: 'start' }}>
      <Box onClick={() => setOpenDropdown(!openDropdown)} fontWeight={600}>
        Menu
      </Box>
      {openDropdown && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'grey.300',
            border: 1,
            borderColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <button>New</button>
          <button>Beginner</button>
          <button>Intermediate</button>
          <button>Expert</button>
          <button>Custom</button>
        </Box>
      )}
    </Box>
  );
}
