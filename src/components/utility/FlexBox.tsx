import React from 'react';
import { Flex, FlexProps } from 'rebass';

interface FlexBoxProps extends FlexProps {
  vertical?: boolean;
}

function FlexBox({ vertical, ...props }: FlexBoxProps) {
  return <Flex flexDirection={vertical ? 'column' : 'row'} {...props} />;
}

FlexBox.defaultProps = {
  vertical: false
};
export default FlexBox;
