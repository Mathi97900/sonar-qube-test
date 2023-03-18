import { Close, Done } from '@material-ui/icons';
import { IconButton, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Image, Text } from 'rebass';
import GarmentBodyShapes from '../../../assets/GarmentBodyShapes.png';
import FlexBox from '../../../components/utility/FlexBox';
import { setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import HeaderComponent from './HeaderComponent';
import MeasurementBox from './MeasurementBox';
import SuggestionModel from './SuggestionModel';

const garmentShapes: string[] = ['Hourglass', 'Apple', 'Pear', 'Rectangle', 'Inverted Triangle'];
const bodyShapes: string[] = ['Apple', 'Pear', 'Inverted Triangle', 'Rectangle', 'Hourglass'];

interface GarmentShapesProps {
  setActiveStep: () => void
}

const useStyles = makeStyles(() => ({
  box: {
    cursor: 'pointer',
    height: '39px',
    borderRadius: '6px'
  },
  boxText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%'
  },
  popoverTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '150%',
    color: '#000000'
  },
  popoverText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '150%',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '18%',
    color: '#000000'
  }
}));

export default function GarmentShapes({ setActiveStep }: GarmentShapesProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles();

  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const { garmentShape } = advancedInputs;
  const [isInfo, setIsInfo] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(isInfo);

  const handleChange = (shape: string) => {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentShape: shape
    }));
  };

  function handleClick() {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentShape
    }));
    setActiveStep();
  }
  return (
    <FlexBox vertical justifyContent="center" alignItems="center" width="100%" px={['10px', 'unset']}>
      <HeaderComponent title={'What is the body type it\'s most suitable for?'} isInfo setInfo={(event) => setIsInfo(event.currentTarget)} />
      <FlexBox vertical>
        <FlexBox alignItems="center" mt="64px" flexWrap="wrap">
          {garmentShapes?.map((ele) => (
            <MeasurementBox
              key={ele}
              height="39px"
              value={ele}
              isActive={ele === garmentShape}
              onChange={(garmentShapeValue: string) => handleChange(garmentShapeValue)}
            />
          ))}
        </FlexBox>
        <FlexBox mb={theme.marginSpacing.l} ml="2%">
          <Flex
            justifyContent="center"
            alignItems="center"
            ml={['2%', `${garmentShapes.indexOf(garmentShape) * 18.5}%`]}
            sx={{
              ...theme?.buttons?.activeGarments,
              width: '79px',
              height: '31px',
              marginTop: theme.marginSpacing.m
            }}
            onClick={() => handleClick()}
          >
            <Done />
            <Text mx={1} mt={1}>OK</Text>
          </Flex>
        </FlexBox>
      </FlexBox>
      <FlexBox width="100%" justifyContent="center" mb={theme.marginSpacing.s}>
        <SuggestionModel />
      </FlexBox>
      <Popover
        id="header"
        open={open}
        anchorEl={isInfo}
        onClose={() => setIsInfo(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          style: {
            width: '30%',
            marginLeft: '-10%',
            marginTop: '-4%',
            // backgroundColor: '#FFFFFF',
            minWidth: '300px'
          }
        }}
      >
        <FlexBox vertical p={3}>
          <Flex justifyContent="flex-end">
            <IconButton sx={{ cursor: 'pointer' }} onClick={() => setIsInfo(null)} disableRipple>
              <Close />
            </IconButton>
          </Flex>
          <Flex justifyContent="center">
            <Text className={classes.popoverTitle}>Body Types</Text>
          </Flex>
          <FlexBox>
            <Flex ml="1%">
              <Image src={GarmentBodyShapes} />
            </Flex>
          </FlexBox>
          <Flex>
            {bodyShapes?.map((bodyShape) => (
              <Text key={bodyShape} ml="3%" mt="2%" className={classes.popoverText}>{bodyShape}</Text>
            ))}
          </Flex>
        </FlexBox>
      </Popover>
    </FlexBox>
  );
}
