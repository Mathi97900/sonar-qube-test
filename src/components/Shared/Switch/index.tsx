import { makeStyles } from '@mui/styles';
import { Box, Flex, Text } from 'rebass';

interface SwitchProps {
  titles: string[],
  type: string,
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
}

interface BodyProps {
  title: string,
  type: string,
  setType: (value: string) => void // eslint-disable-line no-unused-vars, max-len
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
    height: '24px',
    width: '90px',
    lineHeight: '150%',
    alignItems: 'center',
    fontWeight: 900,
    fontFamily: 'AvenirLTPro-Heavy',
    justifyContent: 'center'
  }
}));

function Body({ title, type, setType }: BodyProps) {
  const classes = useStyles();

  return (
    <Text
      className={classes.switchText}
      fontSize={['12px', '14px']}
      sx={{
        zIndex: 1,
        color: title !== type ? '#7D7D7D' : '#fff',
        marginRight: title === 'cm' ? '' : '13px'
      }}
      onClick={() => setType(title)}
    >
      {title}
    </Text>
  );
}

export default function Switch({ titles, type, onChange }: SwitchProps) {
  const classes = useStyles();

  return (
    <Box
      height="35px"
      width={['75%', '210px']}
      className={classes.switch}
    >
      <Box
        width={['30%', '95px']}
        sx={{
          backgroundColor: '#5932F3',
          transform: `translate(${type === titles[0] ? -53 : 53}%)`,
          transition: 'transform 0.5s',
          position: 'absolute',
          height: '24px',
          borderRadius: '20px',
          zIndex: 1
        }}
      />
      <Flex>
        {titles.length > 1 && titles?.map((ele) => (
          <Body
            key={ele}
            title={ele}
            type={type}
            setType={(measurementType: string) => onChange(measurementType)}
          />
        ))}
      </Flex>
    </Box>
  );
}
