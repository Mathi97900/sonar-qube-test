import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { Plus } from 'heroicons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Box, Button, Flex, Image, Text
} from 'rebass';
import CongratulationIcon from '../../../assets/CongratulationIcon.png';
import HangerIcon from '../../../assets/HangerIcon.svg';
import AdvancedInputAccordian from '../../../components/Shared/AdvancedInputAccordian';
import FlexBox from '../../../components/utility/FlexBox';
import { setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { pageLoader, showFailureSnackbar, showSuccessSnackbar } from '../../../store/action/snackbarAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import ApiUtil from '../../../util/ApiUtil';
import AdvancedInputs from '../AdvancedInputs';
import PresetList from './PresetList';
import PresetName from './PresetName';
import SuccessStep from './SuccessStep';

interface PresetSelectionBoxProps {
  isNew: boolean,
  title: string,
  onChange: () => void,
}

interface PresetProps {
  status: 'Live' | 'Pending' | 'Archive'
  isMultiple: Boolean,
  isGarmentLive: Boolean,
  setUploadStatus: (value: any) => void // eslint-disable-line no-unused-vars
  setIsGarmentLive: (value: boolean) => void // eslint-disable-line no-unused-vars
  handleNextGarment: () => void
}

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '18px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#000000'
  },
  imageBox: {
    height: '90%',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  imageBoxText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#000000'
  },
  iconBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%'
  },
  predictionTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    lineHeight: '150%'
  },
  button: {
    color: '#fff',
    fontSize: '18px',
    fontFamily: 'AvenirLTPro-Heavy',
    background: '#5932F3',
    border: '1px solid rgba(88, 88, 88, 0.1)',
    borderRadius: '6px',
    height: '42px',
    fontWeight: 900
  }
}));

const initialAdvancedInput = {
  measurementType: 'Layed flat on the ground',
  measurementTolerance: { unit: 'inches', value: 1 },
  garmentStrechy: 'Non -- 0%',
  garmentWeight: 'Light',
  garmentShape: 'Apple',
  garmentSize: 'Tight'
};

function PresetSelectionBox({ isNew, title, onChange }: PresetSelectionBoxProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  return (
    <FlexBox
      vertical
      alignItems="center"
      justifyContent="center"
      mx="3%"
      width={['60%', '20%']}
      mb={[theme.marginSpacing.s, 0]}
      className={classes.imageBox}
      sx={{
        border: `1px solid ${isNew ? 'rgba(89, 50, 243, 0.63)' : '#E7E7E7'}`
      }}
      onClick={() => onChange()}
    >
      <Box
        height="34px"
        width="34px"
        className={classes.iconBackground}
        mb={theme.marginSpacing.m}
        mt={[theme.marginSpacing.m, 0]}
        sx={{
          backgroundColor: title === 'Create new' ? 'rgba(214, 214, 214, 0.31)' : 'rgba(89, 50, 243, 0.09)'
        }}
      >
        <Box
          className={classes.iconBackground}
        >
          {title === 'Create new' ? (
            <Plus style={{ color: '#707072', width: '32', height: '32' }} />
          ) : (
            <Image mb="4px" width="18px" height="15px" color="#5932F3" src={HangerIcon} />
          )}
        </Box>
      </Box>
      <Text className={classes.imageBoxText} mb={[theme.marginSpacing.s, 0]}>{title}</Text>
    </FlexBox>
  );
}

export default function Preset({
  status, isMultiple, isGarmentLive, setUploadStatus, setIsGarmentLive, handleNextGarment
}: PresetProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const location: any = useLocation();
  const isUpload = location.pathname.includes('fileupload');

  const [presetName, setPresetName] = useState('');
  const [presetTitle, setPresetTitle] = useState('');

  const {
    presetsList,
    activeGarmentData,
    advancedInputs
  } = useSelector((state: RootState) => state.activeGarment);
  const { loginUser, currentStore }: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const preset = presetName ? presetsList.find((value: any) => value.preset_name === presetName)
    : {};

  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState('');
  const [isAdvancedInputs, setIsAdvancedInputs] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isShowLive, setisShowLive] = useState(false);

  const handleChange = (value: boolean) => {
    setIsNew(value);
    setTitle(value ? 'Create new' : 'Load a preset');
  };

  const handleNext = (value: string) => {
    setPresetTitle(value);
    setIsAdvancedInputs(true);
    dispatch(setAdvancedInputs(initialAdvancedInput));
  };

  const handleApprove = (value: boolean) => {
    setIsApprove(value);
    setisShowLive(false);
  };

  const measurement = activeGarmentData?.garment_values?.map((garment: any) => garment.measurement);

  // const getDecimalValue = (value: any) => {
  //   const fractions = value.split(' ');
  //   if (fractions[1] === '') {
  //     return Number(value);
  //   }
  //   return Number(fractions[0]) + eval(fractions[1]); // eslint-disable-line no-eval
  // };

  // fraction to decimal convertion
  const getGarmentValues = (data: any) => {
    const s3GarmentValues: any = {};
    data.garment_values[0].size.forEach((sizeKey: string) => {
      measurement.forEach((measurementKey: string) => {
        data.garment_values.forEach((garment: any) => {
          if (measurementKey === garment.measurement) {
            s3GarmentValues[sizeKey] = {
              ...s3GarmentValues[sizeKey],
              [measurementKey]: garment.sizeValues[sizeKey]
              // [measurementKey]: getDecimalValue(garment.sizeValues[sizeKey])
            };
          }
        });
      });
    });
    s3GarmentValues.nonActiveMeasurement = activeGarmentData.garment_values[0].nonActiveMeasurement;

    return s3GarmentValues;
  };

  console.log(status);
  const handleSubmitAdvancedInputs = () => {
    dispatch(pageLoader(true));
    ApiUtil.putWithToken(
      `garmentData/${activeGarmentData.id}`,
      {
        user_id: loginUser.id,
        store: currentStore,
        garmentData: {
          ...activeGarmentData,
          preset_id: preset.id,
          status,
          garment_values: getGarmentValues(activeGarmentData)
        },
        preset_data: {
          ...preset,
          preset_name: title === 'Create new' ? presetTitle : presetName,
          status: 'Live',
          gender: 'Female',
          advanced_inputs: advancedInputs
        }
      }
    )
      .then((res: any) => {
        console.log('res', res);
        dispatch(showSuccessSnackbar('Your garment is successfully moved to live!'));
        dispatch(pageLoader(false));
        setIsGarmentLive(true);
        setIsApprove(false);
        if (title === 'Create new') {
          setSuccess(true);
        }
        if (isUpload) {
          setisShowLive(true);
        }
        setUploadStatus((previousState: any) => ({
          ...previousState, isReview: true, isAddPreset: true, step: 3
        }));
        setTitle('');
        setSuccess(false);
        setPresetTitle('');
      })
      .catch((err: any) => {
        console.log('err', err);
        dispatch(pageLoader(false));
        dispatch(showFailureSnackbar('Something Went Wrong!'));
      });
  };

  useEffect(() => {
    if (activeGarmentData.preset_id) {
      presetsList.forEach((ele: any) => {
        if (ele.id === activeGarmentData.preset_id) {
          setPresetName(ele.preset_name);
          dispatch(setAdvancedInputs(ele.advanced_inputs));
        }
      });
    } else {
      setPresetName('');
    }
    setIsAdvancedInputs(!!activeGarmentData?.preset_id);
    setIsApprove(false);
  }, [presetsList]);

  console.log(
    activeGarmentData?.preset_id,
    isUpload,
    isGarmentLive,
    isApprove,
    isAdvancedInputs,
    isSuccess
  );
  console.log(
    (activeGarmentData.preset_id && !isUpload && !isGarmentLive && isApprove),
    (isApprove && !isSuccess && isAdvancedInputs && !isGarmentLive)
  );

  return (
    <FlexBox
      vertical
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <AdvancedInputAccordian>
        {activeGarmentData?.preset_id ? (
          <FlexBox width="97%" mt={theme.marginSpacing.xl}>
            <AdvancedInputs
              isPreset
              step={1}
              preset={preset}
              onBack={() => {
                setIsApprove(false);
              }}
              setIsApprove={handleApprove}
            />
          </FlexBox>
        ) : (
          <FlexBox>
            {title === '' ? (
              <FlexBox
                flexDirection={['column', 'row']}
                py="58px"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="340px"
              >
                <PresetSelectionBox isNew={!isNew} title="Load a preset" onChange={() => handleChange(false)} />
                <PresetSelectionBox isNew={isNew} title="Create new" onChange={() => handleChange(true)} />
              </FlexBox>
            ) : (
              <FlexBox ml="25px" mt="59px" vertical width="95%">
                {title === 'Create new' ? (
                  <>
                    {!isSuccess && !isAdvancedInputs && (
                      <PresetName
                        title={presetTitle}
                        setTitle={(value: string) => setTitle(value)}
                        onNext={handleNext}
                      />
                    )}
                    {!isSuccess && isAdvancedInputs && (
                      <AdvancedInputs
                        onBack={() => {
                          setIsAdvancedInputs(false);
                          setPresetName('');
                          setIsApprove(false);
                          setIsGarmentLive(false);
                          // setSuccess(false);
                        }}
                        setIsApprove={handleApprove}
                      />
                    )}
                    {isSuccess && (
                      <SuccessStep
                        presetTitle={presetTitle}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {!isSuccess && !isAdvancedInputs && (
                      <PresetList
                        setTitle={(value: string) => setTitle(value)}
                        presetName={presetName}
                        setPresetName={setPresetName}
                      />
                    )}
                    {!isSuccess && isAdvancedInputs && (
                      <AdvancedInputs
                        isPreset
                        preset={preset}
                        onBack={() => {
                          setIsAdvancedInputs(false);
                          setPresetName('');
                          setIsApprove(false);
                        }}
                        setIsApprove={handleApprove}
                      />
                    )}
                  </>
                )}
              </FlexBox>
            )}
          </FlexBox>
        )}
      </AdvancedInputAccordian>
      {presetName && !isAdvancedInputs
        && !isSuccess && title === 'Load a preset' && (
          <Flex width="100%" justifyContent="flex-end" my="25px">
            <Button
              sx={{
                width: '85px',
                height: '38px',
                background: '#5932F3',
                borderRadius: '4px',
                fontFamily: 'AvenirLTPro-Heavy',
                fontWeight: 900,
                fontSize: '14px',
                lineHeight: '150%',
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => {
                setIsAdvancedInputs(true);
                if (setUploadStatus) {
                  setUploadStatus((previousState: any) => ({
                    ...previousState, isAddPreset: true
                  }));
                }
                dispatch(setAdvancedInputs(preset?.advanced_inputs));
              }}
            >
              Apply
            </Button>
          </Flex>
      )}
      <Flex justifyContent="flex-end" mb="25px" width="100%" mt={theme.marginSpacing.xl}>
        {/* {((activeGarmentData.preset_id && !isUpload && !isGarmentLive) || (
          isApprove && !isSuccess && isAdvancedInputs && !isGarmentLive)) && ( */}
        {((activeGarmentData?.preset_id && !isGarmentLive && !isUpload) || isApprove) && (
          <Button
            className={classes.button}
            width="206px"
            sx={{
              ...theme?.buttons?.activeGarments
            }}
            onClick={handleSubmitAdvancedInputs}
          >
            Approve Garment
          </Button>
        )}
        {activeGarmentData.preset_id && isUpload && isGarmentLive && isShowLive && (
          <FlexBox width="50%" justifyContent="flex-end" alignItems="center">
            <Flex mr={isMultiple ? '20px' : ''}>
              <Image src={CongratulationIcon} />
              <Text className={classes.header} color="#5932F3 !important">Garment is live!</Text>
            </Flex>
            {isMultiple && (
              <Button
                className={classes.button}
                sx={{
                  ...theme?.buttons?.activeGarments
                }}
                onClick={() => {
                  handleNextGarment();
                  setIsGarmentLive(false);
                  setUploadStatus((previousStatus: any) => ({
                    ...previousStatus, isReview: false, isAddPreset: false
                  }));
                  setSuccess(false);
                  setTitle('');
                  setIsAdvancedInputs(false);
                }}
              >
                Customise next garment
              </Button>
            )}
          </FlexBox>
        )}
      </Flex>
    </FlexBox>
  );
}
