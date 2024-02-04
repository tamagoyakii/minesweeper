import { useState } from 'react';

import { Box } from '@mui/material';

import CustomModal from 'src/components/CustomModal';
import Menu from 'src/components/Menu';

export default function Appbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCustomModal, setOpenCustomModal] = useState(false);

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleCustomModalOpen = () => {
    handleMenuClose();
    setOpenCustomModal(true);
  };

  const handleCustomModalClose = () => {
    setOpenCustomModal(false);
  };

  return (
    <Box sx={{ alignSelf: 'start', fontSize: 20, fontWeight: 600 }}>
      <Box onClick={() => setOpenMenu(!openMenu)}>Menu</Box>
      {openMenu && (
        <Menu
          handleMenuClose={handleMenuClose}
          handleCustomModalOpen={handleCustomModalOpen}
        />
      )}
      {openCustomModal && (
        <CustomModal
          openCustomModal={openCustomModal}
          handleCustomModalClose={handleCustomModalClose}
        />
      )}
    </Box>
  );
}
