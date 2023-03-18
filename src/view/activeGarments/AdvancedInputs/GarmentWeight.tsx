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

const weights: string[] = ['Light', 'Medium', 'Heavy'];

interface GarmentWeightProps {
  setActiveStep: () => void
}

export default function GarmentWeight({ setActiveStep }: GarmentWeightProps) {
  const theme = useTheme<Theme>();
  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const weight = advancedInputs.garmentWeight;

  const handleChange = (garmentWeight: string) => {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentWeight
    }));
  };

  function handleClick() {
    dispatch(setAdvancedInputs({
      ...advancedInputs,
      garmentWeight: weight
    }));
    setActiveStep();
  }
  return (
    <FlexBox vertical justifyContent="center" alignItems="center">
      <HeaderComponent title="What is the weight of the garment?" />
      <FlexBox vertical>
        <FlexBox flexWrap="wrap" alignItems="center" mt="64px">
          {weights?.map((ele) => (
            <MeasurementBox
              key={ele}
              width="111px"
              height="38.55px"
              value={ele}
              isActive={ele === weight}
              onChange={(value: string) => handleChange(value)}
            />
          ))}
        </FlexBox>
        <FlexBox ml="2%">
          <Flex
            justifyContent="center"
            alignItems="center"
            mb="106px"
            ml={['2%', `${weights.indexOf(weight) * 34}%`]}
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
    </FlexBox>
  );
}
