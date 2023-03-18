import { InfoOutlined } from '@material-ui/icons';
import { IconButton } from '@mui/material';
import React from 'react';
import { Text } from 'rebass';
import FlexBox from '../../../components/utility/FlexBox';

interface HeaderComponentProps {
  title: string,
  isInfo?: boolean // eslint-disable-line react/require-default-props
  setInfo?: ( // eslint-disable-line react/require-default-props
    event: React.MouseEvent<HTMLButtonElement> // eslint-disable-line no-unused-vars
  ) => void
}

export default function HeaderComponent(
  { title, isInfo = false, setInfo }: HeaderComponentProps
) {
  return (
    <FlexBox alignItems="center" mt="52px">
      <Text
        sx={{
          fontFamily: 'AvenirLTPro-Heavy',
          fontWeight: 900,
          fontSize: '18px',
          lineHeight: '150%',
          textAlign: 'center',
          color: '#000000'
        }}
      >
        {title}
      </Text>
      {isInfo && (
        <IconButton
          aria-describedby="header"
          onClick={
            setInfo ? (event: React.MouseEvent<HTMLButtonElement>) => setInfo(event)
              : undefined
          }
          style={{ color: '#5932F3', marginLeft: '4px', cursor: 'pointer' }}
          disableRipple
        >
          <InfoOutlined />
        </IconButton>
      )}
    </FlexBox>
  );
}
