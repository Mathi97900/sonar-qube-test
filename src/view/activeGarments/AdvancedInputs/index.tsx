import { Box, IconButton } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Image, Text } from 'rebass';
import ArrowDown from '../../../assets/ArrowDown.svg';
import ArrowUp from '../../../assets/ArrowUp.svg';
import HangerIcon from '../../../assets/HangerIcon.svg';
import BackButton from '../../../components/Shared/BackButton';
import FlexBox from '../../../components/utility/FlexBox';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import GarmentMeant from './GarmentMeant';
import GarmentShapes from './GarmentShapes';
import GarmentWeight from './GarmentWeight';
import MeasurementTolerance from './MeasurementTolerance';
import MeasurementType from './MeasurementTypes';
import Stretch from './Stretch';

interface AdvancedInputsProps {
  step?: number, // eslint-disable-line react/require-default-props
  preset?: any, // eslint-disable-line react/require-default-props
  isPreset?: boolean, // eslint-disable-line react/require-default-props
  isPresetPreview?: boolean, // eslint-disable-line react/require-default-props
  setIsApprove?: (value: boolean) => void, // eslint-disable-line react/require-default-props, no-unused-vars, max-len
  onBack: () => void,
}

// const initialAdvancedInput = {
//   measurementType: 'Layed flat on the ground',
//   measurementTolerance: { unit: 'inches', value: 1 },
//   garmentStrechy: 'Non -- 0%',
//   garmentWeight: 'Light',
//   garmentShape: 'Apple',
//   garmentSize: 'Tight'
// };

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '18px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#000000'
  },
  scrollBar: {
    backgroundColor: '#E3E3E3',
    justifyContent: 'flex-end',
    transform: 'rotate(0Deg)',
    width: '7px',
    height: '340px',
    borderRadius: '4px'
  },
  slider: {
    width: '7px',
    height: '145px',
    borderRadius: '4px',
    backgroundColor: '#5932F3',
    transition: 'transform 0.5s'
  },
  step: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 900,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#878787'
  },
  stepUp: {
    width: '42px',
    border: '1px solid #ECECEC !important',
    borderRadius: '4px 0 0 4px !important'
  },
  stepDown: {
    width: '43px',
    border: '1px solid #ECECEC !important',
    borderRadius: '0 4px 4px 0 !important'
  },
  button: {
    color: '#fff',
    fontSize: '18px',
    fontFamily: 'AvenirLTPro-Heavy',
    background: '#5932F3',
    border: '1px solid rgba(88, 88, 88, 0.1)',
    borderRadius: '6px',
    width: '206px',
    height: '42px',
    fontWeight: 900
  },
  presetName: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#1E1E1E'
  },
  iconBackground: {
    height: '34px',
    width: '34px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(89, 50, 243, 0.09)',
    borderRadius: '50%'
  },
  previewBox: {
    border: '1px solid rgba(89, 50, 243, 0.29)',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function AdvancedInputs({
  preset, isPreset, isPresetPreview, step, onBack, setIsApprove
}: AdvancedInputsProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const [activeStep, setActiveStep] = useState(step || 1);

  const { activeGarmentData } = useSelector((state: RootState) => state.activeGarment);

  const handleNextStep = () => {
    if (activeStep === 2) {
      setActiveStep((previousActiveStep) => previousActiveStep + ((activeGarmentData?.type === 'isRange' && !isPresetPreview) ? 2 : 1));
    } else {
      setActiveStep((previousActiveStep) => previousActiveStep + 1);
    }
    if (activeStep === 5 && setIsApprove) {
      setIsApprove(true);
    }
  };

  const handleBackStep = () => {
    if (activeStep === 4) {
      setActiveStep((previousActiveStep) => previousActiveStep - ((activeGarmentData?.type === 'isRange' && !isPresetPreview) ? 2 : 1));
    } else {
      setActiveStep((previousActiveStep) => previousActiveStep - 1);
    }
    if (activeStep === 6 && setIsApprove) {
      setIsApprove(false);
    }
  };

  useEnhancedEffect(() => {
    if (step) {
      setActiveStep(step);
    }
  }, [preset, step]);

  return (
    <FlexBox vertical width="100%">

      {isPreset ? (
        <Flex justifyContent="center">
          <FlexBox
            px="20px"
            height="58px"
            justifyContent="space-around"
            alignItems="center"
            className={classes.previewBox}
            onClick={onBack}
          >
            <Box
              className={classes.iconBackground}
            >
              <Image mb="4px" width="18px" height="15px" color="#5932F3" src={HangerIcon} />
            </Box>
            <Text className={classes.presetName} ml="10px">{preset?.preset_name}</Text>
          </FlexBox>
        </Flex>
      ) : (
        <Flex><BackButton onClick={onBack} /></Flex>
      )}
      <Flex flexDirection="column">
        <Flex>
          <Box flexGrow={1} width="100%" height={['100%', '470px']}>
            {activeStep === 1 ? (
              <MeasurementType
                setActiveStep={() => setActiveStep((previousStep) => previousStep + 1)}
              />
            ) : activeStep === 2 ? (
              <MeasurementTolerance
                setActiveStep={() => setActiveStep((previousStep) => previousStep + ((activeGarmentData?.type === 'isRange' && !isPresetPreview) ? 2 : 1))}
              />
            ) : activeStep === 3 ? (
              <Stretch setActiveStep={() => setActiveStep((previousStep) => previousStep + 1)} />
            ) : activeStep === 4 ? (
              <GarmentWeight
                setActiveStep={() => setActiveStep((previousStep) => previousStep + 1)}
              />
            ) : activeStep === 5 ? (
              <Flex width="100%" justifyContent="center" alignItems="center">
                <GarmentShapes
                  setActiveStep={() => {
                    setActiveStep((previousStep) => previousStep + 1);
                    if (setIsApprove) {
                      setIsApprove(true);
                    }
                  }}
                />
              </Flex>
            ) : (
              <GarmentMeant />
            )}
          </Box>
          <FlexBox alignItems={['center', 'unset']}>
            <Box className={classes.scrollBar}>
              <Box
                className={classes.slider}
                sx={{
                  transform: `translateY(${(activeStep - 1) * 27}%)`
                }}
              />
            </Box>
          </FlexBox>
        </Flex>
        <Flex px={4} justifyContent="flex-end" alignItems="center" mb={theme.marginSpacing.xl} mt={[theme.marginSpacing.s, 0]}>
          <Text className={classes.step} mx={2}>{`${activeStep} / 6`}</Text>
          <Flex sx={{ borderRadius: '4px', cursor: 'pointer' }} width="85px" height="32px" mx={2}>
            <IconButton
              className={classes.stepUp}
              onClick={() => handleNextStep()}
              disabled={activeStep === 6}
              disableRipple
            >
              <Image src={ArrowDown} />
            </IconButton>
            <IconButton
              className={classes.stepDown}
              onClick={() => handleBackStep()}
              disabled={activeStep === 1}
              disableRipple
            >
              <Image src={ArrowUp} />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </FlexBox>
  );
}
