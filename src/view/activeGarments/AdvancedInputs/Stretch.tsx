import { Done } from '@material-ui/icons';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from 'rebass';
import FlexBox from '../../../components/utility/FlexBox';
import { setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import HeaderComponent from './HeaderComponent';
import SuggestionModel from './SuggestionModel';

interface MeasurementBoxProps {
  value: string,
  isActive: boolean,
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
}

interface StretchProps {
  setActiveStep: () => void
}

const stretches: string[] = ['Non -- 0%', 'Low -- 1.5%', 'Mid -- 4%', 'High -- 8%', 'Very High -- 12%'];

const useStyles = makeStyles(() => ({
  box: {
    cursor: 'pointer',
    padding: '10px',
    height: '38.55px',
    borderRadius: '6px'
  },
  boxText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%'
  }
}));

function MeasurementBox({ value, isActive, onChange }: MeasurementBoxProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <FlexBox
      justifyContent="space-evenly"
      alignItems="center"
      mx="10px"
      mb={[theme.marginSpacing.s, 0]}
      width={value === 'Very High -- 12%' ? '137px' : '111px'}
      className={classes.box}
      sx={{
        border: isActive ? '0.5px solid #5932F3' : '1px solid #DFDFDF',
        backgroundColor: isActive ? 'rgba(89, 50, 243, 0.09)' : ''
      }}
      onClick={() => onChange(value)}
    >
      <Text
        className={classes.boxText}
        sx={{
          color: isActive ? '#5932F3' : '#949494'
        }}
      >
        {value}
      </Text>
    </FlexBox>
  );
}

export default function Stretch({ setActiveStep }: StretchProps) {
  const theme = useTheme<Theme>();
  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const stretch = advancedInputs.garmentStrechy;

  const handleChange = (garmentStrechy: string) => {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentStrechy
    }));
  };

  function handleClick() {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentStrechy: stretch
    }));
    setActiveStep();
  }
  return (
    <FlexBox vertical justifyContent="center" alignItems="center">
      <HeaderComponent title="How stretchy is this garment?" />
      <FlexBox vertical>
        <FlexBox mt="64px" alignItems="center" flexWrap="wrap">
          {stretches?.map((ele) => (
            <MeasurementBox
              key={ele}
              value={ele}
              isActive={stretch === ele}
              onChange={(stretchValue: string) => handleChange(stretchValue)}
            />
          ))}
        </FlexBox>
        <FlexBox mb={theme.marginSpacing.xl} ml="1.5%">
          <Flex
            justifyContent="center"
            alignItems="center"
            ml={['4%', `${stretches.indexOf(stretch) * 19.5}%`]}
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
      <SuggestionModel />
    </FlexBox>
  );
}
