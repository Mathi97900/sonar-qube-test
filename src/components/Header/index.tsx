import { useTheme } from 'emotion-theming';
import { Menu } from 'heroicons-react';
import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { Image } from 'rebass';
import FaviconLogoWithName from '../../assets/FaviconLogoWithName.svg';
import '../../styles/sidebar.css';
import { Theme } from '../../theme/px/types';
import FlexBox from '../utility/FlexBox';

// props:{  collapsed:boolean, toggled:boolean, handleToggleSidebar:()=>void }
interface headerProps {
    setSidebarActive: any;
    sidebarActive: boolean;
  }
export default function Header({ setSidebarActive, sidebarActive }:headerProps) {
  const theme = useTheme<Theme>();

  return (
    <FlexBox
      mt={theme.marginSpacing.m}
      px={theme.marginSpacing.xl}
      sx={{

        justifyContent: 'space-between',
        '@media only screen and (min-width: 768px)': {
          display: 'none'

        }
      }}
    >
      <Image height="22.66px" src={FaviconLogoWithName} />
      <Menu
        cursor="pointer"
        onClick={() => {
          setSidebarActive(!sidebarActive);
        }}
      />
    </FlexBox>
  );
}
