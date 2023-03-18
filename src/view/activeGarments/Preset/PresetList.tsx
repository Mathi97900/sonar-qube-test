import { TextField } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Flex, Image, Text
} from 'rebass';
import HangerIcon from '../../../assets/HangerIcon.svg';
import BackButton from '../../../components/Shared/BackButton';
import FlexBox from '../../../components/utility/FlexBox';
import { RootState } from '../../../store/reducer';
import { presetType } from '../../../store/reducer/activeGarmentReducer';
import { Theme } from '../../../theme/px/types';

interface PresetBoxViewProps {
  title: string,
  gender: string,
  status: string,
  isActive: boolean,
  onOpen: () => void,
  onSelect: (value: string) => void // eslint-disable-line no-unused-vars
}

interface PresetListProps {
  presetName: string,
  setPresetName: (value: string) => void // eslint-disable-line no-unused-vars,
  setTitle: (value: string) => void // eslint-disable-line no-unused-vars
}

const useStyles = makeStyles(() => ({
  searchBar: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#878787',
    background: '#F9F9F9',
    borderRadius: '6px'
  },
  iconBox: {
    width: '34px',
    height: '34px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: 'rgba(89, 50, 243, 0.09)'
  },
  presetBox: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 6px rgba(121, 117, 117, 0.09)',
    borderRadius: '6px'
  },
  liveBox: {
    width: '88px',
    height: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px'
  },
  presetName: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#1E1E1E'
  },
  genderText: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%'
  },
  emptyText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '150%'
  },
  button: {
    width: '116px',
    height: '32px',
    background: '#5932F3',
    borderRadius: '4px',
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#FFFFFF'
  }
}));

function PresetBoxView({
  title, gender, status, isActive, onOpen, onSelect
}: PresetBoxViewProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <FlexBox
      flexDirection={['column', 'row']}
      width="95%"
      mb="15px"
      py={theme.marginSpacing.m}
      className={classes.presetBox}
      sx={{
        border: `1px solid ${isActive ? '#5932F3' : '#F2F2F2'}`
      }}
      onClick={() => onSelect(title)}
    >
      <Flex
        width={['90%', '31%']}
        mr="9%"
        ml="2%"
        mb={[theme.marginSpacing.s, 0]}
        alignItems="center"
        justifyContent={['center', 'unset']}
      >
        <Box className={classes.iconBox} mr="5%" onClick={isActive ? () => onOpen() : undefined}>
          <Image mb="4px" width="18px" height="15px" color="#5932F3" src={HangerIcon} />
        </Box>
        <Text className={classes.presetName}>{title}</Text>
      </Flex>
      <Flex width={['100%', '22%']} mr="23%" flexGrow={1} justifyContent={['center', 'unset']} mb={[theme.marginSpacing.s, 0]}>
        <Box mr="5%" className={classes.liveBox} sx={{ backgroundColor: '#F4F4F4' }}>
          <Text className={classes.genderText} color="#4E4E4E">{gender}</Text>
        </Box>
        <Box
          className={classes.liveBox}
          sx={{
            color: status === 'Pending' ? '#FF932F' : status === 'Live' ? '#5932F3' : '#4E4E4E',
            backgroundColor: status === 'Pending' ? ' rgba(255, 147, 47, 0.12)'
              : status === 'Live' ? 'rgba(89, 50, 243, 0.05)' : '#F4F4F4'
          }}
        >
          <Text className={classes.genderText}>{status}</Text>
        </Box>
      </Flex>
      <Flex width={['90%', '9%']} justifyContent={['center', 'unset']} sx={{ cursor: 'pointer' }} onClick={isActive ? () => onOpen() : undefined} mb={[theme.marginSpacing.s, 0]}>
        <Text mr="15%" className={classes.genderText} color="#5932F3" fontSize="18px !important">view</Text>
        <NavigateNext style={{ color: '#5932F3' }} />
      </Flex>
    </FlexBox>
  );
}

export default function PresetList({ presetName, setPresetName, setTitle }: PresetListProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const { presetsList, activeGarmentData } = useSelector((state: RootState) => state.activeGarment);
  const navigate = useNavigate();

  const preset = presetName ? presetsList.find((value: any) => value.preset_name === presetName)
    : {};
  const [filteredList, setFilteredList] = useState<presetType[]>(presetsList);

  useEffect(() => {
    setFilteredList(presetsList);
  }, [presetsList]);

  return (
    <FlexBox vertical mb={theme.marginSpacing.xxl}>
      {presetsList.length > 0 && (
        <Flex flexDirection={['column', 'row']} width="97%" justifyContent="space-between">
          <BackButton
            onClick={() => {
              setTitle('');
              setPresetName('');
            }}
          />
          <TextField
            className={classes.searchBar}
            variant="outlined"
            placeholder="Search presets"
            style={{ border: 'none' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: '#878787' }} />
                </InputAdornment>
              )
            }}
            onChange={(event) => {
              setFilteredList(presetsList.filter((ele: any) => ele.preset_name.toLowerCase().includes(event.target.value.toLowerCase()))); // eslint-disable-line max-len
            }}
          />
        </Flex>
      )}
      <FlexBox
        vertical
        justifyContent="center"
        alignItems="center"
        mt={theme.marginSpacing.m}
      >
        {filteredList.length > 0 && filteredList?.map((ele: any) => (
          <PresetBoxView
            key={ele.preset_name}
            title={ele.preset_name}
            isActive={presetName === ele.preset_name}
            status={ele.status}
            gender={ele.gender}
            onSelect={(value: string) => setPresetName(value)}
            onOpen={() => navigate(`/app/active-garments/preset/${btoa(preset?.id)}`, { state: { garmentData: activeGarmentData } })}
          // onOpen={() => navigate(`
          // /app / activeGarments / preset / ${activeGarmentData.id} / ${preset?.id}
          //     `)}
          />
        ))}
      </FlexBox>
      {presetsList.length === 0 && (
        <FlexBox vertical>
          <Flex width="97%" justifyContent="space-between" mb={theme.marginSpacing.xxl}>
            <BackButton onClick={() => setTitle('')} />
          </Flex>
          <FlexBox vertical px="25px" sx={{ background: '#F9F9FB', borderRadius: '6px' }}>
            <Text mt="34px" className={classes.emptyText} color="#868686">What are preset?</Text>
            <Text my={theme.marginSpacing.m} className={classes.emptyText} color="#1E1E1E">Preset are sizing and measurement inputs that can be used for multiple garments.</Text>
            <Button mb="34px" className={classes.button} onClick={() => setTitle('Create new')}>
              Create
            </Button>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
}
