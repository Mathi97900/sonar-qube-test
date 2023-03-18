import { Done } from '@material-ui/icons';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Flex, Image, Text
} from 'rebass';
import Ground from '../../../assets/Ground.png';
import HangUp from '../../../assets/hangUp.png';
import RadioTick from '../../../components/Shared/RadioTick';
import FlexBox from '../../../components/utility/FlexBox';
import { setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import HeaderComponent from './HeaderComponent';

interface MeasurementComponentProps {
  url: string,
  type: string,
  isHangUp: boolean,
  onChange: (type: string) => void // eslint-disable-line no-unused-vars
}

interface MeasurementTypeProps {
  setActiveStep: () => void
}

const useStyles = makeStyles(() => ({
  imageBox: {
    cursor: 'pointer',
    borderRadius: '8px',
    '@media only screen and (max-width: 780px)': {
      width: '90%',
      marginBottom: '20px'
    },
    width: '35%'
  },
  image: {
    borderRadius: '8px',
    height: '150px',
    width: '40%'
  },
  text: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#1E1E1E'
  }
}));

function MeasurementComponent({
  url, type, isHangUp, onChange
}: MeasurementComponentProps) {
  const classes = useStyles();
  return (
    <FlexBox
      vertical
      justifyContent="center"
      mr="5%"
      py="5%"
      px="20px"
      className={classes.imageBox}
      sx={{
        border: isHangUp ? '1px solid #5932F3' : '1px solid #DFDFDF'
      }}
      onClick={() => onChange(type)}
    >
      <FlexBox
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className={classes.image}
        >
          <Image src={url} />
        </Flex>
      </FlexBox>
      <FlexBox mt="10%" ml="6%">
        <Box>
          <RadioTick isActive={isHangUp} />
        </Box>
        <Text className={classes.text}>{type}</Text>
      </FlexBox>
    </FlexBox>
  );
}

export default function MeasurementType({ setActiveStep }: MeasurementTypeProps) {
  const theme = useTheme<Theme>();

  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();
  const type = advancedInputs.measurementType ? advancedInputs.measurementType : 'Hang up';

  const handleChange = (value: string) => {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      measurementType: value
    }));
  };

  function handleClick() {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      measurementType: type
    }));
    setActiveStep();
  }

  return (
    <FlexBox width="100%" vertical justifyContent="center" alignItems="center">
      <HeaderComponent title="How do you take your measurements?" />
      <FlexBox vertical width="90%" mt={theme.marginSpacing.xl}>
        <Flex width="100%" justifyContent="center" alignItems="center" flexWrap="wrap">
          <MeasurementComponent url={Ground} type="Layed flat on the ground" isHangUp={!(type === 'Hang up')} onChange={(measuremntType: string) => handleChange(measuremntType)} />
          <MeasurementComponent url={HangUp} type="Hang up" isHangUp={type === 'Hang up'} onChange={(measuremntType: string) => handleChange(measuremntType)} />
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          ml={['2%', type === 'Hang up' ? '50%' : '10%']}
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
  );
}
