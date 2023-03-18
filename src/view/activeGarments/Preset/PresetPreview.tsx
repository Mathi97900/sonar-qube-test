import { Close, Done, NavigateNext } from '@material-ui/icons';
import { AccordionDetails, Dialog, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import { useTheme } from 'emotion-theming';
import { ChevronLeft } from 'heroicons-react';
import { ReactChild, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, Flex, Image, Text
} from 'rebass';
import SettingsIcon from '../../../assets/SettingsIcon.svg';
import AdvancedInputAccordian from '../../../components/Shared/AdvancedInputAccordian';
import { SettingPopover } from '../../../components/Shared/SettingsPopover';
import Switch from '../../../components/Shared/Switch';
import FlexBox from '../../../components/utility/FlexBox';
import { setActiveGarmentData, setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { setCurrentStore, setLoginUser } from '../../../store/action/authAction';
import { pageLoader } from '../../../store/action/snackbarAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import ApiUtil from '../../../util/ApiUtil';
import AdvancedInputs from '../AdvancedInputs';
import MeasurementBox from '../AdvancedInputs/MeasurementBox';

interface AdvancedInputPreviewBoxProps {
  title: string,
  children: ReactChild,
  isSwitch?: boolean, // eslint-disable-line react/require-default-props
  onEdit: () => void,
  setPreset?: (value: any) => void, // eslint-disable-line react/require-default-props, no-unused-vars, max-len
}

interface MeasurementRowProps {
  product: any,
}

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 800,
    fontSize: '24px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  presetBox: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 9px rgba(196, 196, 196, 0.39)',
    borderRadius: '6px',
    borderTop: '4px solid',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(to right, #CCBFFF 0%, #7AE7C7 100%, #ffffff)'
  },
  presetName: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  label: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  date: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    lineHeight: '150%'
  },
  predictionTitleBox: {
    background: 'rgba(255, 255, 255, 0.16)',
    boxShadow: '0px 0px 5px rgba(196, 196, 196, 0.41)',
    borderRadius: '6px'
  },
  predictionTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    lineHeight: '150%'
  },
  predictionBox: {
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: '4px'
  },
  statusBox: {
    height: '28px',
    width: '109px',
    borderRadius: '4px',
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    cursor: 'pointer'
  },
  advancedInputBox: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 9px rgba(86, 86, 86, 0.16)',
    borderRadius: '6px'
  },
  button: {
    width: '162px',
    height: '38px',
    background: '#5932F3',
    borderRadius: '4px',
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF'
  }
}));

function MeasurementRow({ product }: MeasurementRowProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles();

  const { activeGarmentData } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();
  let { nonActiveMeasurement } = activeGarmentData.garment_values[0];

  // const measurement =
  // activeGarmentData?.garment_values?.map((garment: any) => garment.measurement);
  // const getGarmentValues = (data: any) => {
  //   console.log(data);
  //   const s3GarmentValues: any = {};
  //   data[0].size.forEach((sizeKey: string) => {
  //     measurement.forEach((measurementKey: string) => {
  //       data.forEach((garment: any) => {
  //         if (measurementKey === garment.measurement) {
  //           s3GarmentValues[sizeKey] = {
  //             ...s3GarmentValues[sizeKey],
  //             [measurementKey]: garment.sizeValues[sizeKey]
  //             // [measurementKey]: getDecimalValue(garment.sizeValues[sizeKey])
  //           };
  //         }
  //       });
  //     });
  //   });
  //   s3GarmentValues.nonActiveMeasurement = data[0].nonActiveMeasurement;

  //   console.log(s3GarmentValues);
  //   return s3GarmentValues;
  // };

  const setMeasurementStatus = () => {
    console.log(product.measurement, nonActiveMeasurement.includes(product.measurement));
    if (nonActiveMeasurement.includes(product.measurement)) {
      nonActiveMeasurement = nonActiveMeasurement.filter((e: string) => e !== product.measurement);
    } else {
      nonActiveMeasurement.push(product.measurement);
    }

    const garmentValues = activeGarmentData?.garment_values.map((garment: any) => (
      { ...garment, nonActiveMeasurement }
    ));

    dispatch(setActiveGarmentData({ ...activeGarmentData, garment_values: garmentValues }));
    console.log(activeGarmentData.garment_values, garmentValues);
    // dispatch(pageLoader(true));
    // ApiUtil.putWithToken(
    //   `garmentData/updateMeasurements/${activeGarmentData.id}`,
    //   { garment_values: getGarmentValues(garmentValues) }
    // )
    //   .then((res) => {
    //     dispatch(pageLoader(false));
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     dispatch(pageLoader(false));
    //     console.log(err);
    //   });
  };
  console.log(activeGarmentData);

  return (
    <Flex
      key={product.measurement}
      height="61px"
      width="100%"
      mt={theme.marginSpacing.s}
      className={classes.predictionBox}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        ml="4%"
        className={classes.predictionTitle}
        sx={{
          fontSize: '16px',
          textTransform: 'capitalize',
          color: '#000000'
        }}
      >
        {product.measurement}
      </Text>
      <Flex
        mr="4%"
        alignItems="center"
        justifyContent="center"
        className={classes.statusBox}
        onClick={setMeasurementStatus}
        sx={{
          background: nonActiveMeasurement.includes(product.measurement) ? 'rgba(84, 84, 84, 0.05)' : 'rgba(89, 50, 243, 0.05)',
          color: nonActiveMeasurement.includes(product.measurement) ? '#A19F9F' : '#5932F3'
        }}
      >
        <Text>{nonActiveMeasurement.includes(product.measurement) ? 'off' : 'on'}</Text>
      </Flex>
    </Flex>
  );
}

function AdvancedInputPreviewBox({
  title, isSwitch, children, onEdit, setPreset
}: AdvancedInputPreviewBoxProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles();

  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const tolerance = advancedInputs?.measurementTolerance;
  console.log(setPreset);

  const handleChange = (unit: string) => {
    dispatch(setAdvancedInputs(
      {
        ...advancedInputs,
        measurementTolerance: {
          ...tolerance,
          unit
        }
      }
    ));

    // if (setPreset) {
    //   console.log(unit, tolerance);
    //   setPreset((previousState: any) => {
    //     console.log({
    //       ...previousState,
    //       advanced_inputs: {
    //         ...previousState.advanced_inputs, measurementTolerance: { ...tolerance, unit }
    //       }
    //     });
    //     return {
    //       ...previousState,
    //       advanced_inputs: {
    //         ...previousState.advanced_inputs, measurementTolerance: { ...tolerance, unit }
    //       }
    //     };
    //   });
    // }
  };

  return (
    <FlexBox
      vertical
      px="30px"
      mb={theme.marginSpacing.s}
      width="100%"
      className={classes.advancedInputBox}
    >
      <FlexBox my={theme.marginSpacing.m} justifyContent="space-between">
        <FlexBox flexDirection={['column', 'row']} width={['70%', '90%']}>
          <Text
            className={classes.predictionTitle}
            color="#000000"
            fontSize="18px"
            mr={isSwitch ? '10%' : 'unset'}
          >
            {title}
          </Text>
          {isSwitch && (
            <Switch
              titles={['inches', 'cm']}
              type={tolerance.unit}
              onChange={(measurmentUnit: string) => handleChange(measurmentUnit)}
            />
          )}
        </FlexBox>
        <Flex width={['30%', '10%']} sx={{ cursor: 'pointer', position: 'relative', left: '0.5%' }} justifyContent="flex-end" onClick={onEdit}>
          <Text mr="10%" className={classes.date} color="#5932F3" fontSize="18px">edit</Text>
          <NavigateNext style={{ color: '#5932F3' }} />
        </Flex>
      </FlexBox>
      <Flex
        mb={theme.marginSpacing.m}
        alignItems="center"
      >
        <Box
          mr="20px"
          height="23px"
          width="23px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: '50%',
            color: '#fff',
            backgroundColor: '#5932F3'
          }}
        >
          <Done style={{ height: '20px', width: '20px' }} />
        </Box>
        {children}
      </Flex>
    </FlexBox>
  );
}

export default function PresetPreview() {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const { id }: any = useParams();
  const location: any = useLocation();
  const { garmentData } = location && location.state;
  const navigate = useNavigate();

  const {
    activeGarmentData,
    advancedInputs
  } = useSelector((state: RootState) => state.activeGarment);
  const { loginUser, currentStore }: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const measurementProduct = activeGarmentData;

  const [preset, setPreset] = useState<any>({});
  const [isOpenSetting, setOpenSetting] = useState<HTMLButtonElement | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [isPreview, setIsPreview] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSetStep = (value: number) => {
    setActiveStep(value);
    setIsPreview(false);
    dispatch(setAdvancedInputs(preset?.advanced_inputs));
  };

  const handleSave = () => {
    ApiUtil.putWithToken(`activeGarments/${preset.id}`, {
      ...preset, advanced_inputs: advancedInputs, user_id: loginUser.id, store: currentStore
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsPreview(true);
  };

  const handleDeletePreset = () => {
    dispatch(pageLoader(true));
    ApiUtil.deleteWithToken(`activeGarments/${preset.id}`)
      .then((res) => {
        dispatch(pageLoader(false));
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        dispatch(pageLoader(false));
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(pageLoader(true));
    const getUserCredentials = localStorage.getItem('userCredentials');
    const userCredentials = getUserCredentials && JSON.parse(getUserCredentials);
    dispatch(setLoginUser(userCredentials.user));
    dispatch(setCurrentStore(userCredentials.store));
    dispatch(setActiveGarmentData(garmentData));
    console.log(loginUser, 'useEffect', userCredentials.user, activeGarmentData);
    ApiUtil.getWithToken(`activeGarments/${atob(id)}`)
      .then((result: any) => {
        setPreset(result.data);
        dispatch(pageLoader(false));
        console.log(result.data);
      })
      .catch((err) => {
        dispatch(pageLoader(false));
        console.log(err);
      });
  }, [isPreview]);

  console.log(preset);

  return (
    <FlexBox vertical px={[theme.marginSpacing.xl, '80px']} width="100vw">
      <Text
        my={theme.marginSpacing.xxxl}
        sx={{ fontFamily: theme.fonts.heading, fontSize: '32px' }}
      >
        Active Garments
      </Text>
      <FlexBox>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          mb={theme.marginSpacing.xl}
          onClick={() => navigate(`/app/active-garments/${btoa(activeGarmentData.id)}`, { state: { isPresetSummary: true } })}
        >
          <ChevronLeft style={{ marginBottom: '5px' }} />
          <Text className={classes.header}>
            List of all garments
          </Text>
        </Flex>
      </FlexBox>
      <Flex
        mb={theme.marginSpacing.m}
        justifyContent="flex-end"
      >
        <Box
          className="settingIconContainer"
          id="header"
          onClick={(event: any) => setOpenSetting(event.currentTarget)}
        >
          <Image src={SettingsIcon} />
        </Box>
      </Flex>
      <FlexBox
        vertical
        px="25px"
        width="100%"
        mb={theme.marginSpacing.xl}
        className={classes.presetBox}
      >
        <Text className={classes.presetName} my={theme.marginSpacing.xl}>
          {preset?.preset_name}
        </Text>
        <FlexBox flexDirection={['column', 'row']}>
          <Flex mb={[theme.marginSpacing.s, 0]}>
            <Text className={classes.label} width={['50%', 'unset']}>Gender:</Text>
            <Box
              ml="20px"
              mr={[0, '42px']}
              className="labelBox"
              width={['50%', '96px']}
              sx={{
                background: '#F4F4F4'
              }}
            >
              <Text color="#4E4E4E">{preset?.gender}</Text>
            </Box>
          </Flex>
          <Flex>
            <Text className={classes.label} width={['50%', 'unset']}>Status:</Text>
            <Box
              ml="20px"
              width={['50%', '96px']}
              className="statusBox"
              sx={{
                color: preset?.status === 'Pending' ? '#FF932F' : preset?.status === 'Live' ? '#5932F3' : '#4E4E4E',
                backgroundColor: preset?.status === 'Pending' ? ' rgba(255, 147, 47, 0.12)'
                  : preset?.status === 'Live' ? 'rgba(89, 50, 243, 0.05)' : '#F4F4F4'
              }}
            >
              <Text>{preset?.status}</Text>
            </Box>
          </Flex>
        </FlexBox>
        <Box
          mt={theme.marginSpacing.xl}
          mb={theme.marginSpacing.m}
          sx={{
            border: '0.5px solid #D5D4D4',
            width: '103%',
            position: 'relative',
            left: '-1.5%'
          }}
        />
        <Text
          className={classes.date}
          mb={theme.marginSpacing.m}
          sx={{
            fontSize: '16px',
            color: '#616161'
          }}
        >
          Created:
          <Text as="span" ml="5px">{preset?.createdAt && format(new Date(preset?.createdAt), 'dd/MM/yy')}</Text>
        </Text>
      </FlexBox>
      <Flex
        width="100%"
        mb="0.5rem"
        className={classes.predictionTitleBox}
      >
        <Text
          ml="3%"
          my={theme.marginSpacing.m}
          className={classes.predictionTitle}
          sx={{
            fontSize: '18px',
            color: '#242424'
          }}
        >
          Measurements Used in Sizing Predictions
        </Text>
      </Flex>
      {measurementProduct?.garment_values?.map((product: any) => (
        <MeasurementRow key={product.measurement} product={product} />
      ))}
      <AdvancedInputAccordian>
        <FlexBox>
          {isPreview ? (
            <FlexBox
              vertical
              alignItems="center"
              width="100%"
              ml="25px"
              mt={theme.marginSpacing.xl}
            >
              <AdvancedInputPreviewBox title="How do you take your measurements?" onEdit={() => handleSetStep(1)}>
                <Text className={classes.label} color="#1E1E1E !important">{preset?.advanced_inputs?.measurementType}</Text>
              </AdvancedInputPreviewBox>
              <AdvancedInputPreviewBox title="What is measurement tolerance?" onEdit={() => handleSetStep(2)} isSwitch setPreset={setPreset}>
                <MeasurementBox height="32px" width="72px" isActive isTolerance value={preset?.advanced_inputs?.measurementTolerance.value} />
              </AdvancedInputPreviewBox>
              <AdvancedInputPreviewBox title="How stretchy is the garment?" onEdit={() => handleSetStep(3)}>
                <Text className={classes.label} color="#1E1E1E !important">
                  {preset?.advanced_inputs?.garmentStrechy.split('-- ')[0]}
                  stretchy
                </Text>
              </AdvancedInputPreviewBox>
              <AdvancedInputPreviewBox title="What is the weight of the fabric?" onEdit={() => handleSetStep(4)}>
                {/* <Box
                  px="10px"
                  sx={{
                    background: 'rgba(89, 50, 243, 0.09)',
                    border: '0.5px solid #5932F3',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '24%',
                    maxWidth: '215px',
                    height: '38px'
                  }}
                >
                  <Text
                  className={classes.date}
                  color="#5932F3" fontSize="14px">{preset?.advanced_inputs?.garmentWeight}</Text>
                </Box> */}
                <MeasurementBox height="32px" isActive value={preset?.advanced_inputs?.garmentWeight} />
              </AdvancedInputPreviewBox>
              <AdvancedInputPreviewBox title="What is the body type it’s most suitable for?" onEdit={() => handleSetStep(5)}>
                <MeasurementBox height="32px" isActive value={preset?.advanced_inputs?.garmentShape} />
              </AdvancedInputPreviewBox>
              <AdvancedInputPreviewBox title="How is this garment meant to be worn?" onEdit={() => handleSetStep(6)}>
                <MeasurementBox height="32px" isActive value={preset?.advanced_inputs?.garmentSize} />
              </AdvancedInputPreviewBox>
            </FlexBox>
          ) : (
            <FlexBox
              px="25px"
              pt="68px"
              width="100%"
            >
              <AdvancedInputs
                isPresetPreview
                step={activeStep}
                preset={preset}
                onBack={() => setIsPreview(true)}
              />
            </FlexBox>
          )}
          <AccordionDetails />
        </FlexBox>
      </AdvancedInputAccordian>
      {(isOpenSetting && (
        <SettingPopover
          isPreset
          product={preset?.preset_name}
          isOpenSetting={isOpenSetting}
          setOpenSetting={setOpenSetting}
          deletePreset={handleDeletePreset}
        />
      ))}
      {!isPreview && (
        <FlexBox justifyContent="flex-end" my="40px" width="97%">
          <Button
            className={classes.button}
            sx={{ cursor: 'pointer' }}
            onClick={() => setOpenDialog(true)}
          >
            Save Changes
          </Button>
        </FlexBox>
      )}
      <Dialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        PaperProps={{
          style: {
            width: '400px',
            textAlign: 'center',
            overflow: 'hidden'
          }
        }}
      >
        <FlexBox vertical alignItems="center" justifyContent="center" px="25px">
          <Flex width="100%" justifyContent="flex-end">
            <IconButton
              onClick={() => setOpenDialog(false)}
              className="closeIcon"
              disableRipple
            >
              <Close />
            </IconButton>
          </Flex>
          <Text width="80%">
            This preset can be Linked to multiple garments.
            If you update this preset. It affects those garments.
          </Text>
          <FlexBox my={theme.marginSpacing.m}>
            <Button
              sx={{
                width: '109px',
                height: '34px',
                background: '#EFEFEF',
                borderRadius: '4px',
                fontFamily: theme.fonts.button,
                cursor: 'pointer',
                fontSize: '12px',
                color: '#4D4D4D'
              }}
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              ml={['14px', '20px']}
              sx={{
                width: '109px',
                height: '34px',
                background: '#5932F3',
                border: '1px solid rgba(88, 88, 88, 0.1)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: theme.fonts.button
              }}
              onClick={() => {
                handleSave();
                setOpenDialog(false);
              }}
            >
              Save
            </Button>
          </FlexBox>
        </FlexBox>
      </Dialog>
    </FlexBox>
  );
}
