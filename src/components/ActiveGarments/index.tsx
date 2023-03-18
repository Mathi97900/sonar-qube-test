import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import { Select } from '@rebass/forms';
// import Slider from '@material-ui/Slider';
import { Buffer } from 'buffer';
import { useTheme } from 'emotion-theming';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box, Button, Flex, Image, Text
} from 'rebass';
import DropFile from '../../assets/DropFile.svg';
import OpenArrow from '../../assets/OpenArrow.svg';
import { pageLoader } from '../../store/action/snackbarAction';
import { RootState } from '../../store/reducer';
import '../../styles/activeGarments.css';
import { Theme } from '../../theme/px/types';
import ApiUtil from '../../util/ApiUtil';
import { SelectBox } from '../Shared/Select';
import FlexBox from '../utility/FlexBox';

// const Fraction = require('fractions');

interface GarmentDetailBoxProps {
  productName: string,
  status: string,
  setIsGarment: (value: string) => void // eslint-disable-line no-unused-vars
}

const useStyles = makeStyles(() => ({
  garmentDetailBox: {
    background: '#FFFFFF',
    boxShadow: '0px 8px 20px rgba(149, 149, 149, 0.14)',
    borderRadius: '12px'
  },
  statusBox: {
    width: '88px',
    height: '28px',
    borderRadius: '4px',
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  measurementText: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#5932F3'
  },
  archiveBox: {
    height: '33px',
    width: '128px',
    borderRadius: '4px'
  }
}));

const statusOptions: { lbl: string, val: string }[] = [
  { lbl: 'Live', val: 'Live' },
  { lbl: 'Pending', val: 'Pending' },
  { lbl: 'Archived', val: 'Archive' }
];
function GarmentDetailBox({ productName, status, setIsGarment }: GarmentDetailBoxProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <FlexBox
      width="100%"
      alignItems="center"
      px="25px"
      className={classes.garmentDetailBox}
      mb={theme.marginSpacing.s}
      py={theme.marginSpacing.m}
    >
      <Flex width={['100%', '50%']}>
        <Text mr="30px" width={['100%', '40%']} className="garmentName">{productName}</Text>
        <Box
          className={classes.statusBox}
          display={['none', 'flex']}
          sx={{
            backgroundColor: status === 'Live' ? 'rgba(89, 50, 243, 0.05)' : status === 'Pending' ? 'rgba(255, 147, 47, 0.12)' : '#F4F4F4',
            color: status === 'Live' ? '#5932F3' : status === 'Pending' ? '#FF932F' : '#4E4E4E'
          }}
        >
          {status}
        </Box>
      </Flex>
      <Flex
        width="48%"
        justifyContent="flex-end"
      >
        <Flex
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsGarment(productName)}
          onKeyDown={() => console.log('onKeyDown')}
          onKeyUp={() => console.log('onKeyUp')}
          onKeyPress={() => console.log('onKeyPress')}
        >
          <Image src={OpenArrow} />
        </Flex>
      </Flex>
    </FlexBox>
  );
}

// const getFractionValue = (value: any) => {
//   if (value.toString().includes('/')) {
//     return value;
//   }
//   const fractionValue: any = parseFloat(value).toFixed(2);
//   const fractions = new Fraction((fractionValue % 1).toFixed(2)).toString();
//   return `${parseInt(value, 10)} ${fractions === '0' ? '' : fractions}`;
// };

export default function ActiveGarments() {
  const theme = useTheme<Theme>();

  const { loginUser, currentStore }: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams]: any = useSearchParams();

  const activeGarmentContRef = useRef(document.createElement('div'));
  const [garmentData, setGarmentData] = useState<any>([]);
  const [filteredActiveGarments, setFilteredActiveGarments] = useState<any>(garmentData);
  const status = searchParams.get('status') || 'Live';
  console.log(searchParams.get('status'), status);

  const handleSelectGarment = (value: string) => {
    const selectedGarment = garmentData.filter((product: any) => product.garment_name === value);
    console.log(Buffer.from(selectedGarment[0].id.toString()).toString('base64'));
    navigate(`${btoa(selectedGarment[0].id)}`);
  };

  useEffect(() => {
    dispatch(pageLoader(true));
    const getUserCredentials = localStorage.getItem('userCredentials');
    const userCredentials = getUserCredentials && JSON.parse(getUserCredentials);

    ApiUtil.postWithToken('garmentData/getGarmentData', {
      user_id: userCredentials.user.id || loginUser.id,
      store_id: userCredentials.store.id || currentStore.id,
      status
    })
      .then((res: any) => {
        setGarmentData(res.data);
        setFilteredActiveGarments(res.data);
        dispatch(pageLoader(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(pageLoader(false));
      });
  }, [status]);

  return (
    <Box ref={activeGarmentContRef} px={[theme.marginSpacing.xl, '80px']} width="100vw" mb="80px">
      <Box>
        <Text
          mt={theme.marginSpacing.xxxl}
          sx={{ fontFamily: theme.fonts.heading, fontSize: '32px' }}
        >
          Active Garments
        </Text>
        <FlexBox
          justifyContent="space-between"
          mt={theme.marginSpacing.xxxl}
          alignItems="center"
        >
          <Text sx={{ fontFamily: theme.fonts.button, fontSize: '24px' }}>
            List of all garments
          </Text>
          <Button
            ml={['14px', '34px']}
            mb={[theme.marginSpacing.xl, theme.marginSpacing.m]}
            mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
            sx={{
              width: '158.79px',
              height: '39px',
              background: '#5932F3',
              border: '1px solid rgba(197, 197, 197, 0.1)',
              boxSizing: 'border-box',
              boxShadow: '0px 2px 4px rgba(155, 155, 155, 0.25)',
              borderRadius: '6px',
              fontFamily: theme.fonts.button,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}
            onClick={(e) => {
              e.stopPropagation();
              // setIsUpload(true);
              navigate('fileupload');
            }}
          >
            <Image src={DropFile} />
            <Text sx={{ fontSize: '13px', marginLeft: '5px', cursor: 'pointer' }}>
              drop in files
            </Text>
          </Button>
        </FlexBox>
        <FlexBox
          mt={theme.marginSpacing.xxl}
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            fontSize="16px"
            sx={{
              width: '217.78px',
              height: '51px',
              border: 'none'
            }}
          >
            <TextField
              variant="outlined"
              id="input-with-icon-textfield"
              placeholder="Search items"
              style={{ border: 'none' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: '#878787' }} />
                  </InputAdornment>
                )
              }}
              onChange={(event) => {
                setFilteredActiveGarments(garmentData.filter((key: any) => (key.garment_name.toLowerCase().includes(event.target.value.toLowerCase())))); // eslint-disable-line max-len
              }}
            />
          </Box>
          <FlexBox mt={['10%', 0]}>
            <SelectBox
              options={statusOptions}
              activeOption={status}
              setOption={(value: string) => setSearchParams({ status: value })}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox mt={theme.marginSpacing.xxl}>
          <Box
            style={{
              height: 'auto',
              width: '100%'
            }}
          >
            {filteredActiveGarments && filteredActiveGarments.map((product: any) => (
              <GarmentDetailBox
                key={product.garment_name}
                productName={product.garment_name}
                status={product.status}
                setIsGarment={handleSelectGarment}
              />
            ))}
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
}
