import { Done } from '@material-ui/icons';
import { useTheme } from 'emotion-theming';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from 'rebass';
import FlexBox from '../../../components/utility/FlexBox';
import { setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import HeaderComponent from './HeaderComponent';
import MeasurementBox from './MeasurementBox';
import SuggestionModel from './SuggestionModel';

const meants: string[] = ['Tight', 'Regular', 'Oversized'];

export default function GarmentMeant() {
  const theme = useTheme<Theme>();

  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const meant = advancedInputs.garmentSize;

  const handleChange = (garmentSize: string) => {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentSize
    }));
  };

  function handleClick() {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentSize: meant
    }));
  }
  return (
    <FlexBox vertical alignItems="center" px={['10px', 0]}>
      <HeaderComponent title="How is this garment meant to be worn?" />
      <FlexBox vertical mt="64px">
        <Flex flexWrap="wrap">
          {meants?.map((ele) => (
            <MeasurementBox
              key={ele}
              height="39px"
              value={ele}
              isActive={ele === meant}
              onChange={(meantValue: string) => handleChange(meantValue)}
            />
          ))}
        </Flex>
        <FlexBox ml="2%">
          <Flex
            mb={theme.marginSpacing.xl}
            justifyContent="center"
            alignItems="center"
            ml={['2%', `${(meants.indexOf(meant)) * 32}%`]}
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
