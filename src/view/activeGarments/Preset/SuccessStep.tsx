import { makeStyles } from '@mui/styles';
import { Box, Image, Text } from 'rebass';
import CongratulationIcon from '../../../assets/CongratulationIcon.png';
import HangerIcon from '../../../assets/HangerIcon.svg';
import FlexBox from '../../../components/utility/FlexBox';

interface SuccessStepProps {
  presetTitle: string,
  // onBackToList: () => void
}

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '24px',
    lineHeight: '150%',
    color: '#000000'
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
    borderRadius: '6px'
  }
}));

export default function SuccessStep({ presetTitle }: SuccessStepProps) {
  const classes = useStyles();

  return (
    <FlexBox vertical justifyContent="center" alignItems="center">
      <FlexBox vertical justifyContent="center" alignItems="center" mt="69px">
        <Image height="30px" width="30px" src={CongratulationIcon} />
        <Text className={classes.title}>Congratulations your preset is created!</Text>
      </FlexBox>
      <FlexBox
        mt="69px"
        mb="57px"
        px="20px"
        py="15px"
        justifyContent="space-around"
        alignItems="center"
        className={classes.previewBox}
        // onClick={() => onBackToList()}
      >
        <Box
          className={classes.iconBackground}
          mr="20px"
        >
          <Image mb="4px" width="18px" height="15px" color="#5932F3" src={HangerIcon} />
        </Box>
        <Text className={classes.presetName}>{presetTitle}</Text>
      </FlexBox>
    </FlexBox>
  );
}
