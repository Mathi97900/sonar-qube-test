import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import SideBar from '../SideBar';
import FlexBox from '../utility/FlexBox';

export default function Dashboard() {
  const [sidebarActive, setSidebarActive] = useState(false);
  return (
    <FlexBox id="dashboard">
      <SideBar setSidebarActive={setSidebarActive} sidebarActive={sidebarActive} />
      <FlexBox vertical>
        <Header setSidebarActive={setSidebarActive} sidebarActive={sidebarActive} />
        {/* <Container /> */}

        <FlexBox className="dashboardContainer">
          <Outlet />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
