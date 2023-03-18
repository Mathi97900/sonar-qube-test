import { makeStyles } from '@mui/styles';
import { ChevronLeft } from 'heroicons-react';
import { Flex, Text } from 'rebass';

interface BackButtonProps {
  onClick: () => void
}

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '18px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#000000'
  }
}));

export default function BackButton({ onClick }: BackButtonProps) {
  const classes = useStyles();

  return (
    <Flex onClick={() => onClick()} sx={{ cursor: 'pointer' }}>
      <ChevronLeft />
      <Text className={classes.header}>
        Back
      </Text>
    </Flex>
  );
}
