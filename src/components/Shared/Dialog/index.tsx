import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { Box, FlexProps } from 'rebass';

interface dialogProps extends FlexProps {
  onClose: () => void;
  open: boolean;
  style:object;
}
export default function SimpleDialog({
  onClose, children, open, style
}: dialogProps) {
  // const {
  //   onClose, selectedValue, open, children
  // } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={style}>

        {children}
      </Box>
    </Dialog>
  );
}
