import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { Text } from 'rebass';
import FlexBox from '../../../components/utility/FlexBox';
import { Theme } from '../../../theme/px/types';

interface MeasurementBoxProps {
  value: any,
  isActive: boolean,
  height: string,
  width?: string, // eslint-disable-line react/require-default-props
  isTolerance?: boolean, // eslint-disable-line react/require-default-props
  onChange?: (value: any) => void // eslint-disable-line no-unused-vars, react/require-default-props
}

const useStyles = makeStyles(() => ({
  box: {
    cursor: 'pointer',
    borderRadius: '6px'
  },
  boxText: {
    fontFamily: 'AvenirLTPro-Medium',
    fontWeight: 500,
    lineHeight: '150%',
    alignItems: 'center',
    display: 'flex'
  }
}));

export default function MeasurementBox({
  value, isActive, isTolerance, height, width, onChange
}: MeasurementBoxProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <FlexBox
      alignItems="center"
      mb={[theme.marginSpacing.s, 'unset']}
      justifyContent={isTolerance ? '' : 'center'}
      mx="10px"
      px={width ? '' : '15px'}
      height={height}
      width={width}
      className={classes.box}
      sx={{
        border: isActive ? '0.5px solid #5932F3' : '1px solid #DFDFDF',
        backgroundColor: isActive ? 'rgba(89, 50, 243, 0.09)' : ''
      }}
      onClick={() => onChange && onChange(value)}
    >
      {isTolerance && (
        <FlexBox
          vertical
          mr="15px"
          ml="10px"
          pb="15px"
          justifyContent="center"
          alignItems="center"
          sx={{ color: isActive ? '#5932F3' : '#949494' }}
        >
          <Text height="7px">+</Text>
          <Text height="7px">-</Text>
        </FlexBox>
      )}
      <Text
        className={classes.boxText}
        sx={{
          fontSize: isTolerance ? '16px' : '14px',
          color: isActive ? '#5932F3' : '#949494'
        }}
      >
        {value}
      </Text>
    </FlexBox>
  );
}
