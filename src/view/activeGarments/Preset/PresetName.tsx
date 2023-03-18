import { CircularProgress } from '@material-ui/core';
import { Done, Error } from '@material-ui/icons';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Button, Flex, Text
} from 'rebass';
import BackButton from '../../../components/Shared/BackButton';
import FlexBox from '../../../components/utility/FlexBox';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';

interface PresetNameProps {
  title: string,
  setTitle: (value: string) => void // eslint-disable-line no-unused-vars
  onNext: (value: string) => void // eslint-disable-line no-unused-vars
}

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  tickBox: {
    width: '21px',
    height: '21px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    background: '#5932F3'
  },
  button: {
    width: '116px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#5932F3',
    marginRight: '34px',
    borderRadius: '4px',
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '150%',
    cursor: 'pointer',
    color: '#FFFFFF'
  }
}));

export default function PresetName({ title, setTitle, onNext }: PresetNameProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const { presetsList } = useSelector((state: RootState) => state.activeGarment);

  const [name, setName] = useState<string>(title);
  const [showNext, setShowNext] = useState<string>('');

  return (
    <Flex flexDirection="column">
      <FlexBox vertical ml="1%">
        <FlexBox vertical>
          <BackButton onClick={() => setTitle('')} />
          <Text
            mt="59px"
            className={classes.title}
            mb={theme.marginSpacing.m}
          >
            Name of the preset
          </Text>
          <FlexBox vertical mb={showNext !== 'success' ? '138px' : ''}>
            <TextField
              variant="outlined"
              id="input-with-icon-textfield"
              style={{
                border: 'none',
                width: '40%',
                height: '60px'
              }}
              value={name}
              error={showNext === 'error'}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setShowNext('loading');
                  if (presetsList.length === 0 || (!presetsList.find((ele: any) => ele.preset_name.toLowerCase() === name.toLowerCase()) && (name !== ''))) {
                    setShowNext('success');
                  } else {
                    setShowNext('error');
                  }
                } else if (event.key === ('Backspace' || 'Delete')) {
                  setShowNext('');
                }
              }}
              onChange={(event) => {
                setShowNext('');
                setName(event.target.value);
                setShowNext('loading');
                if (presetsList.length === 0 || (!presetsList.find((ele: any) => ele.preset_name.toLowerCase() === event.target.value.toLowerCase()) && (event.target.value !== ''))) {
                  setShowNext('success');
                } else {
                  setShowNext('error');
                }
              }}
              InputProps={{
                endAdornment: (
                  showNext === '' ? undefined
                    : (showNext === 'loading' ? (
                      <CircularProgress size={20} style={{ color: '#5932F3' }} />
                    ) : (showNext === 'success' ? (
                      <Box className={classes.tickBox}>
                        <Done style={{ height: '15px', width: '15px' }} />
                      </Box>
                    ) : (showNext === 'error' && (
                      <Error style={{ color: 'red' }} />
                    ))))
                )
              }}
            />
            {showNext === 'error' && (
              <Text sx={{ color: 'red' }}>{name === '' ? 'Please enter the preset name' : 'Preset name is already exists'}</Text>
            )}
          </FlexBox>
          {showNext === 'success' && (
            <Flex justifyContent="flex-end" mb="25px">
              <Button
                className={classes.button}
                mt="138px"
                onClick={() => {
                  onNext(name);
                }}
              >
                Next
              </Button>
            </Flex>
          )}
        </FlexBox>
      </FlexBox>
    </Flex>
  );
}
