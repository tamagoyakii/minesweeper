import { useState } from 'react';

import { Box } from '@mui/material';

import CustomModal from 'src/components/CustomModal';
import Menu from 'src/components/Menu';
import RecordModal from 'src/components/RecordModal';

export default function Appbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [openRecordModal, setOpenRecordModal] = useState(false);

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleCustomModalOpen = () => {
    handleMenuClose();
    setOpenCustomModal(true);
  };

  const handleRecordModalOpen = () => {
    handleMenuClose();
    setOpenRecordModal(true);
  };

  return (
    <Box sx={{ alignSelf: 'start', fontSize: 20, fontWeight: 600 }}>
      <Box onClick={() => setOpenMenu(!openMenu)}>Menu</Box>
      {openMenu && (
        <Menu
          handleMenuClose={handleMenuClose}
          handleCustomModalOpen={handleCustomModalOpen}
          handleRecordModalOpen={handleRecordModalOpen}
        />
      )}
      <CustomModal
        openCustomModal={openCustomModal}
        handleCustomModalClose={() => setOpenCustomModal(false)}
      />
      <RecordModal
        openRecordModal={openRecordModal}
        handleRecordMdalClose={() => setOpenRecordModal(false)}
      />
    </Box>
  );
}
