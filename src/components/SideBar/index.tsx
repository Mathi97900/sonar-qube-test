import { useTheme } from 'emotion-theming';
import { X } from 'heroicons-react';
import { useEffect, useState } from 'react';
import {
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Button, Image, Text
} from 'rebass';
import activeGarmentAvatar from '../../assets/activeGarmentAvatar.svg';
import analysticIcon from '../../assets/analysticIcon.svg';
import logoutIcon from '../../assets/logoutIcon.svg';
import SwanLogo from '../../assets/swanLogo.svg';
import { logOut, setCurrentStore } from '../../store/action/authAction';
import { RootState } from '../../store/reducer';
import '../../styles/sidebar.css';
import { Theme } from '../../theme/px/types';
import { Heading3 } from '../Headings';
import FlexBox from '../utility/FlexBox';
// props:{  collapsed:boolean, toggled:boolean, handleToggleSidebar:()=>void }
interface sidebarProps {
  sidebarActive: boolean;
  setSidebarActive: any;
}
export default function SideBar({
  sidebarActive,
  setSidebarActive
}: sidebarProps) {
  const [activeButton, setActiveButton] = useState('');

  const { currentStore } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const activeButton = 'Analytics';
  const theme = useTheme<Theme>();
  useEffect(() => {
    if (location.pathname.includes('/app/active-garments')) {
      setActiveButton('Active Garment');
    } else {
      setActiveButton('Analytics');
    }

    if (!currentStore) {
      const activeStore = localStorage.getItem('userCredentials');
      if (activeStore) {
        dispatch(setCurrentStore(JSON.parse(activeStore).store));
      }
    }
  }, []);

  console.log(currentStore, sidebarActive);

  return (
    // <Box id="header">
    <ProSidebar className={sidebarActive ? 'active' : ''}>
      <SidebarHeader>
        <FlexBox
          mt={theme.marginSpacing.m}
          mr="15px"
          justifyContent="flex-end"
          sx={{
            '@media only screen and (min-width: 768px)': {
              display: 'none'
            }
          }}
        >
          <X
            color="black"
            cursor="pointer"
            onClick={() => setSidebarActive(!sidebarActive)}
          />
        </FlexBox>
        <FlexBox className="swanLogo" vertical alignItems="center">
          <Image
            mt={theme.marginSpacing.xl}
            //   width={'64px'}
            //   height={'64px'}
            src={SwanLogo}
          />
          <Heading3 sx={{ color: '#0C0C0C', fontFamily: theme.fonts.button }}>
            {currentStore ? currentStore.store_name : 'Brand name'}
          </Heading3>
          <Text
            mt={theme.marginSpacing.s}
            sx={{
              fontFamily: 'AvenirLTPro-Book',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '150%',
              color: '#4E4E4E'
            }}
          >
            {currentStore ? currentStore.store_url : 'www.brandname.com'}
          </Text>
        </FlexBox>
        {/**
         *  You can add a header for the sidebar ex: logo
         */}
      </SidebarHeader>

      <SidebarContent style={{ flexGrow: 1 }}>
        <FlexBox textAlign="center" vertical alignItems="center">
          <Box mt={theme.marginSpacing.xl}>
            {activeButton === 'Analytics' ? (
              <Button
                className="sidebarButton"
                backgroundColor="#5932F3"
                fontSize="16px"
                style={{
                  textAlign: 'left',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: theme.fonts.button
                }}
                onClick={() => setSidebarActive(!sidebarActive)}
              >
                <Image src={analysticIcon} />
                {' '}
                <Text pl="8px">Analytics</Text>
              </Button>
            ) : (
              <Box
                fontSize="16px"
                className="sideBarMenu"
                sx={{ fontFamily: theme.fonts.button }}
                onClick={() => {
                  setActiveButton('Analytics');
                  navigate('/app/analytics', { replace: true });
                  setSidebarActive(!sidebarActive);
                }}
              >
                {' '}
                <Image
                  sx={{
                    filter:
                      'invert(0%) sepia(93%) saturate(17%) hue-rotate(125deg) brightness(9%) contrast(103%)'
                  }}
                  src={analysticIcon}
                />
                {' '}
                <Text pl="8px" mt="5px">
                  Analytics
                </Text>
              </Box>
            )}
          </Box>
          <Box mt={theme.marginSpacing.l}>
            {activeButton === 'Active Garment' ? (
              <Button
                className="sidebarButton"
                backgroundColor="#5932F3"
                fontSize="16px"
                style={{
                  textAlign: 'left',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: theme.fonts.button
                }}
                onClick={() => {
                  console.log('activegarment');
                  navigate('/app/active-garments', { replace: true });
                  setSidebarActive(!sidebarActive);
                }}
              >
                <Image
                  sx={{
                    filter:
                      'invert(26%) sepia(1%) saturate(1%) hue-rotate(1deg) brightness(1000%) contrast(91%)'
                  }}
                  src={activeGarmentAvatar}
                />
                {' '}
                <Text pl="8px" mt="5px">
                  Active Garment
                </Text>
              </Button>
            ) : (
              <Box
                fontSize="16px"
                className="sideBarMenu"
                sx={{ fontFamily: theme.fonts.button }}
                onClick={() => {
                  console.log('activegarments');
                  setActiveButton('Active Garment');
                  navigate('/app/active-garments', { replace: true });
                  setSidebarActive(!sidebarActive);
                }}
              >
                <Image src={activeGarmentAvatar} />
                {' '}
                <Text pl="8px" mt="5px">
                  Active Garment
                </Text>
              </Box>
            )}
          </Box>

          <Box
            mt={theme.marginSpacing.l}
            fontSize="16px"
            className="sideBarMenu"
            sx={{ fontFamily: theme.fonts.button, color: '#4E4E4E' }}
            onClick={() => {
              dispatch(logOut());
              navigate('/app/login', { replace: true });
            }}
          >
            <Image src={logoutIcon} />
            {' '}
            <Text
              pl="8px"
              mt="5px"
              sx={{
                fontFamily: 'AvenirLTPro-Medium',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '150%',
                color: '#4E4E4E'
              }}
            >
              Log out
            </Text>
          </Box>
        </FlexBox>
      </SidebarContent>
      <SidebarFooter />
    </ProSidebar>
    // </Box>
  );
}
