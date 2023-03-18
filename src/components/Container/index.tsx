import React from 'react';
import '../../styles/sidebar.css';
import Analytics from '../Analytics';
import FlexBox from '../utility/FlexBox';

export default function Container() {
  return (
    <FlexBox className="dashboardContainer">
      <Analytics />
    </FlexBox>
  );
}
