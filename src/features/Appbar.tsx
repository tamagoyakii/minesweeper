import { useState } from 'react';

import { Box } from '@mui/material';

import Menu from 'src/features/Menu';

export default function Appbar() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <Box sx={{ alignSelf: 'start', fontSize: 20, fontWeight: 600 }}>
      <Box onClick={() => setOpenDropdown(!openDropdown)}>Menu</Box>
      {openDropdown && <Menu setOpenDropdown={setOpenDropdown} />}
    </Box>
  );
}
