import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, CircularProgress, IconButton
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { Input } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Image, Text
} from 'rebass';
import Info from '../../assets/Info.svg';
import Trash from '../../assets/Trash.svg';
import TrashBin from '../../assets/TrashBin.svg';
import {
  setActiveGarmentData,
  setActiveGarmentDataWithS3StructureData
} from '../../store/action/activeGarmentAction';
import {
  showFailureSnackbar,
  showSuccessSnackbar
} from '../../store/action/snackbarAction';
import { RootState } from '../../store/reducer';
import '../../styles/activeGarments.css';
import { Theme } from '../../theme/px/types';
import ApiUtil from '../../util/ApiUtil';
import Dialog from '../Shared/Dialog';
import FlexBox from '../utility/FlexBox';
import GarmentMeasurementCard from './GarmentMeasurementCard';

function AdvancedInput() {
  const theme = useTheme<Theme>();
  function valueLabelFormat(value: any) {
    return `${value}%`;
  }
  const [bodyTypeSelect, setBodyTypeSelect] = useState('');
  const [measurementTolerance, setMeasurementTolerance] = useState(1);

  return (
    <Accordion
      key="accord2"
      style={{
        background: '#FBFBFB',
        boxShadow: 'none',
        borderRadius: '12px'
      }}
    >
      <AccordionSummary
        key="accord2"
        expandIcon={<ExpandMoreIcon style={{ color: '#5932F3' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FlexBox
          // justifyContent="space-between"
          width="100%"
          color="primary"
          sx={{
            fontWeight: '400',
            fontSize: '18px',
            fontFamily: theme.fonts.button
          }}
        >
          <Text className="info-view-header">Advanced inputs</Text>
          {/* <Text color="primary">see measurements</Text> */}
        </FlexBox>
      </AccordionSummary>
      <Box px="77px">
        <FlexBox
          mt={theme.marginSpacing.xxxl}
          sx={{ alignItems: 'flex-start' }}
        >
          <Image
            src={Info}
            sx={{
              marginRight: '12px'
              //   marginTop: '-27px'
            }}
          />

          <Text color="primary" className="info-view-header">
            Please note that the more information you provide for us about a
            garment, the more accurate our sizing recommendation will be.
          </Text>
        </FlexBox>
        <Box
          my={theme.marginSpacing.xxl}
          sx={{
            borderTop: '0.5px solid #D6D6D6',
            borderRadius: '12px'
          }}
        />
        <FlexBox alignItems="center">
          <Text
            fontSize="16px"
            fontFamily={theme.fonts.button}
            fontWeight={400}
          >
            Body type most suitable for:
          </Text>
          {' '}
          <Box
            className={`advanceInputBodyType ${
              bodyTypeSelect === 'Hourglass' ? 'active' : ''
            }`}
            onClick={() => {
              setBodyTypeSelect('Hourglass');
            }}
          >
            <Text>Hourglass</Text>
          </Box>
          <Box
            className={`advanceInputBodyType ${
              bodyTypeSelect === 'Apple' ? 'active' : ''
            }`}
            onClick={() => {
              setBodyTypeSelect('Apple');
            }}
          >
            <Text>Apple</Text>
          </Box>
          <Box
            className={`advanceInputBodyType ${
              bodyTypeSelect === 'Pear' ? 'active' : ''
            }`}
            onClick={() => {
              setBodyTypeSelect('Pear');
            }}
          >
            <Text>Pear</Text>
          </Box>
          <Box
            className={`advanceInputBodyType ${
              bodyTypeSelect === 'Rectangle' ? 'active' : ''
            }`}
            onClick={() => {
              setBodyTypeSelect('Rectangle');
            }}
          >
            <Text>Rectangle</Text>
          </Box>
          <Box
            className={`advanceInputBodyType ${
              bodyTypeSelect === 'Inverted Triangle' ? 'active' : ''
            }`}
            onClick={() => {
              setBodyTypeSelect('Inverted Triangle');
            }}
          >
            <Text>Inverted Triangle</Text>
          </Box>
        </FlexBox>
        <Box
          my={theme.marginSpacing.xxl}
          sx={{
            borderTop: '0.5px solid #D6D6D6',
            borderRadius: '12px'
          }}
        />
        <FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            fontSize="16px"
            fontFamily={theme.fonts.button}
            fontWeight={400}
          >
            Stretch of fabric:
          </Text>
          {' '}
          <Box className="advanceInputSlider" sx={{ width: 472, height: 25 }}>
            <Slider
              aria-label="Always visible"
              defaultValue={5}
              // getAriaValueText={valuetext}
              // step={10}
              // eslint-disable-next-line react/jsx-no-bind
              valueLabelFormat={valueLabelFormat}
              sx={{ color: '#5932F3' }}
              valueLabelDisplay="on"
              max={20}
            />
          </Box>
        </FlexBox>
        <Box
          my={theme.marginSpacing.xxl}
          sx={{
            borderTop: '0.5px solid #D6D6D6',
            borderRadius: '12px'
          }}
        />
        <FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            fontSize="16px"
            fontFamily={theme.fonts.button}
            fontWeight={400}
          >
            Measurement tolerance:
          </Text>
          <FlexBox className="measurementTolerance">
            <Box className="toleranceIcon" fontSize="1rem">
              <AddIcon
                sx={{ fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => {
                  setMeasurementTolerance(measurementTolerance + 1);
                }}
              />
              <RemoveIcon
                sx={{ fontSize: '1rem', marginTop: '-6px', cursor: 'pointer' }}
                onClick={() => {
                  if (measurementTolerance !== 1) {
                    setMeasurementTolerance(measurementTolerance - 1);
                  }
                }}
              />
            </Box>
            <Box className="toleranceValue">{measurementTolerance}</Box>
          </FlexBox>
          {' '}
          <FlexBox fontFamily={theme.fonts.medium}>
            <Text padding="5px">units are in inches</Text>
            {' '}
            <Text
              sx={{
                padding: '5px',
                background: 'rgba(175, 175, 175, 0.14)',
                borderRadius: '4px',
                color: '#949494',
                width: '111px'
              }}
            >
              switch to cm
            </Text>
          </FlexBox>
        </FlexBox>
        {measurementTolerance >= 5 && (
          <FlexBox sx={{ color: '#5932F3', fontSize: '14px', width: '55%' }}>
            <InfoOutlinedIcon fontSize="small" sx={{ paddingRight: '7px' }} />
            <Text>
              Sorry but this exceeds our limit for tolerance. For the most
              accurate sizing recommendations, we advise a tolerance of 1-3.
            </Text>
            {' '}
          </FlexBox>
        )}
        {/* <Box
            my={theme.marginSpacing.xxl}
            sx={{ border: '1px solid #878787' }}
          /> */}
      </Box>
      <AccordionDetails />
      {' '}
    </Accordion>
  );
}
interface garmentListProps {
  productType: string;
  index: number;
  activeGarmentContRef: any;
  measurementProduct: any;
}
export default function GarmentList({
  productType,
  index,
  activeGarmentContRef,
  measurementProduct
}: garmentListProps) {
  const theme = useTheme<Theme>();
  const [loader, setLoader] = useState(false);

  const {
    activeGarmentData,
    activeGarmentDataWithS3StructureData,
    garmentStoreName
  } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const [accordianOpen, setAccordianOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [measuerementCardDetails, setMeasuerementCardDetails] = useState<object>({});
  const handleScroll = () => {
    setCardOpen(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };
  // const handleSizeEdit = (event: any) => {
  //   const val = event.currentTarget.textContent;
  //   if (val.length > 4) {
  //     // event.stopPropagation();
  //     event.preventDefault();
  //   }
  // };

  const [listOfSvgPath, setListOfSvgPath] = useState<any>({});

  const handleMeasurementCard = (e: any, currentVal: any) => {
    const { svgName, discription, heading } = currentVal;
    // setGirth(svgName);
    console.log(activeGarmentContRef);
    let currentGirthPath = listOfSvgPath[svgName];
    const parentLeftPosition = activeGarmentContRef?.current.getBoundingClientRect().left;
    const importFunc = async () => {
      if (svgName && !currentGirthPath) {
        const svg = await import(
          `../../assets/ActiveGarment/female/${svgName}.svg`
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
  // const GarmentMeasurementEdit=(measurement:string, sizeKey:string, productType)=>{

  const GarmentMeasurementEdit = (
    e: any,
    measurement: string,
    sizeKey: string,
    productName: any
  ) => {
    const { value } = e.target;
    const data = { ...activeGarmentData };
    const dataS3 = { ...activeGarmentDataWithS3StructureData };
    const filterVal = data[productName].filter(
      (x: any) => x.measurement === measurement
    );
    if (filterVal.length > 0) {
      filterVal[0][sizeKey] = value;
      dispatch(setActiveGarmentData(data));
      dataS3[productName][sizeKey][measurement] = value;
      dispatch(setActiveGarmentDataWithS3StructureData(dataS3));
    }
  };

  const handleUpdateActiveGarment = () => {
    const dataS3 = {
      storeData: { ...activeGarmentDataWithS3StructureData },
      storeName: garmentStoreName
    };

    if (!dataS3) {
      dispatch(showSuccessSnackbar('Unable to save'));
    } else {
      setLoader(true);

      ApiUtil.postWithToken('analytics/garmentMeasurementUpdate', dataS3)
        .then((res: any) => {
          // setActiveGarmentsConvertion(res.data.data);
          setLoader(false);

          dispatch(showSuccessSnackbar('Measurement updated successfully.'));
          // props.handleClose();
          console.log(res);
        })
        .catch((err) => {
          setLoader(false);

          console.log(err);
          dispatch(
            showFailureSnackbar('Measurement unable to update.')
          );
        });
    }
  };
  return (
    <Box
      onMouseLeave={(e: any) => {
        console.log('box');
        if (e.target.className.includes('MuiPaper-elevation')) {
          setCardOpen(false);
        }
      }}
    >
      {cardOpen && (
        <GarmentMeasurementCard
          measuerementCardDetails={measuerementCardDetails}
        />
      )}
      {openDelete && (
        <Dialog
          onClose={handleClose}
          open={openDelete}
          style={{
            width: '500px',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          <FlexBox vertical alignItems="center">
            <IconButton
              onClick={handleClose}
              style={{ marginLeft: '93%', height: '18px', padding: '10px' }}
              className="closeIcon"
            >
              <CloseIcon />
            </IconButton>
            <Image
              sx={{ width: '27px', height: '27px' }}
              // mt={theme.marginSpacing.m}
              src={TrashBin}
            />

            <Text
              mt={theme.marginSpacing.s}
              sx={{ fontWeight: 800, fontSize: '16px' }}
            >
              Wool Trousers
            </Text>
            <Text mt={theme.marginSpacing.m} width="40%">
              Deleting this item will permanently remove it
            </Text>
            <FlexBox my={theme.marginSpacing.m}>
              <Button
                // ml={['14px', '34px']}
                // mb={[theme.marginSpacing.xl, theme.marginSpacing.m]}
                // mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
                sx={{
                  width: '109px',
                  height: '34px',
                  background: '#EFEFEF',
                  borderRadius: '4px',
                  fontFamily: theme.fonts.button,
                  color: '#4D4D4D'
                }}
              >
                <Text sx={{ fontSize: '12px' }}>Cancel</Text>
              </Button>
              <Button
                ml={['14px', '20px']}
                // mb={[theme.marginSpacing.xl, theme.marginSpacing.m]}
                // mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
                sx={{
                  width: '109px',
                  height: '34px',
                  background: '#5932F3',
                  border: '1px solid rgba(88, 88, 88, 0.1)',
                  borderRadius: '4px',
                  fontFamily: theme.fonts.button
                }}
              >
                <Text sx={{ fontSize: '12px' }}>Delete item</Text>
              </Button>
            </FlexBox>
          </FlexBox>
        </Dialog>
      )}

      <Accordion
        className="accordianRoot"
        // eslint-disable-next-line react/no-array-index-key
        key={`${productType}${index}`}
        style={{
          background: '#FFFFFF',
          boxShadow: '0px 8px 20px rgba(149, 149, 149, 0.14)',
          borderRadius: '12px',
          marginTop: theme.marginSpacing.s
        }}
        expanded={accordianOpen}
      >
        <AccordionSummary
          onClick={() => setAccordianOpen(!accordianOpen)}
          expandIcon={<ExpandMoreIcon style={{ color: '#5932F3' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ marginTop: '0px' }}
        >
          {!accordianOpen ? (
            <FlexBox
              fontWeight={theme.fontWeights.normal}
              fontSize="18px"
              justifyContent="space-between"
              width="100%"
            >
              <Text className="info-view-header">{productType}</Text>
              <Text color="primary">see measurements</Text>
            </FlexBox>
          ) : (
            <FlexBox
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <FlexBox
                fontWeight={theme.fontWeights.normal}
                flexWrap="wrap"
                fontSize="18px"
                marginLeft="1.5%"
              >
                <Text width={1 / 4} sx={{ fontFamily: theme.fonts.button }}>
                  Product:
                </Text>
                <Text width="45%">{productType}</Text>
                <Box
                  sx={{
                    background: 'rgba(89, 50, 243, 0.05)',
                    borderRadius: '4px',
                    width: '72px',
                    height: '28px',
                    fontWeight: 500,
                    color: '#5932F3',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                >
                  <Text p="4px">Live</Text>
                </Box>
                <Text width={1 / 4} sx={{ fontFamily: theme.fonts.button }}>
                  Gender:
                </Text>
                <Text width={3 / 4}>Female</Text>
              </FlexBox>

              <Box
                sx={{
                  background: '#F9F9FB',
                  border: '1px solid rgba(88, 88, 88, 0.1)',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  width: '44px',
                  height: '28px',
                  textAlign: 'center'
                }}
              >
                <Image
                  src={Trash}
                  onClick={(e) => {
                    handleClickOpen();
                    e.stopPropagation();
                  }}
                />
              </Box>
            </FlexBox>
          )}
        </AccordionSummary>
        {' '}
        <AccordionDetails key="accord1">
          <Box className="tableBox">
            <AdvancedInput />
            {/* {AdvancedInput()} */}

            <Box
              mt={theme.marginSpacing.xxl}
              // className="tableBox"
              sx={{
                border: '1px solid #D6D6D6',
                boxSizing: 'border-box',
                borderRadius: '4px',
                marginLeft: '20px',
                marginRight: '10px'
              }}
              onMouseLeave={(e: any) => {
                if (e.relatedTarget.className.includes('tableBox')) {
                  setCardOpen(false);
                }
              }}
            >
              <FlexBox flexWrap="wrap">
                <Box
                  width={1 / 2}
                  display="flex"
                  className="tableHeading"
                  sx={{ borderRight: '1px solid #D6D6D6' }}
                >
                  <Box>
                    {/* <Text color="primary">
                      Measurements used in predictions
                    </Text> */}
                  </Box>
                </Box>
                {' '}
                <Box width={1 / 2} className="tableHeading">
                  <Text>Sizes</Text>
                </Box>
                <Box width={1 / 2} display="flex" className="productCointainer">
                  <Box width="65%">
                    <Text color="primary">Measurements </Text>
                  </Box>
                  <Box width={1 / 2}>
                    <Text color="primary">Applied in Sizing Suggestion</Text>
                  </Box>
                </Box>
                {' '}
                <Box
                  width={1 / 2}
                  display="flex"
                  fontWeight={900}
                  fontSize="12px"
                  className="sizeContainer"
                >
                  {measurementProduct.length > 0
                    && measurementProduct[0].size.map((sizeKey: any) => (
                      <Box>
                        <Text className="sizeEdit">{sizeKey}</Text>
                      </Box>
                    ))}
                  {/* <Box>
                    <Text className="sizeEdit">XS</Text>
                  </Box>
                  <Box>
                    <Text className="sizeEdit">S</Text>
                  </Box>
                  {' '}
                  <Box>
                    <Text className="sizeEdit">M</Text>
                  </Box>
                  <Box>
                    <Text className="sizeEdit">L</Text>
                  </Box>
                  {' '}
                  <Box>
                    <Text className="sizeEdit">XL</Text>
                  </Box> */}
                </Box>
                {measurementProduct.map((x: any) => (
                  <FlexBox className="activeGarmentTr" width="100%">
                    <Box
                      sx={{
                        color: x.available === false ? ' #C5C5C5' : 'black'
                      }}
                      width={1 / 2}
                      display="flex"
                      className="productCointainer"
                    >
                      <Box
                        width="65%"
                        onMouseEnter={(e) => {
                          handleMeasurementCard(e, x);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Text>{x.measurement}</Text>
                      </Box>
                      <Box width={1 / 5} className="sizingSuggestionOn">
                        {/* <Image
                          src={
                            x.available === false ? EyeNotIcon : EyeIcon
                          }
                        /> */}
                        {/* <Box className="sizingSuggestionOn"> */}
                        {x.available === false ? 'off' : 'on'}

                        {/* </Box> */}
                      </Box>
                    </Box>

                    <Box
                      width={1 / 2}
                      display="flex"
                      className="sizeContainer"
                      onMouseEnter={(e: any) => {
                        if (
                          e.currentTarget.className.includes('sizeContainer')
                        ) {
                          setCardOpen(false);
                        }
                      }}
                      sx={{
                        color: x.available === false ? ' #C5C5C5' : 'black'
                      }}
                    >
                      {x.size.map((sizeKey: any) => (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <>
                          <Input
                            className="sizeEdit garmentInput"
                            type="number"
                            value={x[sizeKey]}
                            onChange={(e: any) => GarmentMeasurementEdit(
                              e,
                              x.measurement,
                              sizeKey,
                              productType
                            )}
                          />
                        </>
                      ))}
                      {/* <Box
                        className="editBox"
                        onInput={(e) => {
                          handleSizeEdit(e);
                        }}
                        contentEditable="true"
                      >
                        <Text className="sizeEdit">{x.xs}</Text>
                      </Box>
                      <Box className="editBox">
                        <Text className="sizeEdit">{x.s}</Text>

                      </Box>
                      {' '}
                      <Box className="editBox" contentEditable="true">
                        <Text className="sizeEdit">{x.m}</Text>
                      </Box>
                      <Box className="editBox" contentEditable="true">
                        <Text className="sizeEdit">{x.l}</Text>
                      </Box>
                      {' '}
                      <Box className="editBox" contentEditable="true">
                        <Text className="sizeEdit">{x.xl}</Text>
                      </Box> */}
                    </Box>
                  </FlexBox>
                ))}
              </FlexBox>
            </Box>
            {/* <AdvancedInputs /> */}
            <FlexBox flexDirection="row-reverse" width="99%">
              <Button
                // ml={['14px', '20px']}
                // mb={[theme.marginSpacing.xl, theme.marginSpacing.m]}
                mt={[theme.marginSpacing.s, theme.marginSpacing.m]}
                sx={{
                  width: '99px',
                  height: '39px',
                  background: '#5932F3',
                  border: '1px solid rgba(88, 88, 88, 0.1)',
                  borderRadius: '4px',
                  fontFamily: theme.fonts.button
                }}
                onClick={handleUpdateActiveGarment}
              >
                <Text sx={{ fontSize: '16px' }}>
                  Save
                  {loader && (
                  <CircularProgress
                    style={{ marginLeft: '5px' }}
                    size={20}
                    color="inherit"
                  />
                  )}

                </Text>
              </Button>
            </FlexBox>
          </Box>
        </AccordionDetails>
        {' '}
      </Accordion>
    </Box>
  );
}
