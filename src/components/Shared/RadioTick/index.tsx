import { Done } from '@material-ui/icons';
import { Box } from 'rebass';

interface RadioTickProps {
    isActive: boolean,
}

export default function RadioTick({ isActive }: RadioTickProps) {
  return (
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
        border: isActive ? '' : '1px solid #5932F3',
        backgroundColor: isActive ? '#5932F3' : ''
      }}
    >
      {isActive && <Done style={{ height: '20px', width: '20px' }} />}
    </Box>
  );
}
