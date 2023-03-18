import { Dialog, IconButton, Popover } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useState } from 'react';
import {
  Box, Button, Flex, Image, Text // eslint-disable-line indent
} from 'rebass';
import Restart from '../../../assets/Restart.svg';
import Trash from '../../../assets/Trash.svg';
import TrashBin from '../../../assets/TrashBin.svg';
import { Theme } from '../../../theme/px/types';
import FlexBox from '../../utility/FlexBox';

export interface SettingPopoverProps {
  product: string,
  isPreset: boolean,
  isGarmentPage?: boolean, // eslint-disable-line react/require-default-props
  isOpenSetting: null | Element | undefined,
  setOpenSetting: (value: HTMLButtonElement | null) => void // eslint-disable-line no-unused-vars
  deletePreset: () => void,
}

const useStyles = makeStyles(() => ({
  predictionTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    lineHeight: '150%'
  },
  label: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#0C0C0C'
  }
}));

export function SettingPopover({
  product, isPreset, isGarmentPage, isOpenSetting, setOpenSetting, deletePreset
}: SettingPopoverProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState(false);
  const open = Boolean(isOpenSetting);

  console.log(isGarmentPage);

  return (
    <FlexBox>
      <Popover
        open={open}
        anchorEl={isOpenSetting}
        onClose={() => setOpenSetting(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          style: {
            width: '300px',
            // background: '#FFFFFF',
            border: '1px solid #F4F4F4',
            boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.09)',
            marginLeft: '-4%',
            borderRadius: '8px'
          }
        }}
      >
        <FlexBox vertical p="10px" justifyContent="center" alignItems="center" width="100%">
          <Flex
            justifyContent="flex-start"
            alignItems="center"
            width="100%"
            mt={theme.marginSpacing.s}
            mb={theme.marginSpacing.xl}
          >
            <Text
              className={classes.predictionTitle}
              fontSize="18px"
              color="#272727"
              flexGrow={1}
              width="100%"
              ml="5%"
            >
              Settings
            </Text>
            <IconButton
              disableRipple
              onClick={() => setOpenSetting(null)}
            >
              <Close style={{ color: '#272727' }} />
            </IconButton>
          </Flex>
          {isPreset && (
            <FlexBox vertical width="100%">
              <Flex
                width="100%"
                px="25px"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenDelete(true)}
              >
                <Image src={Trash} />
                <Text ml="15px" className={classes.label} color="#616161 !important">Remove Preset</Text>
              </Flex>
              <Box my={theme.marginSpacing.s} ml="20%" sx={{ border: '1px solid #E6E6E6', width: '68%' }} />
            </FlexBox>
          )}
          {/* {!isPreset && (
            <FlexBox
              vertical
              width="100%"
              px="25px"
              alignItems="center"
            >
      <Box my={theme.marginSpacing.s} ml="5%" sx={{ border: '1px solid #E6E6E6', width: '80%' }} />
              <Flex
                width="100%"
                sx={{ cursor: 'pointer' }}
              // onClick={() => setArchive(true)}
              >
                <Box width="15px" height="15px">
                  <ArchiveIcon isArchived={false} />
                </Box>
      <Text ml="15px" className={classes.label} color="#616161 !important">Archive item</Text>
              </Flex>
            </FlexBox>
          )} */}
          <Flex width="100%" mb={theme.marginSpacing.m} px="25px" alignItems="center" sx={{ cursor: 'pointer' }}>
            <Image src={Restart} />
            <Text ml="15px" className={classes.label} color="#616161 !important">
              Switch unit to
              <Text
                as="span"
                ml="5px"
                px="10px"
                color="#616161"
                sx={{
                  background: '#CCCCCC',
                  opacity: 0.3,
                  borderRadius: '2px'
                }}
              >
                cm
              </Text>
            </Text>
          </Flex>
        </FlexBox>
      </Popover>
      {openDelete && (
        <Dialog
          onClose={() => setOpenDelete(false)}
          open={openDelete}
          PaperProps={{
            style: {
              width: '450px',
              textAlign: 'center',
              overflow: 'hidden'
            }
          }}
        >
          <FlexBox vertical alignItems="center">
            <Flex width="100%" justifyContent="flex-end">
              <IconButton
                onClick={() => setOpenDelete(false)}
                className="closeIcon"
                disableRipple
              >
                <Close />
              </IconButton>
            </Flex>
            <Image
              sx={{ width: '27px', height: '27px' }}
              src={TrashBin}
            />
            <Text
              mt={theme.marginSpacing.s}
              sx={{ fontWeight: 800, fontSize: '16px' }}
            >
              {product}
            </Text>
            <Text mt={theme.marginSpacing.m} width="70%">
              {isGarmentPage ? 'Deleting this item will permanently remove it from this garment'
                : 'This preset can be Linked to multiple garments. If you delete this preset. It affects those garments.'}
            </Text>
            <FlexBox my={theme.marginSpacing.m}>
              <Button
                sx={{
                  width: '109px',
                  height: '34px',
                  background: '#EFEFEF',
                  borderRadius: '4px',
                  fontFamily: theme.fonts.button,
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#4D4D4D'
                }}
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </Button>
              <Button
                ml={['14px', '20px']}
                sx={{
                  width: '109px',
                  height: '34px',
                  background: '#5932F3',
                  border: '1px solid rgba(88, 88, 88, 0.1)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: theme.fonts.button
                }}
                onClick={() => {
                  deletePreset();
                  setOpenSetting(null);
                }}
              >
                Delete item
              </Button>
            </FlexBox>
          </FlexBox>
        </Dialog>
      )}
    </FlexBox>
  );
}
