/* eslint-disable indent */
import { makeStyles } from '@mui/styles';
import { Input } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import { useEffect, useState } from 'react';
import {
  Box, Button, Image, Text
} from 'rebass';
import { Theme } from '../../theme/px/types';
import FlexBox from '../utility/FlexBox';

const useStyles = makeStyles(() => ({
  card: {
    width: '314px',
    // height: '394px',
    background: '#FFFFFF',
    zIndex: 1300,
    position: 'fixed',
    boxShadow: '0px 5px 15px rgba(129, 129, 129, 0.14)',
    borderRadius: '8px'
  }
}));

interface GarmentMeasurementCardProps {
  measuerementCardDetails: any;
  //   name: string;
}
export default function GarmentMeasurementCard({
  measuerementCardDetails
}: GarmentMeasurementCardProps) {
  const theme = useTheme<Theme>();

  const classes = useStyles();
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState(0);

  const [enableFeedback, setEnableFeedback] = useState(false);
  const [cardIsTop, setCardIsTop] = useState(false);
  const cardHeight = 394;
  const [svgPath, setSvgPath] = useState<any>();
  const {
    position, parentLeftPosition, hoverSvgPath, heading, discription
  } = measuerementCardDetails;
  useEffect(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const leftPosition = position?.left - parentLeftPosition - 100;
    setLeft(leftPosition);
    // eslint-disable-next-line no-unsafe-optional-chaining
    const bottomPosition = window?.innerHeight - position?.top;
    setBottom(bottomPosition);
    if (bottomPosition > cardHeight) {
      setCardIsTop(true);
    }
    setSvgPath(hoverSvgPath);
  }, [measuerementCardDetails]);
  //   const image = require('../../assets/ActiveGarment/female/hipGrith.svg');

  //   const { onCompleted, onError } = options;

  console.log(left);

  return (
    // marginTop={measuerementCardDetails?.position.top}
    <Box
      className={classes.card}
      sx={cardIsTop ? {
        top: `${measuerementCardDetails ? measuerementCardDetails?.position.top : 0}px`
      } : {
        bottom: `${bottom || 0}px`
      }}
      marginLeft={left}
      p="22px"
    >
      <Image src={svgPath} />
      {/* <img src="../../assets/ActiveGarment/female/hipGrith.svg" alt="hipGrith" /> */}
      {/* <Icon name="hipGrith" /> */}
      <Text
        sx={{
          fontWeight: 800,
          fontSize: '18px'
        }}
        mt={theme.marginSpacing.m}
      >
        {heading}
      </Text>
      <Text
        mt={theme.marginSpacing.s}
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          color: '#5932F3',
          fontFamily: theme.fonts.medium
        }}
      >
        We take:
      </Text>
      <Text
        my={theme.marginSpacing.s}
        sx={{
          fontWeight: 500,
          fontSize: '12px'
        }}
      >
        {discription}
      </Text>
      <FlexBox
        sx={{
          width: '271px',
          // height: '98px',
          background: '#F5F5F5',
          alignItems: 'center',
          borderRadius: '4px'
        }}
        px="8px"
        vertical
      >
        <FlexBox
          my={theme.marginSpacing.s}
          sx={{
            fontWeight: 500,
            fontSize: '12px'
            //   fontFamily: theme.fonts.medium
          }}
        >
          <Text>Do you take yours differently?</Text>
          <Text
            sx={{
              color: '#5932F3',
              marginLeft: '4px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => { setEnableFeedback(!enableFeedback); }}
          >
            {' '}
            Let us know!
          </Text>
        </FlexBox>
        {enableFeedback
          && (
            <FlexBox
              mb={theme.marginSpacing.s}
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                fontFamily: theme.fonts.medium
              }}
            >
              <Input
                sx={{
                  width: '161px',
                  height: '24px',
                  border: '1px solid #CDCDCD',
                  borderRadius: '4px'
                }}
                type="text"
              />
              <Button
                sx={{
                  marginLeft: '6px',
                  width: '67px',
                  height: '24px',
                  background: '#5932F3',
                  borderRadius: '4px',
                  fontFamily: theme.fonts.button,
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Text>send</Text>
              </Button>
            </FlexBox>
          )}
      </FlexBox>

    </Box>
  );
}
