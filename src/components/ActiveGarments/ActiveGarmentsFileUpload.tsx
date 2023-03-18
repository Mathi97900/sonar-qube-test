import { Done, ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { ChevronLeft } from 'heroicons-react';
import { useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Button, Flex, Image, Text
} from 'rebass';
import dropFileCloud from '../../assets/dropFileCloud.svg';
import Welcome from '../../assets/Welcome.svg';
import { setActiveGarmentData, setActiveGarmentDataWithS3StructureData, setGarmentStoreName } from '../../store/action/activeGarmentAction';
import { setCurrentStore, setLoginUser } from '../../store/action/authAction';
import { pageLoader, showFailureSnackbar, showSuccessSnackbar } from '../../store/action/snackbarAction';
import { RootState } from '../../store/reducer';
import { Theme } from '../../theme/px/types';
import ApiUtil from '../../util/ApiUtil';
import FlexBox from '../utility/FlexBox';

// const Fraction = require('fractions');

export interface ActiveGarmentsFileUploadProps {
  isUpload: boolean,
  setGarment: (value: boolean) => void // eslint-disable-line no-unused-vars
}

export interface uploadStatusType {
  isUpload: boolean,
  isAddPreset: boolean,
  isReview: boolean,
  isError: boolean,
  step: number
}

interface PresetDetailBoxProps {
  title: string,
  addPreset: (value: string) => void // eslint-disable-line no-unused-vars
}

interface FileUploadStepAccordianProps {
  uploadStatus: uploadStatusType
}

interface TypeDetectionProps {
  isType: string,
  setConfirm: (value: string, isUpdate: boolean) => void // eslint-disable-line no-unused-vars
}

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 800,
    fontSize: '24px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  welcomeBox: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 9px rgba(54, 54, 54, 0.09)',
    borderRadius: '8px'
  },
  title: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '24px',
    lineHeight: '150%',
    color: '#000000'
  },
  fileuploadTitle: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#1F1F1F'
  },
  scrollBar: {
    backgroundColor: '#E3E3E3',
    justifyContent: 'flex-start',
    width: '38%',
    height: '8px',
    borderRadius: '4px'
  },
  slider: {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: '#5932F3',
    transition: 'width 0.5s'
  },
  fileuploadSteps: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#1F1F1F'
  },
  fileUploadText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#000000'
  },
  fileUpload: {
    width: '95%',
    background: 'linear-gradient(346.5deg, rgba(196, 196, 196, 0.13) -21.23%, rgba(231, 228, 228, 0) 98.94%)',
    border: '1px dashed rgba(0, 0, 0, 0.3)',
    borderRadius: '8px'
  },
  presetBox: {
    background: '#FFFFFF',
    boxShadow: '0px 8px 20px rgba(149, 149, 149, 0.14)',
    borderRadius: '12px'
  },
  button: {
    width: '141px',
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
    cursor: 'pointer',
    color: '#FFFFFF'
  },
  error: {
    width: '100%',
    // height: '90px',
    background: 'rgba(89, 50, 243, 0.06)',
    borderRadius: '6px',
    fontFamily: 'AvenirLTPro-Medium',
    fontHeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5932F3'
  },
  fileUploadContainer: {
    width: '100%',
    background: 'rgba(89, 50, 243, 0.09)',
    borderRadius: '6px 6px 0 0'
  },
  fileUploadHeader: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#5932F3'
  },
  processText: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    color: '#5932F3'
  },
  typeTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  typeBodyText: {
    fontamily: 'AvenirLTPro-Medium',
    fonteight: 500,
    fontize: '14px',
    lineeight: '150%',
    color: '#8D8D8D'
  }
}));

export function FileUploadStepAccordian({ uploadStatus }: FileUploadStepAccordianProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles();

  const [isShow, setIsShow] = useState<Boolean>(true);

  return (
    <FlexBox vertical>
      <Flex height="88px" my={theme.marginSpacing.xs} width="100%" alignItems="center" justifyContent="flex-start" onClick={() => setIsShow((previousState) => !previousState)} sx={{ cursor: 'pointer' }}>
        <Box flexGrow={1}>
          <Image height="30px" src={Welcome} />
        </Box>
        {isShow ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        )}
      </Flex>
      {isShow && (
        <FlexBox vertical>
          <Text
            mb={theme.marginSpacing.xl}
            className={classes.fileuploadTitle}
          >
            Here&apos;s your onboarding checklist!
          </Text>
          <Flex mb={theme.marginSpacing.xl} alignItems="center">
            <Text mr="15px" className={classes.fileuploadTitle} sx={{ fontSize: '14px !important' }}>
              {uploadStatus.step === 0 ? 0 : uploadStatus.step === 1 ? 30
                : uploadStatus.step === 2 ? 80 : 100}
              %
            </Text>
            <Flex className={classes.scrollBar}>
              <Box
                className={classes.slider}
                as="hr"
                sx={{
                  width: `${uploadStatus.step * 33.3}%`
                }}
              />
            </Flex>
          </Flex>
          <Flex mb={theme.marginSpacing.m}>
            <Box width="25px" height="25px">
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
                  backgroundColor: uploadStatus.isUpload ? '#5932F3' : '',
                  border: uploadStatus.isUpload ? '' : '1px solid #5932F3'
                }}
              >
                {uploadStatus.isUpload && <Done style={{ height: '20px', width: '20px' }} />}
              </Box>
            </Box>
            <Text
              className={classes.fileuploadSteps}
              ml={theme.marginSpacing.s}
            >
              Upload garment measurements
            </Text>
          </Flex>
          <FlexBox vertical>
            <Flex mb={theme.marginSpacing.m}>
              <Box width="25px" height="25px">
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
                    backgroundColor: uploadStatus.isAddPreset ? '#5932F3' : '',
                    border: uploadStatus.isAddPreset ? '' : '1px solid #5932F3'
                  }}
                >
                  {uploadStatus.isAddPreset && <Done style={{ height: '20px', width: '20px' }} />}
                </Box>
              </Box>
              <Text
                className={classes.fileuploadSteps}
                ml={theme.marginSpacing.s}
              >
                Add advanced details
              </Text>
            </Flex>
            <Flex mb={theme.marginSpacing.m}>
              <Box width="25px" height="25px">
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
                    backgroundColor: uploadStatus.isReview ? '#5932F3' : '',
                    border: uploadStatus.isReview ? '' : '1px solid #5932F3'
                  }}
                >
                  {uploadStatus.isReview && <Done style={{ height: '20px', width: '20px' }} />}
                </Box>
              </Box>
              <Text
                className={classes.fileuploadSteps}
                ml={theme.marginSpacing.s}
              >
                Review garment & go live
              </Text>
            </Flex>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
}

export function PresetDetailBox({ title, addPreset }: PresetDetailBoxProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <FlexBox className={classes.presetBox} px="25px" alignItems="center" mb={theme.marginSpacing.s}>
      <Flex flexDirection={['column', 'row']} my={theme.marginSpacing.m} width="100%" alignItems="center">
        <Text width={['unset', '20%']} mb={[theme.marginSpacing.s, 'unset']}>{title}</Text>
        <Flex width={['unset', '20%']} mb={[theme.marginSpacing.s, 'unset']} flexGrow={1}>
          <Box
            mr="20px"
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
          <Text>Uploaded</Text>
        </Flex>
        <Button className={classes.button} onClick={() => addPreset(title)}>
          Customise
        </Button>
      </Flex>
    </FlexBox>
  );
}

export function TypeDetection({ isType, setConfirm }: TypeDetectionProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const [type, setType] = useState(isType);
  const [isChange, setIsChange] = useState(false);

  return (
    <FlexBox vertical width="95%" px={['15px', 'unset']}>
      <Text
        className={classes.typeTitle}
        mb={theme.marginSpacing.xl}
      >
        Your garment measurements are:
      </Text>
      {(!type || type === 'isRange' || (type && isChange)) && (
        <FlexBox
          flexDirection={['column', 'row']}
          sx={{
            border: type === 'isRange' ? '1px solid #5932F3' : '1px solid #DFDFDF',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          px="25px"
          mb={isChange ? theme.marginSpacing.s : ''}
          onClick={() => setType('isRange')}
        >
          <Flex flexDirection="column" width={['100%', '55%']}>
            <Text className={classes.typeTitle} my={theme.marginSpacing.s}>A range</Text>
            <Text
              mb={theme.marginSpacing.s}
              className={classes.typeBodyText}
            >
              Where you include stretch in your measurements
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            width={['100%', '45%']}
            // height="73px"
            px="15px"
            py={theme.marginSpacing.s}
            my={theme.marginSpacing.s}
            sx={{ background: '#F9F9FB', borderRadius: '6px' }}
          >
            <Text>For example 30-40 inches</Text>
            <Text
              className={classes.typeBodyText}
            >
              Where 30 is minimum stretch and 40 is maximum stretch
            </Text>
          </Flex>
        </FlexBox>
      )}
      {(!type || type === 'isSingle' || (type && isChange)) && (
        <FlexBox
          flexDirection={['column', 'row']}
          sx={{
            border: type === 'isSingle' ? '1px solid #5932F3' : '1px solid #DFDFDF',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          px="25px"
          mb={isChange ? theme.marginSpacing.s : ''}
          onClick={() => setType('isSingle')}
        >
          <Flex flexDirection="column" width={['100%', '55%']}>
            <Text className={classes.typeTitle} my={theme.marginSpacing.s}>A fixed value</Text>
            <Text
              mb={theme.marginSpacing.s}
              className={classes.typeBodyText}
            >
              Where stretch can be customised
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            width={['100%', '45%']}
            // height="73px"
            px="15px"
            py={theme.marginSpacing.s}
            my={theme.marginSpacing.s}
            sx={{ background: '#F9F9FB', borderRadius: '6px' }}
          >
            <Text>For example 30 inches</Text>
            <Text className={classes.typeBodyText}>Where stretch can be customised</Text>
          </Flex>
        </FlexBox>
      )}
      {(!type || type === 'isMixOfBoth' || (type && isChange)) && (
        <FlexBox
          flexDirection={['column', 'row']}
          sx={{
            border: type === 'isMixOfBoth' ? '1px solid #5932F3' : '1px solid #DFDFDF',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          px="25px"
          mb={isChange ? theme.marginSpacing.s : ''}
          onClick={() => setType('isMixOfBoth')}
        >
          <Flex flexDirection="column" width={['100%', '55%']}>
            <Text className={classes.typeTitle} my={theme.marginSpacing.s}>A mix of both</Text>
            <Text
              mb={theme.marginSpacing.s}
              className={classes.typeBodyText}
            >
              Where it varies from garment to garment
            </Text>
          </Flex>
          <Flex
            alignItems="center"
            width={['100%', '45%']}
            // height="73px"
            px="15px"
            py={theme.marginSpacing.m}
            my={theme.marginSpacing.s}
            sx={{
              background: '#F9F9FB',
              borderRadius: '6px'
            }}
          >
            <Text>Where a garment has fixed value, the other a range</Text>
          </Flex>
        </FlexBox>
      )}
      <FlexBox width="100%" justifyContent="flex-end" my={theme.marginSpacing.m}>
        {type && !isChange && (
          <Button
            mr="15px"
            sx={{
              width: '141px',
              height: '38px',
              background: '#F4F4F4',
              border: '1px solid #F4F4F4',
              borderRadius: '4px',
              fontFamily: 'AvenirLTPro-Heavy',
              fontWeight: 900,
              fontSize: '14px',
              lineHeight: '150%',
              color: '#4E4E4E',
              cursor: 'pointer'
            }}
            onClick={() => {
              setType('');
              setIsChange(true);
            }}
          >
            Change
          </Button>
        )}
        <Button
          sx={{
            background: '#5932F3',
            borderRadius: '4px',
            width: '141px',
            height: '38px',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            opacity: type === '' ? '50%' : ''
          }}
          disabled={!type}
          onClick={() => setConfirm(type, isType === type)}
        >
          Confirm
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

// export function ActiveGarmentsFileUpload({
// isUpload, setGarment }: ActiveGarmentsFileUploadProps) {
export function ActiveGarmentsFileUpload() {
  const theme = useTheme<Theme>();
  const classes = useStyles();
  const location: any = useLocation();

  const { loginUser, currentStore } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(document.createElement('input'));
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<uploadStatusType>({
    isUpload: false, isAddPreset: false, isReview: false, isError: false, step: 0
  });
  const [garmentData, setGarmentData] = useState<any>([]);
  const fileTypes = ['XLS', 'XLSX', 'CSV'];
  const [percentage, setPercentage] = useState(0);
  const [isCustomize, setIsCustomize] = useState(false);
  const [gramentType, setGarmentType] = useState<string>('');

  const toBase64 = ({ file, description, type }: {
    file: any;
    description: any;
    type: any;
  }) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      return resolve({
        base64: (reader.result as string).split(',')[1],
        name: file.name,
        type,
        description
      });
    };
    reader.onerror = (error) => reject(error);
  });

  const handleUpload = async (uploadFiles: any) => {
    // setIsLoading(true);
    setUploadStatus({
      ...uploadStatus,
      isError: false
    });
    const targetFiles = [uploadFiles];
    const files: any[] = [];
    for (let i = 0; i < targetFiles.length; i += 1) {
      const type = targetFiles[i].name.split('.')[
        targetFiles[i].name.split('.').length - 1
      ];
      if (type) {
        files.push({
          file: targetFiles[i],
          type
        });
      }
    }

    if (files.length === 0) {
      // setIsLoading(false);
    } else {
      const filePathsPromises: any[] = [];

      files.forEach((fileObj: any) => {
        filePathsPromises.push(toBase64(fileObj));
      });

      const filePaths = await Promise.all(filePathsPromises);
      const mappedFiles = filePaths.map((data) => ({ ...data }));
      const getUserCredentials = localStorage.getItem('userCredentials');
      const userCredentials = getUserCredentials && JSON.parse(getUserCredentials);

      const data = {
        document: mappedFiles,
        gender: 'Female',
        status: 'Pending',
        user_id: userCredentials.user.id || loginUser.id,
        store: userCredentials.store || currentStore
        // units: isUnitInCm ? 'cm' : 'inches'
      };
      const option = {
        onUploadProgress: (progressEvent: any) => {
          console.log(progressEvent);
          const { loaded, total } = progressEvent;
          const percent = (loaded / total) * 100;
          // const percent = Math.floor((loaded * 100) / total);
          setPercentage(percent);
          console.log(`${loaded} loaded ${total} total ${percent}%`);
        }
      };
      ApiUtil.postWithToken(
        'analytics/garmentFileUpload',
        data,
        option
      ).then((res: any) => {
        dispatch(setGarmentStoreName(res.data.storeName));
        console.log(res.data.data);

        // Finding file type
        const previousType = res.data.data[0].type;
        res.data.data.forEach((garment: any) => {
          if (previousType !== garment.type && previousType) {
            setGarmentType('isMixOfBoth');
          } else {
            setGarmentType(previousType);
          }
        });

        setGarmentData(res.data.data);
        setPercentage(0);
        dispatch(
          showSuccessSnackbar(
            'Measurement uploaded successfully.'
          )
        );
        // setIsLoading(false);
        setUploadStatus({
          ...uploadStatus,
          isUpload: true,
          isError: false,
          step: 1
        });
      }).catch((err: any) => {
        console.log(err);
        setPercentage(0);
        setUploadStatus({
          ...uploadStatus,
          isError: true
        });
        dispatch(
          showFailureSnackbar(
            'Something went wrong!'
          )
        );
        // setIsLoading(false);
      });
    }
  };

  // const getFractionValue = (garmentValue: any) => {
  //   if (garmentValue.toString().includes('/')) {
  //     return garmentValue;
  //   }
  //   const fractionValue: any = parseFloat(garmentValue).toFixed(2);
  //   const fractions = new Fraction((fractionValue % 1).toFixed(2)).toString();
  //   return `${parseInt(garmentValue, 10)} ${fractions === '0' ? '' : fractions}`;
  // };

  const handleSelectPreset = (value: string) => {
    setUploadStatus({
      ...uploadStatus,
      isAddPreset: true,
      step: 2
    });

    const garment = garmentData.filter((product: any) => product.garment_name === value);
    const size = Object.keys(garment[0].garment_values).filter((e: string) => e !== 'nonActiveMeasurement');
    const measurement = Object.keys(garment[0].garment_values[size[0]]);

    const garmentValues = measurement.map((measurementKey) => {
      const sizeValues = size.map((sizeKey) => ({
        // [sizeKey]: getFractionValue(garment[0].garment_values[sizeKey][measurementKey])
        [sizeKey]: garment[0].garment_values[sizeKey][measurementKey]
      }));
      return {
        measurement: measurementKey,
        size,
        sizeValues: sizeValues.reduce((a, b) => Object.assign(a, b), {}),
        nonActiveMeasurement: garment[0].garment_values.nonActiveMeasurement || []
      };
    });

    dispatch(setActiveGarmentDataWithS3StructureData(garment[0].garment_values));
    dispatch(setActiveGarmentData({
      ...garment[0],
      garment_values: garmentValues
    }));
    console.log(encodeURIComponent(garment[0].id.toString()));
    navigate(`${btoa(garment[0].id)}`, { state: { garmentData } });
  };

  const handleConfirm = (value: string, isUpdate: boolean) => {
    if (value !== 'isMixOfBoth' && !isUpdate) {
      dispatch(pageLoader(true));
      ApiUtil.putWithToken(
        `garmentData/${garmentData[0].id}`,
        {
          user_id: loginUser.id,
          store: currentStore,
          garmentData,
          isType: value
        }
      )
        .then((res) => {
          console.log(res);
          setIsCustomize(true);
          dispatch(pageLoader(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(pageLoader(false));
        });
    } else {
      setIsCustomize(true);
    }
  };

  useEffect(() => {
    const getUserCredentials = localStorage.getItem('userCredentials');
    const userCredentials = getUserCredentials && JSON.parse(getUserCredentials);
    dispatch(setCurrentStore(userCredentials.store));
    dispatch(setLoginUser(userCredentials.user));
    if (location.state) {
      setUploadStatus({
        ...uploadStatus,
        isUpload: true,
        step: 1
      });
      if (location.state.garmentData) {
        setGarmentData(location.state.garmentData);
        setIsCustomize(true);
      }
    }
  }, []);

  return (
    <FlexBox vertical px={[theme.marginSpacing.xl, '80px']} width="100vw" pb="80px">
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
          onClick={() => navigate(-1)}
        // onClick={() => navigate('/app/active-garments')}
        >
          <ChevronLeft style={{ marginBottom: '5px' }} />
          <Text className={classes.header}>
            List of all garments
          </Text>
        </Flex>
      </FlexBox>
      <FlexBox vertical className={classes.welcomeBox} px="25px" mb={theme.marginSpacing.m}>
        <FileUploadStepAccordian uploadStatus={uploadStatus} />
      </FlexBox>
      {/* {!uploadStatus.isUpload && ( */}
      {!isCustomize && (
        <FlexBox vertical mb={theme.marginSpacing.xl} alignItems="center" sx={{ background: '#FFFFFF', boxShadow: '0px 0px 14px rgba(72, 72, 72, 0.14)', borderRadius: '6px' }}>
          <FlexBox flexDirection={['column', 'row']} px={['15px', '25px']} mb={theme.marginSpacing.xl} className={classes.fileUploadContainer} alignItems="center">
            <Text my={theme.marginSpacing.m} className={classes.fileUploadHeader}>File upload</Text>
            {uploadStatus.isUpload && (
              <Flex width={['unset', '91%']} alignItems="center" justifyContent="flex-end" mb={[theme.marginSpacing.s, 0]}>
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
                    backgroundColor: uploadStatus.isUpload ? '#5932F3' : '',
                    border: uploadStatus.isUpload ? '' : '1px solid #5932F3'
                  }}
                >
                  {uploadStatus.isUpload && <Done style={{ height: '20px', width: '20px' }} />}
                </Box>
                <Text className={classes.fileuploadSteps}>Upload complete</Text>
              </Flex>
            )}
          </FlexBox>
          {uploadStatus.isUpload ? (
            <TypeDetection isType={gramentType} setConfirm={handleConfirm} />
          ) : (
            <FlexBox vertical className={classes.fileUpload} px="25px" pt="15px" mb="33px">
              <Text>Csv, Excel files allowed</Text>
              {percentage > 0 ? (
                <FlexBox vertical alignItems="center" my={theme.marginSpacing.xxxl}>
                  <Text className={classes.processText} mb={theme.marginSpacing.s}>Processing</Text>
                  <Box width="38%" height="8px" sx={{ background: '#DEDEDE', borderRadius: '8px' }}>
                    <Box
                      width={`${percentage}%`}
                      height="8px"
                      sx={{
                        transition: 'width 0.5s',
                        // position: 'absolute',
                        // zIndex: 1,
                        backgroundColor: '#5932F3',
                        borderRadius: '8px'
                      }}
                    />
                  </Box>
                </FlexBox>
              ) : (
                <FileUploader width="50%" style={{ marginBottom: '10px' }} handleChange={(e: any) => handleUpload(e)} name="file" onTypeError={() => setUploadStatus({ ...uploadStatus, isError: true })} types={fileTypes}>
                  <FlexBox
                    mt={theme.marginSpacing.xl}
                    mb={theme.marginSpacing.s}
                    vertical
                    alignItems="center"
                    justifyContent="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <Box><Image src={dropFileCloud} /></Box>
                    <Text
                      mb={theme.marginSpacing.xl}
                      sx={{
                        fontSize: '14px',
                        color: '#5932F3'
                      }}
                    >
                      Drag and drop your file here
                    </Text>
                  </FlexBox>
                </FileUploader>
              )}
            </FlexBox>
          )}
        </FlexBox>
      )}
      {/* )} */}
      {/* {(!(uploadStatus.isUpload && !uploadStatus.isAddPreset)
        || garmentData.length > 0) && ( */}
      {isCustomize && garmentData.length > 0 && (
        <FlexBox vertical>
          {garmentData
            && garmentData.map((garment: any) => (
              <PresetDetailBox
                key={garment.garment_name}
                title={garment.garment_name}
                addPreset={handleSelectPreset}
              />
            ))}
        </FlexBox>
      )}
      {uploadStatus.isError && (
        <FlexBox className={classes.error} alignItems="center" mb={theme.marginSpacing.xxl} py={theme.marginSpacing.s}>
          <Text as="span" width="80%" textAlign="center">
            Oops, this file is not supported! If you’re having trouble uploading,
            send all of your files to
            <Text as="span" px="5px" sx={{ textDecoration: 'underline' }}>support@getswan.co</Text>
            We will assist you in uploading the files.
          </Text>
        </FlexBox>
      )}
    </FlexBox>
  );
}
