import { Close, Done } from '@material-ui/icons';
import { IconButton, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from 'rebass';
import Switch from '../../../components/Shared/Switch';
import FlexBox from '../../../components/utility/FlexBox';
import { setAdvancedInputs } from '../../../store/action/activeGarmentAction';
import { RootState } from '../../../store/reducer';
import { Theme } from '../../../theme/px/types';
import HeaderComponent from './HeaderComponent';
import MeasurementBox from './MeasurementBox';

interface MeasurementToleranceProps {
  setActiveStep: () => void
}

const useStyles = makeStyles(() => ({
  switch: {
    backgroundColor: '#fff',
    border: '1px solid #E2E2E2',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    cursor: 'pointer',
    alignItems: 'center'
  },
  switchText: {
    borderRadius: '20px',
    display: 'flex',
    fontSize: '14px',
    height: '24px',
    width: '90px',
    lineHeight: '150%',
    alignItems: 'center',
    fontWeight: 900,
    fontFamily: 'AvenirLTPro-Heavy',
    justifyContent: 'center'
  },
  popover: {
    width: '80%',
    minWidth: '300px'
  },
  popoverTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#000000'
  },
  popoverText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    color: '#000000'
  },
  box: {
    width: '72px',
    height: '32px',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  boxText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    alignItems: 'center',
    display: 'flex'
  }
}));

const boxes: number[] = [1, 2, 3, 4];

export default function MeasurementTolerance({
  setActiveStep
}: MeasurementToleranceProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const { advancedInputs } = useSelector((state: RootState) => state.activeGarment);
  const dispatch = useDispatch();

  const tolerance = advancedInputs.measurementTolerance;
  const [isInfo, setIsInfo] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(isInfo);

  const handleChangeUnit = (unit: string) => {
    dispatch(setAdvancedInputs(
      {
        ...advancedInputs,
        measurementTolerance: {
          ...tolerance,
          unit
        }
      }
    ));
  };

  const handleChangeValue = (value: number) => {
    dispatch(setAdvancedInputs(
      {
        ...advancedInputs,
        measurementTolerance: {
          ...tolerance,
          value
        }
      }
    ));
  };

  function handleClick() {
    dispatch(setAdvancedInputs(
      {
        ...advancedInputs,
        measurementTolerance: tolerance
      }
    ));
    setActiveStep();
  }

  return (
    <FlexBox vertical justifyContent="center" alignItems="center">
      <HeaderComponent title="What is measurements tolerance on this garment?" isInfo setInfo={(event) => setIsInfo(event.currentTarget)} />
      <FlexBox vertical mt={theme.marginSpacing.xxl}>
        <Flex justifyContent="center" flexDirection="column">
          <Flex justifyContent="center">
            <Switch titles={['inches', 'cm']} type={tolerance?.unit} onChange={(measurmentUnit: string) => handleChangeUnit(measurmentUnit)} />
          </Flex>
          <FlexBox mt={theme.marginSpacing.xxl} flexWrap="wrap" justifyContent="center">
            {boxes?.map((box) => (
              <MeasurementBox
                key={box}
                height="32px"
                width="72px"
                isTolerance
                value={box}
                isActive={tolerance?.value === box}
                onChange={(measurementValue: number) => handleChangeValue(measurementValue)}
              />
            ))}
          </FlexBox>
        </Flex>
        <FlexBox ml="2%">
          <Flex
            justifyContent="center"
            alignItems="center"
            mb={[theme.marginSpacing.m, '106px']}
            ml={['unset', `${(tolerance.value - 1) * 26}%`]}
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
      <Popover
        id="header"
        open={open}
        anchorEl={isInfo}
        onClose={() => setIsInfo(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: {
            width: '19%',
            marginLeft: '-2%',
            marginTop: '-3%',
            minWidth: '300px'
          }
        }}
      >
        <FlexBox
          vertical
          m={theme.marginSpacing.m}
        >
          <Flex justifyContent="flex-end">
            <IconButton sx={{ cursor: 'pointer' }} onClick={() => setIsInfo(null)} disableRipple>
              <Close />
            </IconButton>
          </Flex>
          <Text
            mb={theme.marginSpacing.m}
            className={classes.popoverTitle}
          >
            Measurement Tolerance
          </Text>
          <Text
            mb={theme.marginSpacing.m}
            className={classes.popoverText}
          >
            In terms of measurement, the difference between the maximum and
            minmum dimensions of permissible errors is called the &quot;tolerance.&quot;
          </Text>
        </FlexBox>
      </Popover>
    </FlexBox>
  );
}
