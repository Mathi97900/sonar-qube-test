import { useTheme } from 'emotion-theming';
import { Flex, Image, Text } from 'rebass';
import AdvancedInputSuggestionImage from '../../../assets/AdvancedInputSuggestionImage.png';
import FlexBox from '../../../components/utility/FlexBox';
import { Theme } from '../../../theme/px/types';

export default function SuggestionModel() {
  const theme = useTheme<Theme>();

  return (
    <FlexBox
      flexDirection={['column', 'row']}
      mb={theme.marginSpacing.xl}
      mx="3%"
      p="20px"
      width="80%"
      minHeight="160px"
      sx={{
        backgroundColor: '#F9F9FB',
        borderRadius: '6px'
      }}
    >
      <FlexBox width={['100%', '55%']} vertical justifyContent="center" p="20px" flexGrow={1}>
        <Text
          sx={{
            fontFamily: 'AvenirLTPro-Medium',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '150%',
            display: 'flex',
            alignItems: 'center',
            color: '#868686'
          }}
        >
          Why do we need to know this?
        </Text>
        <Text
          mt="10px"
          sx={{
            fontFamily: 'AvenirLTPro-Heavy',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '16px',
            lineHeight: '150%',
            display: 'flex',
            alignItems: 'center',
            color: '#000'
          }}
        >
          Our goal is to provide the most accurate sizing suggestion
        </Text>
      </FlexBox>
      {/* <Card sx={{ width: '45%', margin: '20px' }}>
        <FlexBox width="100%" vertical justifyContent="center" alignItems="center">
          <Flex width="80%" maxWidth="100%" justifyContent="space-around" mt={4}>
            <Text
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'AvenirLTPro-Book',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '15px',
                color: isFit ? '#5932F3' : '#000',
                fontStyle: 'normal'
              }}
              onClick={isFit ? undefined : () => setIsFit((previousState) => !previousState)}
            >
              FIT
            </Text>
            <Text
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'AvenirLTPro-Book',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '15px',
                color: isFit ? '#000' : '#5932F3',
                fontStyle: 'normal'
              }}
              onClick={isFit ? () => setIsFit((previousState) => !previousState) : undefined}
            >
              FABRIC
            </Text>
          </Flex>
          <Flex
            width="80%"
            height="4px"
            justifyContent="space-around"
            mt="14px"
            sx={{ borderRadius: '4px', background: 'rgba(0, 0, 0, 0.14)' }}
          >
            <Box
              as="hr"
              sx={{
                transform: isFit ? 'translate(-50%)' : 'translate(50%)',
                width: '50%',
                height: '4px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #5932F3 0%, #c332F3 100%)',
                transition: 'transform 0.5s'
              }}
            />
          </Flex>
          <Flex
            width="100%"
            justifyContent="center"
            fontSize="12px"
            mt={4}
            mb="24px"
            height="40px"
          >
            <Flex
              sx={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isFit ? 'rgba(89, 50, 243, 0.19)' : 'rgba(41, 134, 107, 0.15)'
              }}
              justifyContent="center"
              alignItems="center"
            >
              <Image src={isFit ? fit : fabric} />
            </Flex>
            <Flex
              sx={{
                color: '#2B2B2B',
                fontFamily: 'AvenirLTPro-Book',
                lineHeight: '18px',
                fontWeight: 400,
                fontSize: '12px',
                width: '70%'
              }}
            >
              {
                isFit ? (
                  <FlexBox flexDirection="column">
                    <Text mt="2px" ml={2} width="100%">Great Fit</Text>
                  </FlexBox>
                ) : (
                  <Text mt="2px" ml={2} width="100%" fontSize="12px">
                    <Text
                      color="rgba(41, 134, 107, 1)"
                      fontWeight={800}
                      as="span"
                      mr={1}
                    >
                      Non-strecth:
                    </Text>
                    Style it with belt for the better result
                  </Text>
                )
              }
            </Flex>
          </Flex>
        </FlexBox>
      </Card> */}
      <Flex width={['100%', '25%']}>
        <Image src={AdvancedInputSuggestionImage} />
      </Flex>
    </FlexBox>
  );
}
