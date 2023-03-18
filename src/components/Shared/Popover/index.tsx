import { IconButton, Popover } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { ReactChild } from 'react';
import { Flex } from 'rebass';

export interface PopoverProps {
  isOpen: null | Element | undefined,
  style: object,
  children: ReactChild,
  onClose: (value: HTMLButtonElement | null) => void // eslint-disable-line no-unused-vars
}

export function SimplePopover({
  isOpen, style, children, onClose
}: PopoverProps) {
  const open = Boolean(isOpen);

  return (
    <Popover
      open={open}
      anchorEl={isOpen}
      onClose={() => onClose(null)}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      PaperProps={{ style }}
    >
      <Flex width="100%" justifyContent="flex-end">
        <IconButton onClick={() => onClose(null)} disableRipple>
          <Close />
        </IconButton>
      </Flex>
      {children}
    </Popover>
  );
}
