import { Done } from '@material-ui/icons';
import { makeStyles } from '@mui/styles';
import { Input } from '@rebass/forms';
import { Buffer } from 'buffer';
import { useTheme } from 'emotion-theming';
import { ChevronLeft } from 'heroicons-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation, useNavigate, useParams
} from 'react-router-dom';
import {
  Box, Button, Flex, Image, Text
} from 'rebass';
import CongratulationIcon from '../../assets/CongratulationIcon.png';
import SettingsIcon from '../../assets/SettingsIcon.svg';
import { setActiveGarmentData, setActiveGarmentDataWithS3StructureData, setPresetsList } from '../../store/action/activeGarmentAction';
import { setCurrentStore, setLoginUser } from '../../store/action/authAction';
import { pageLoader } from '../../store/action/snackbarAction';
import { RootState } from '../../store/reducer';
import { Theme } from '../../theme/px/types';
import ApiUtil from '../../util/ApiUtil';
import Preset from '../../view/activeGarments/Preset';
import { SimplePopover } from '../Shared/Popover';
import { SettingPopover } from '../Shared/SettingsPopover';
import FlexBox from '../utility/FlexBox';
import { FileUploadStepAccordian } from './ActiveGarmentsFileUpload';
import GarmentMeasurementCard from './GarmentMeasurementCard';

interface OpenProps {
  isGender: HTMLDivElement | null,
  isStatus: HTMLDivElement | null,
  status: string,
  gender: string
}

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 800,
    fontSize: '24px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  presetDetailBox: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 9px rgba(196, 196, 196, 0.39)',
    borderRadius: '6px',
    borderTop: '4px solid',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(to right, #CCBFFF 0%, #7AE7C7 100%, #ffffff)'
  },
  tableHeader: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '150%',
    color: '#0C0C0C'
  },
  measurementTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '150%',
    textTransform: 'capitalize',
    cursor: 'pointer',
    color: '#000000'
  },
  sizeTitle: {
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: '0 4px 0 0',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'AvenirLTPro-Black',
    fontSize: '16px',
    lineHeight: '150%',
    color: '#000000'
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
  minMaxText: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#000000'
  }
}));

const measurementProductDetails = [ // eslint-disable-line no-unused-vars
  {
    measurement: 'Bust_Girth',
    svgName: 'bustChestGirth',
    discription: 'Maximally horizontal circumference measured under the armpits and at the level of the maximum projection of the bust / chest with normal breathing',
    heading: 'Bust/Chest Girth'
  },
  {
    measurement: 'Chest_Girth',
    svgName: 'bustChestGirth',
    discription: 'Maximally horizontal circumference measured under the armpits and at the level of the maximum projection of the bust / chest with normal breathing',
    heading: 'Bust/Chest Girth'
  },
  {
    measurement: 'Hip_Girth',
    svgName: 'hipGirth',
    discription:
      'Maximum horizontal circumference of the trunk measured at hip height at the fullest part of the buttocks',
    heading: 'Hip Girth'
  },
  {
    measurement: 'Underbust_Girth',
    svgName: 'underbustGirth',
    discription: 'Maximally horizontal circumference measured under the armpits and at the level of the maximum projection of the bust / chest with normal breathing',
    heading: 'Underbust Girth'
  },
  {
    measurement: 'Waist_Girth',
    svgName: 'waistGirth',
    discription: 'Horizontal circumference at natural waistline between the highest part of the hip bones and the lower ribs',
    heading: 'Waist Girth'
  },
  {
    measurement: 'Waist_Height',
    svgName: 'waistHeight',
    discription: 'Vertical distance from waist level to the ground',
    heading: 'Waist Height'
  },
  {
    measurement: 'Outside_Leg_Length',
    svgName: 'outsideLegLength',
    discription: 'Distance from waist level to the ground, following the contour of the hip, then vertically down',
    heading: 'Outside Leg Length'
  },
  {
    measurement: 'Inside_Leg_Length',
    svgName: 'insideLegLength',
    discription: 'Vertical distance between the crotch level (at the midsaggital plane) and the ground, with legs slightly apart; the mass equally distributed on both legs',
    heading: 'Inside Leg Length'
  },
  {
    measurement: 'Neck_Girth',
    svgName: 'neckGirth',
    discription: 'Circumference of the neck column measured close to the prominent larynx cartilage and the 7th cervical vertebra',
    heading: 'Neck Girth'
  },
  {
    measurement: 'Neck_Base_Girth',
    svgName: 'neckBaseGirth',
    discription: 'Circumference around base of the neck column measured from the 7th Cervical Vertebra over the neck shoulder points and the centre front neckpoint back to the nape point',
    heading: 'Neck Base Girth'
  },
  {
    measurement: 'Head_Girth',
    svgName: 'headGirth',
    discription: 'Maximum horizontal girth of the head above the ears',
    heading: 'Head Girth'
  },
  {
    measurement: 'Neck_Base_Diameter',
    svgName: 'neckBaseDiameter',
    discription:
      'Horizontal distance at the neck base between the left and right shoulder neck points',
    heading: 'Neck Base Diameter'
  },
  {
    measurement: 'Shoulder_Length',
    svgName: 'shoulderlength',
    discription: 'Direct distance from the base of the neck (shoulder neck point) to the shoulder point (acromion extremity) with hanging arms',
    heading: 'Shoulder Length'
  },
  {
    measurement: 'Shoulder_Slope',
    svgName: 'shoulderSlope',
    discription: 'Angle of inclination following a straight line joining the shoulder neck point and the acromion to the horizontal',
    heading: 'Shoulder Slope'
  },
  {
    measurement: 'Back_Width',
    svgName: 'backWidth',
    discription: 'Horizontal distance from armpit level to armpit level measured on the back in the middle between acromion extremity and lower armpit level',
    heading: 'Back Width'
  },
  {
    measurement: 'Front_Waist_Length',
    svgName: 'frontWaistLength',
    discription: 'Contoured distance from the neck shoulder point to the nipple and then vertically straight to the front waist line',
    heading: 'Front Waist Length'
  },
  {
    measurement: 'Neck_Shoulder_Point_to_Breast ',
    svgName: 'neckShoulderPointToBreast ',
    discription: 'Disntance from the base of the neck (shoulder neck point) to the breast point',
    heading: 'Neck Shoulder Point to Breast '
  },
  {
    measurement: 'Bust_Width',
    svgName: 'bustWidth',
    discription: 'Horizontal distance between the bust points (nipples)',
    heading: 'Bust Width'
  },
  {
    measurement: 'Chest_Height',
    svgName: 'bustChestHeight',
    discription: 'Vertical distance between the level of the maximum bust/chest projection and the ground',
    heading: 'Bust/Chest Height'
  },
  {
    measurement: 'Bust_Height',
    svgName: 'bustChestHeight',
    discription: 'Vertical distance between the level of the maximum bust/chest projection and the ground',
    heading: 'Bust/Chest Height'
  },
  {
    measurement: 'Waist_To_Hip',
    svgName: 'waistToHip',
    discription: 'Distance along the side of body from the waist level to the hip level following the contour of the body',
    heading: 'Waist to Hip'
  },
  {
    measurement: 'Total_Crotch_Length',
    svgName: 'totalCrotchLength',
    discription: 'Distance from the centre of the waist level at the front of the body, through the crotch, to the centre of the back waist level following the contour of the body',
    heading: 'Total Crotch Length'
  },
  {
    measurement: 'Crotch_Length_Front',
    svgName: 'crotchLengthFront',
    discription: 'Contoured distance from the centre of the waist level at the front of the body to the crotch',
    heading: 'Crotch Length Front'
  },
  {
    measurement: 'Arm_Length',
    svgName: 'armLength',
    discription: 'Distance from the armscye/shoulder line intersection (acromion) to the prominent wrist bone, measured over the elbow, with the arm hanging down',
    heading: 'Arm Length'
  },
  {
    measurement: 'Upper_Arm_Length',
    svgName: 'upperArmLength',
    discription: 'Distance from the armscye/shoulder line intersection (acromion) to the outside elbow joint (olecranon), (with the arm hanging down)',
    heading: 'Upper Arm Length'
  },
  {
    measurement: 'Elbow_Girth',
    svgName: 'elbowGirth',
    discription: 'Circumference of the arm at the elbow with the arms hanging down and slightly tilted elbows',
    heading: 'Elbow Girth'
  },
  {
    measurement: 'Middle_Forearm_Girth',
    svgName: 'middleForearmGirth',
    discription: 'Girth of the forearm in the middle between elbow and wrist, orthogonal to the axis of the forearm',
    heading: 'Middle Forearm Girth'
  },
  {
    measurement: 'Wrist_Girth',
    svgName: 'wristGirth',
    discription: 'Girth of the wrist measured over the wrist bones (carpal bones)',
    heading: 'Wrist Girth'
  },
  {
    measurement: 'Middle_Hip',
    svgName: 'middleHip',
    discription: 'Horizontal circumference of the trunk measured midway between waist level and hip level',
    heading: 'Middle Hip'
  },
  {
    measurement: 'Maximum_Waist_Girth',
    svgName: 'maximumWaistGirth',
    discription: 'Maximum Circumference of the torso between chest and hips in the height of strongest protusion of the belly in the side view',
    heading: 'Maximum Waist Girth'
  },
  {
    measurement: 'Thigh_Girth',
    svgName: 'thighGirth',
    discription: 'Horizontal girth at the highest thigh position',
    heading: 'Thigh Girth'
  },
  {
    measurement: 'Knee_Girth',
    svgName: 'kneeGirth',
    discription: 'Circumference of the knee at the tibia level',
    heading: 'Knee Girth'
  },
  {
    measurement: 'Upper_Knee_Girth',
    svgName: 'upperKneeGirth',
    discription: 'Circumference of the leg just above the kneecap',
    heading: 'Upper Knee Girth'
  },
  {
    measurement: 'Lower_Knee_Girth',
    svgName: 'lowerKneeGirth',
    discription: 'Circumference of the leg just below the kneecap',
    heading: 'Lower Knee Girth'
  },
  {
    measurement: 'Calf_Girth',
    svgName: 'calfGirth',
    discription: 'Maximum girth of the calf measured horizontally at the fullest part of the calf with legs slightly apart',
    heading: 'Calf Girth'
  },
  {
    measurement: 'Minimum_Leg_Girth',
    svgName: 'minimumLegGirth',
    discription: 'Minimum girth of the lower leg measured horizontally just above the ankle',
    heading: 'Minimum Leg Girth'
  },
  {
    measurement: 'Cervical_Height',
    svgName: 'cervicalHeight',
    discription: 'Vertical distance from the 7th Cervical Vertebra following the centre back contour to the hip level then straight to the ground',
    heading: 'Cervical Height'
  },
  {
    measurement: 'Cervical_To_Knee_Hollow',
    svgName: 'cervicalToKneeHollow',
    discription: 'Vertical distance from the 7th Cervical Vertebra following the centre back contour to the hip level then straight to the level of the hollow of the knee',
    heading: 'Cervical to Knee Hollow'
  },
  {
    measurement: 'Knee_Height',
    svgName: 'kneeHeight',
    discription: 'Vertical distance from the middle knee level to the ground',
    heading: 'Knee Height'
  },
  {
    measurement: 'Shine_bone_Height',
    svgName: 'shineBoneHeight',
    discription: 'Vertical distance from the ground to the tibia level',
    heading: 'Shine bone (cnemis) Height'
  }
];

export default function GarmentPreview() {
  const theme = useTheme<Theme>();
  const classes = useStyles();
  const { id }: any = useParams();
  const location: any = useLocation();
  const isUpload = location.pathname.includes('fileupload');
  console.log(location);

  const {
    activeGarmentData,
    activeGarmentDataWithS3StructureData
  } = useSelector((state: RootState) => state.activeGarment);
  const { loginUser, currentStore } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const garmentRef: any = useRef();

  const { gender } = activeGarmentData;
  const garmentValues = activeGarmentData ? activeGarmentData?.garment_values : [];
  const nonActiveMeasurement = garmentValues && garmentValues[0].nonActiveMeasurement;
  const [isOpenSetting, setOpenSetting] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<OpenProps>({
    isGender: null, isStatus: null, status: activeGarmentData.status, gender
  });
  const [isGarmentLive, setIsGarmentLive] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    isUpload: true, isAddPreset: isUpload, isReview: false, step: 2, isError: false
  });
  const [garmentIndex, setGarmentIndex] = useState(0);
  const [status, setStatus] = useState(activeGarmentData.status || 'Live');

  const measurementStatus = (measurement: string) => {
    const changedGarmentValues: any = activeGarmentData.garment_values;

    activeGarmentData.garment_values.forEach((ele: any, i: number) => {
      if (ele.nonActiveMeasurement.includes(measurement)) {
        changedGarmentValues[i].nonActiveMeasurement = ele.nonActiveMeasurement.filter(
          (e: string) => e !== measurement
        );
      } else {
        changedGarmentValues[i].nonActiveMeasurement.push(measurement);
      }
    });
    dispatch(setActiveGarmentData({
      ...activeGarmentData,
      garment_values: changedGarmentValues
    }));
  };

  const GarmentMeasurementEdit = (
    e: any,
    measurement: string,
    sizeKey: string,
    garmentName: string,
    type: string
  ) => {
    const { value } = e.target;
    console.log(garmentName, value, 'value');

    const data = activeGarmentData.garment_values;
    const dataS3 = activeGarmentDataWithS3StructureData;
    const filterVal = data.filter(
      (x: any) => x.measurement === measurement
    );
    if (filterVal.length > 0) {
      if (activeGarmentData?.type === 'isRange') {
        const splitedSizeValue = filterVal[0].sizeValues[sizeKey].split('-');
        if (value) {
          console.log('true');
        } else {
          console.log('false', typeof (value));
        }

        const finalValue = type === 'range' ? `${splitedSizeValue[0] + `-${value}`}` : `${value + (splitedSizeValue[1] ? -splitedSizeValue[1] : '')}`; // eslint-disable-line prefer-template
        filterVal[0].sizeValues[sizeKey] = finalValue;
        console.log((splitedSizeValue[0] + `-${value}`), value + (splitedSizeValue[1] ? -splitedSizeValue[1] : '')); // eslint-disable-line prefer-template
        console.log(finalValue, splitedSizeValue, filterVal, data, type);
        dispatch(setActiveGarmentData({ ...activeGarmentData, garment_values: data }));
        dataS3[sizeKey][measurement] = value;
        dispatch(setActiveGarmentDataWithS3StructureData(dataS3));
      } else {
        filterVal[0].sizeValues[sizeKey] = value;
        console.log(data, filterVal[0].sizeValues[sizeKey]);
        dispatch(setActiveGarmentData({ ...activeGarmentData, garment_values: data }));
        dataS3[sizeKey][measurement] = value;
        dispatch(setActiveGarmentDataWithS3StructureData(dataS3));
      }
    }
  };
  console.log(activeGarmentData);

  const handleBack = () => {
    console.log(location?.state?.garmentData?.length <= 1, isGarmentLive);
    if (isUpload) {
      if ((location?.state?.garmentData?.length <= 1) && isGarmentLive) {
        navigate({ pathname: '/app/active-garments', search: '?status=Live' });
      } else if (location?.state?.garmentData?.length >= 1) {
        navigate({ pathname: '/app/active-garments', search: '?status=Pending' });
        // navigate('/app/active-garments', { state: { garmentData: location.state.garmentData } });
      }
    } else if (location?.state?.isPresetSummary === false) {
      navigate({ pathname: '/app/active-garments', search: '?status=Pending' });
    } else {
      navigate(-1);
    }
  };

  const handleSuccess = (value: boolean) => {
    setIsGarmentLive(value);
    // navigate('/app/activeGarments');
  };

  const setActiveGarmentDataConversion = (data: any) => {
    const size = Object.keys(data.garment_values).filter((e: string) => e !== 'nonActiveMeasurement');
    const measurement = Object.keys(data.garment_values[size[0]]);

    const convertedGarmentValues = measurement.map((measurementKey) => {
      const sizeValues = size.map((sizeKey) => ({
        [sizeKey]: data.garment_values[sizeKey][measurementKey]
        // [sizeKey]: getFractionValue(selectedGarment[0].garment_values[sizeKey][measurementKey])
      }));
      return {
        measurement: measurementKey,
        size,
        sizeValues: sizeValues.reduce((a, b) => Object.assign(a, b), {}),
        nonActiveMeasurement: data.garment_values.nonActiveMeasurement || []
      };
    });
    const s3GarmentValues: any = {};
    size.forEach((sizeKey) => {
      measurement.forEach((measurementKey) => {
        s3GarmentValues[sizeKey] = {
          ...s3GarmentValues[sizeKey],
          [measurementKey]: data.garment_values[sizeKey][measurementKey]
          // ...s3GarmentValues[sizeKey],
          // [measurementKey]:
          //   getFractionValue(selectedGarment[0].garment_values[sizeKey][measurementKey])
        };
      });
    });
    console.log('setActiveGarmentDataConversion');
    dispatch(setActiveGarmentDataWithS3StructureData(s3GarmentValues));
    dispatch(setActiveGarmentData({
      ...data,
      garment_values: convertedGarmentValues
    }));
    setStatus(data.status);
  };

  const handleDeletePreset = () => {
    dispatch(pageLoader(true));
    ApiUtil.putWithToken(
      `garmentData/deletePreset/${activeGarmentData.id}`,
      {
        preset_id: null,
        garment_name: activeGarmentData.garment_name,
        store: currentStore
      }
    )
      .then((res) => {
        dispatch(pageLoader(false));
        setIsDelete(true);
        setUploadStatus({
          ...uploadStatus,
          isAddPreset: false,
          isReview: false
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNextGarment = () => {
    setGarmentIndex((previousIndex) => previousIndex + 1);
    const index = location?.state?.garmentData.findIndex((garment: any) => garment.id === activeGarmentData.id); // eslint-disable-line max-len
    location?.state?.garmentData.splice(index, 1);
    console.log(index, location?.state?.garmentData);
    // dispatch(setActiveGarmentData(location?.state?.garmentData[garmentIndex]));
    navigate(`/app/active-garments/fileupload/${btoa(location?.state?.garmentData[0].id)}`, { state: { garmentData: location?.state?.garmentData } });
  };

  useEffect(() => {
    dispatch(pageLoader(true));
    // ApiUtil.getWithToken(`garmentData/${isUpload ? location.state.garmentData[0].id : atob(id)}`)
    console.log(Buffer.from(id).toString('ascii'), atob(id));
    console.log(location.state, location?.state);
    if (!location?.state?.isPresetSummary) {
      ApiUtil.getWithToken(`garmentData/${atob(id)}`)
        .then((res: any) => {
          setActiveGarmentDataConversion(res.data);
          setUploadStatus((previousState) => ({
            ...previousState, isReview: false, isAddPreset: !!res.data.preset_id
          }));
          dispatch(pageLoader(false));
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          dispatch(pageLoader(false));
        });
    } else {
      location.state.isPresetSummary = false;
    }

    const getUserCredentials = localStorage.getItem('userCredentials');
    const userCredentials = getUserCredentials && JSON.parse(getUserCredentials);
    dispatch(setCurrentStore(userCredentials.store));
    dispatch(setLoginUser(userCredentials.user));
    ApiUtil.postWithToken('activeGarments/getPresetData', { user_id: userCredentials.user.id || loginUser.id })
      .then((result: any) => {
        dispatch(setPresetsList(result.data));
        dispatch(pageLoader(false));
        console.log(result.data);
      })
      .catch((err) => {
        dispatch(pageLoader(false));
        console.log(err);
      });
    setIsDelete(false);
    console.log(activeGarmentData);
  }, [isDelete, garmentIndex, uploadStatus.isReview]);
  // const regex = /^[0-9/ \b]+$/;
  console.log(garmentIndex, location?.state?.garmentData?.length, !!isGarmentLive);
  console.log(location.state ? location.state?.garmentData?.length >= garmentIndex : false);

  const [listOfSvgPath, setListOfSvgPath] = useState<any>({});
  const [measuerementCardDetails, setMeasuerementCardDetails] = useState<object>({});
  const [cardOpen, setCardOpen] = useState(false);
  const activeGarmentContRef = useRef(document.createElement('div'));
  const handleScroll = () => {
    setCardOpen(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(measuerementCardDetails, cardOpen, activeGarmentContRef);
  const handleMeasurementCard = (e: any, currentVal: any) => {
    console.log(measurementProductDetails);
    const measurmentDetail = measurementProductDetails.find((ele: any) => ele.measurement.toLowerCase() === currentVal.measurement.toLowerCase().trim()); // eslint-disable-line max-len
    console.log(measurmentDetail, currentVal);
    const { svgName, discription, heading }: any = measurmentDetail;
    // setGirth(svgName);
    console.log(activeGarmentContRef);
    let currentGirthPath = listOfSvgPath[svgName];
    const parentLeftPosition = activeGarmentContRef?.current.getBoundingClientRect().left;
    console.log(currentVal, parentLeftPosition);
    const importFunc = async () => {
      if (svgName && !currentGirthPath) {
        const svg = await import(
          `../../assets/ActiveGarment/${activeGarmentData?.gender}/${svgName}.svg`
        );
        setListOfSvgPath({ ...listOfSvgPath, [svgName]: svg.default });
        console.log(svg.default);
        currentGirthPath = svg.default;
        setMeasuerementCardDetails({
          position: e.target?.getBoundingClientRect(),
          parentLeftPosition,
          hoverSvgPath: currentGirthPath,
          discription,
          heading
        });
        setCardOpen(true);
      } else if (currentGirthPath) {
        setMeasuerementCardDetails({
          position: e.target?.getBoundingClientRect(),
          parentLeftPosition,
          hoverSvgPath: currentGirthPath,
          discription,
          heading
        });
        setCardOpen(true);
      }
    };
    importFunc();
  };

  console.log(activeGarmentData);
  return (
    <Box
      ref={activeGarmentContRef}
      display="flex"
      flexDirection="column"
      px={[theme.marginSpacing.xl, '80px']}
      width="100vw"
      mb="80px"
    >
      <FlexBox vertical>
        <Text
          my={theme.marginSpacing.xxxl}
          sx={{ fontFamily: theme.fonts.heading, fontSize: '32px' }}
        >
          Active Garments
        </Text>
        <FlexBox sx={{ cursor: 'pointer' }}>
          <Flex
            justifyContent="flex-start"
            alignItems="center"
            mb={theme.marginSpacing.xl}
            onClick={handleBack}
          >
            <ChevronLeft style={{ marginBottom: '5px' }} />
            <Text className={classes.header}>
              List of all garments
            </Text>
          </Flex>
        </FlexBox>
      </FlexBox>
      <FlexBox vertical className={classes.welcomeBox} px="25px" mb={theme.marginSpacing.m}>
        {(isGarmentLive && !(activeGarmentData.status !== 'Live')) || (isUpload && isGarmentLive && !(activeGarmentData.status !== 'Live')) ? (
          <FlexBox vertical justifyContent="center" alignItems="center" my={theme.marginSpacing.m}>
            <Image height="30px" width="30px" src={CongratulationIcon} />
            <Text className={classes.title}>Congratulations, your garment is now live!</Text>
          </FlexBox>
        ) : isUpload ? (
          <FlexBox vertical>
            <FileUploadStepAccordian uploadStatus={uploadStatus} />
          </FlexBox>
        ) : !activeGarmentData?.preset_id && (
          <FlexBox vertical mb={theme.marginSpacing.m}>
            <Flex my={theme.marginSpacing.m} width="100%" justifyContent="flex-start">
              <Text className={classes.fileUploadText}>Steps to complete:</Text>
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
        )}
      </FlexBox>
      <FlexBox
        mb={theme.marginSpacing.m}
        mr="3%"
        width="100%"
        justifyContent="flex-end"
      >
        <Box
          className="settingIconContainer"
          id="header"
          onClick={(event: any) => setOpenSetting(event.currentTarget)}
        >
          <Image src={SettingsIcon} />
        </Box>
      </FlexBox>
      <FlexBox className={classes.presetDetailBox} width="100%" mb={theme.marginSpacing.m}>
        <Flex flexDirection={['column', 'row']} my={theme.marginSpacing.xl} width="100%" px="25px">
          <Flex width={['100%', '40%']} mb={[theme.marginSpacing.s, 0]}>
            <Text className={classes.tableHeader} width={['50%', 'unset']}>Product:</Text>
            <Text
              ml="10px"
              className="garmentName"
              fontSize="20px!important"
              width={['50%', 'unset']}
            >
              {activeGarmentData?.garment_name}
            </Text>
          </Flex>
          <Flex width={['100%', '30%']} mb={[theme.marginSpacing.s, 0]}>
            <Text className={classes.tableHeader} width={['50%', 'unset']}>Gender:</Text>
            <Text
              ml="10px"
              width={['50%', '96px']}
              className="labelBox"
              sx={{
                background: '#F4F4F4',
                cursor: 'pointer'
              }}
              onClick={(event) => setOpen({ ...open, isGender: event.currentTarget })}
            >
              {gender}
            </Text>
          </Flex>
          <Flex width={['100%', '30%']} justifyContent={['unset', 'flex-end']} mb={[theme.marginSpacing.s, 0]}>
            <Text className={classes.tableHeader} width={['50%', 'unset']}>Status:</Text>
            <Text
              ml="10px"
              className="statusBox"
              width={['50%', '96px']}
              sx={{
                color: status === 'Pending' ? '#FF932F' : status === 'Live' ? '#5932F3' : '#4E4E4E',
                backgroundColor: status === 'Pending' ? ' rgba(255, 147, 47, 0.12)'
                  : status === 'Live' ? 'rgba(89, 50, 243, 0.05)' : '#F4F4F4',
                cursor: 'pointer'
              }}
              onClick={(event) => setOpen({ ...open, isStatus: event.currentTarget })}
            >
              {status}
            </Text>
          </Flex>
        </Flex>
      </FlexBox>
      <Box
        display="flex"
      >
        <Box
          width="40%"
          className="tableHeading"
          py={theme.marginSpacing.m}
        >
          Measurements used in predictions
        </Box>
        <Box width="60%" className={classes.sizeTitle} px="2%" py={theme.marginSpacing.m}>
          <Text
            fontWeight={900}
            sx={{ textTransform: 'capitalize' }}
            // eslint-disable-next-line no-unsafe-optional-chaining
            width={garmentValues && `${100 / garmentValues[0]?.size.length}%`}
          >
            Sizes
          </Text>
          {garmentValues && garmentValues[0]?.size.map((sizeKey: string) => (
            // eslint-disable-next-line no-unsafe-optional-chaining
            <Text key={sizeKey} fontWeight={800} sx={{ textTransform: 'uppercase', display: 'flex', justifyContent: 'space-evenly' }} width={`${100 / garmentValues[0]?.size.length}%`}>
              <Text width="80%">{sizeKey}</Text>
            </Text>
          ))}
        </Box>
      </Box>
      <FlexBox
        vertical
        onMouseLeave={(e: any) => {
          console.log('box', e.target.className);
          setCardOpen(false);
        }}
      >
        {cardOpen && (
          <GarmentMeasurementCard
            measuerementCardDetails={measuerementCardDetails}
          />
        )}
        {garmentValues?.map((x: any) => (
          <FlexBox
            key={x.measurement}
            className="measurementBox"
            px="25px"
            py={theme.marginSpacing.s}
            alignItems="center"
          >
            <FlexBox width="40%">
              <Text
                width="30%"
                className={classes.measurementTitle}
                fontFamily="AvenirLTPro-Heavy"
                fontSize="18px"
                color={`${!nonActiveMeasurement?.includes(x.measurement) ? '#000000' : '#AAA9A9'}!important`}
                onMouseEnter={(e) => {
                  handleMeasurementCard(e, x);
                }}
              // onMouseLeave={() => setCardOpen(false)}
              >
                {x.measurement}
              </Text>
              {(activeGarmentData?.type === 'isRange') && (
                <Flex
                  width="20%"
                  alignItems="center"
                  justifyContent="flex-start"
                  onClick={() => measurementStatus(x.measurement)}
                >
                  <Text
                    sx={{
                      background: !nonActiveMeasurement?.includes(x.measurement) ? 'rgba(89, 50, 243, 0.05)' : 'rgba(84, 84, 84, 0.05)',
                      borderRadius: '4px',
                      width: '72px',
                      height: '28px',
                      fontWeight: 500,
                      color: !nonActiveMeasurement?.includes(x.measurement) ? '#5932F3' : '#545454',
                      fontSize: '14px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      display: 'flex'
                    }}
                  >
                    {!nonActiveMeasurement?.includes(x.measurement) ? 'on' : 'off'}
                  </Text>
                </Flex>
              )}
            </FlexBox>
            <FlexBox width="60%" alignItems="center" pl="2%" onClick={() => setCardOpen(false)}>
              <Flex
                // eslint-disable-next-line no-unsafe-optional-chaining
                width={garmentValues && `${100 / garmentValues[0]?.size.length}%`}
                alignItems="center"
                justifyContent="flex-start"
              >
                {!(activeGarmentData?.type === 'isRange') ? (
                  <Text
                    sx={{
                      background: !nonActiveMeasurement?.includes(x.measurement) ? 'rgba(89, 50, 243, 0.05)' : 'rgba(84, 84, 84, 0.05)',
                      borderRadius: '4px',
                      width: '72px',
                      height: '28px',
                      fontWeight: 500,
                      color: !nonActiveMeasurement?.includes(x.measurement) ? '#5932F3' : '#545454',
                      fontSize: '14px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      display: 'flex'
                    }}
                    onClick={() => measurementStatus(x.measurement)}
                  >
                    {!nonActiveMeasurement?.includes(x.measurement) ? 'on' : 'off'}
                  </Text>
                ) : (
                  <FlexBox vertical alignItems="center" justifyContent="center" py={theme.marginSpacing.m}>
                    <Text className={classes.minMaxText} mb={theme.marginSpacing.xl}>Min</Text>
                    <Text className={classes.minMaxText}>Max</Text>
                  </FlexBox>
                )}
              </Flex>
              {/* <FlexBox width="80%">
                {x.size.map((sizeKey: string) => (
                  <Box
                  key={sizeKey}
                  width={`${100 / garmentValues[0].size.length}%`}
                  fontSize="17px"
                  >
                    <Input
                      key={sizeKey}
                      id={sizeKey}
                      name={sizeKey}
                      className="sizeEdit garmentInput"
                      type="text"
                      value={x.sizeValues[sizeKey]}
                      sx={{
                        width: '90%',
                        border: 'none !important'
                      }}
                      onChange={(e: any) => {
                        if (regex.test(e.target.value) || e.target.value === '') {
                          GarmentMeasurementEdit(
                            e,
                            x.measurement,
                            sizeKey,
                            activeGarmentData.garment_name
                          );
                        }
                      }}
                    />
                  </Box>
                ))}
              </FlexBox> */}
              <FlexBox
                vertical
                // eslint-disable-next-line no-unsafe-optional-chaining
                width="100%"
              >
                <FlexBox mb={(activeGarmentData?.type === 'isRange') ? theme.marginSpacing.m : ''} alignItems="center">
                  {x.size.map((sizeKey: string) => (
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    <Box key={sizeKey} width={`${100 / garmentValues[0]?.size.length}%`}>
                      <Input
                        key={sizeKey}
                        className="sizeEdit garmentInput"
                        type="number"
                        value={x.sizeValues[sizeKey].toString().split('-')[0]}
                        // value={Number(x.sizeValues[sizeKey].toString().split('-')[0])}
                        sx={{
                          width: '90%',
                          border: 'none !important',
                          ':hover': {
                            color: '#5932F3'
                          }
                        }}
                        onChange={(e: any) => GarmentMeasurementEdit(
                          e,
                          x.measurement,
                          sizeKey,
                          activeGarmentData.garment_name,
                          'from'
                        )}
                      />
                    </Box>
                  ))}
                </FlexBox>
                {(activeGarmentData?.type === 'isRange') && (
                  <FlexBox>
                    {x.size.map((sizeKey: string) => (
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      <Box key={sizeKey} width={`${100 / garmentValues[0]?.size.length}%`}>
                        <Input
                          key={sizeKey}
                          className="sizeEdit garmentInput"
                          type="number"
                          value={(x.sizeValues[sizeKey].toString().split('-')[1])}
                          // value={Number(x.sizeValues[sizeKey].toString().split('-')[1])}
                          sx={{
                            width: '80%',
                            border: 'none !important',
                            ':hover': {
                              color: '#5932F3'
                            }
                          }}
                          onChange={(e: any) => GarmentMeasurementEdit(
                            e,
                            x.measurement,
                            sizeKey,
                            activeGarmentData.garment_name,
                            'range'
                          )}
                        />
                      </Box>
                    ))}
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        ))}
      </FlexBox>
      <Preset
        status={status}
        isGarmentLive={isGarmentLive}
        isMultiple={location.state ? location.state.garmentData?.length > 1 : false}
        setUploadStatus={setUploadStatus}
        setIsGarmentLive={handleSuccess}
        handleNextGarment={() => handleNextGarment()}
      />
      {(isOpenSetting && (
        <SettingPopover
          isGarmentPage
          product={activeGarmentData?.garment_name}
          isPreset={!!activeGarmentData.preset_id}
          isOpenSetting={isOpenSetting}
          setOpenSetting={setOpenSetting}
          deletePreset={handleDeletePreset}
        />
      ))}
      <SimplePopover
        onClose={() => setOpen({ ...open, isGender: null, gender })}
        isOpen={open.isGender}
        style={{ width: '164px' }}
      >
        <FlexBox vertical justifyContent="center" alignItems="center">
          {gender !== 'Male' && (
            <Text
              mt={theme.marginSpacing.s}
              className="statusBox"
              sx={{
                background: open.gender === 'Male' ? 'rgba(89, 50, 243, 0.09)' : '#F4F4F4',
                borderRadius: '4px',
                color: open.gender === 'Male' ? '#5932F3' : '#4E4E4E',
                border: open.gender === 'Male' ? '1px solid #5932F3' : ''
              }}
              onClick={() => setOpen({ ...open, gender: 'Male' })}
            >
              Male
            </Text>
          )}
          {gender !== 'Female' && (
            <Text
              mt={theme.marginSpacing.s}
              mb={gender === 'Unisex' ? theme.marginSpacing.m : ''}
              className="statusBox"
              sx={{
                background: open.gender === 'Female' ? 'rgba(89, 50, 243, 0.09)' : '#F4F4F4',
                borderRadius: '4px',
                color: open.gender === 'Female' ? '#5932F3' : '#4E4E4E',
                border: open.gender === 'Female' ? '1px solid #5932F3' : ''
              }}
              onClick={() => setOpen({ ...open, gender: 'Female' })}
            >
              Female
            </Text>
          )}
          {gender !== 'Unisex' && (
            <Text
              mt={theme.marginSpacing.s}
              mb={theme.marginSpacing.m}
              className="statusBox"
              sx={{
                background: open.gender === 'Unisex' ? 'rgba(89, 50, 243, 0.09)' : '#F4F4F4',
                borderRadius: '4px',
                color: open.gender === 'Unisex' ? '#5932F3' : '#4E4E4E',
                border: open.gender === 'Unisex' ? '1px solid #5932F3' : ''
              }}
              onClick={() => setOpen({ ...open, gender: 'Unisex' })}
            >
              UniSex
            </Text>
          )}
          <Button
            mb={theme.marginSpacing.s}
            sx={{
              width: '94px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => {
              setOpen({ ...open, isGender: null });
              dispatch(setActiveGarmentData({ ...activeGarmentData, gender: open.gender }));
            }}
          >
            Confirm
          </Button>
        </FlexBox>
      </SimplePopover>
      <SimplePopover
        onClose={() => setOpen({ ...open, isStatus: null, status })}
        isOpen={open.isStatus}
        style={{ width: '164px' }}
      >
        <FlexBox vertical justifyContent="center" alignItems="center">
          {status !== 'Live' && (
            <Text
              className="statusBox"
              mt={theme.marginSpacing.s}
              sx={{
                backgroundColor: 'rgba(89, 50, 243, 0.05)',
                color: '#5932F3',
                border: open.status === 'Live' ? '0.5px solid #5932F3' : ''
              }}
              onClick={() => setOpen({ ...open, status: 'Live' })}
            >
              Live
            </Text>
          )}
          {status !== 'Pending' && (
            <Text
              mt={theme.marginSpacing.s}
              mb={status === 'Archive' ? theme.marginSpacing.m : ''}
              className="statusBox"
              sx={{
                backgroundColor: 'rgba(255, 147, 47, 0.12)',
                color: '#FF932F',
                border: open.status === 'Pending' ? '0.5px solid #FF932F' : ''
              }}
              onClick={() => setOpen({ ...open, status: 'Pending' })}
            >
              Pending
            </Text>
          )}
          {status !== 'Archive' && (
            <Text
              className="statusBox"
              mt={theme.marginSpacing.s}
              mb={theme.marginSpacing.m}
              sx={{
                backgroundColor: '#F4F4F4',
                color: '#4E4E4E',
                border: open.status === 'Archive' ? '0.5px solid #4E4E4E' : ''
              }}
              onClick={() => setOpen({ ...open, status: 'Archive' })}
            >
              Archive
            </Text>

          )}
          <Button
            mb={theme.marginSpacing.s}
            sx={{
              width: '94px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => {
              setOpen({ ...open, isStatus: null });
              setStatus(open.status);
              // dispatch(setActiveGarmentData({ ...activeGarmentData, status: open.status }));
            }}
          >
            Confirm
          </Button>
        </FlexBox>
      </SimplePopover>
    </Box>
  );
}
