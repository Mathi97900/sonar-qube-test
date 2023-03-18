import { CircularProgress } from '@material-ui/core';
import { Input, Label } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Image, Text
} from 'rebass';
import FaviconLogoWithName from '../../assets/FaviconLogoWithName.svg';
import { loginAction, setLoginUser, setStoreList } from '../../store/action/authAction';
import { showFailureSnackbar } from '../../store/action/snackbarAction';
import { Theme } from '../../theme/px/types';
import ApiUtil from '../../util/ApiUtil';
import Header from '../Header';
import FlexBox from '../utility/FlexBox';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme<Theme>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordErr] = useState(false);

  const [emailError, setEmailErr] = useState(false);
  const [loginClick, setLoginClick] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const isMobile = window.innerWidth < 576;
  const [loading, setLoading] = useState(false);

  const [toggle, setToggle] = useState('Brand');
  const emailRegex = /^\S+@\S+\.\S+$/;
  // const defaultUsername = 'hey@getswan.co';
  // const defaultPassword = 'Getswan@123';

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/analytics', { replace: true });
  //   }
  // }, [isLoggedIn]);
  // const isLogin: React.MouseEventHandler<HTMLButtonElement>
  //  | undefined(e)=>navigate('/analytics', { replace: true });
  const handleInputChange = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailErr(false);
    setPasswordErr(false);

    switch (type) {
      case 'email':
        if (!emailRegex.test(e.target.value)) {
          setEmailErr(true);
        }

        return setEmail(e.target.value);
      case 'password':
        return setPassword(e.target.value);
      default:
        return '';
    }
  };
  const handleLogin = (data: any) => {
    setLoading(true);
    ApiUtil.loginUser('auth/login', data)
      .then((res: any) => {
        if (res.data.storeStatus) {
          dispatch(loginAction(true));
          dispatch(setLoginUser(res.data?.user || {}));
          dispatch(setStoreList(res.data?.stores || []));
          ApiUtil.storeToken(res.data?.tokens);
          navigate('/app/analytics', { replace: true });
        } else if (!res.data.storeStatus) {
          dispatch(showFailureSnackbar('This user is not linked to any store'));
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
        if (err?.response?.status === 401) {
          // username doesn't exist - 401
          dispatch(
            showFailureSnackbar('The email you provided does not exist')
          );
        } else if (err?.response?.status === 400) {
          // 'Invalid Credentials'
          dispatch(showFailureSnackbar('Invalid Email or Password'));
        } else {
          dispatch(
            showFailureSnackbar('unknown error occured. Please try again')
          );
        }
      });
  };
  return (
    <Box>
      {isMobile && (
        <Header
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
        />
      )}
      <FlexBox
        // justifyContent="center"
        alignItems="center"
        vertical
        flexGrow={1}
      >
        <Box
          width={['auto', '1588px']}
          mt={[0, theme.marginSpacing.l]}
          height={['auto', '686px']}
          sx={{
            position: 'absolute',
            transform: 'rotate(1deg)',
            zIndex: '-10'
          }}
          backgroundColor="rgba(241, 246, 249, 0.63)"
        />
        <FlexBox
          alignItems="center"
          vertical
          width={['auto', 563]}
          px={[theme.marginSpacing.xl, '141px']}
          // height={550}
          mt={[0, theme.marginSpacing.xxl]}
          //   mt={[0, 95]}
          sx={{
            '@media only screen and (min-width: 576px)': {
              'border-radius': '20px',
              background: '#FFFFFF',
              'box-shadow': '0px 2px 20px rgba(66, 66, 66, 0.09)'
            }
          }}
        >
          {!isMobile && (
            <Image
              mt={[theme.marginSpacing.m, theme.marginSpacing.xxl]}
              maxHeight={['25px', '32px']}
              src={FaviconLogoWithName}
            />
          )}
          {/* <Text
        fontSize={[3, "32px"]}
        fontWeight="bold"
        color="primary"
        mt={[80, 80]}
      >
        Swan
      </Text> */}
          <Text
            mt={[theme.marginSpacing.xxxl, theme.marginSpacing.xxl]}
            fontSize={[3, '26px']}
            fontWeight="bold"
            fontFamily={theme.fonts.button}
            // color="primary"
          >
            Welcome back!
          </Text>
          <FlexBox
            mt={theme.marginSpacing.xxxl}
            width={['auto', '280px']}
            textAlign="center"
          >
            <Button
              width={['150px', '186px']}
              height="31px"
              fontSize={['16px', '14px']}
              fontFamily={theme.fonts.button}
              textAlign="center"
              bg={
                toggle === 'Shopper' ? theme.colors.primary : theme.colors.white
              }
              color={
                toggle === 'Shopper' ? theme.colors.white : theme.colors.primary
              }
              sx={{
                borderRadius: '4px 0px 0px 4px',
                padding: 0,
                // background: "white",
                // color: "#5932F3",
                border: ' 1px solid #5932F3',
                cursor: 'pointer'
              }}
              onClick={() => {
                setToggle('Shopper');
              }}
            >
              <Text mt="4px">Shopper</Text>
            </Button>
            <Button
              width={['152px', '188px']}
              height="31px"
              fontSize={['16px', '14px']}
              fontFamily={theme.fonts.button}
              textAlign="center"
              ml={[-2, -2]}
              bg={
                toggle === 'Brand' ? theme.colors.primary : theme.colors.white
              }
              color={
                toggle === 'Brand' ? theme.colors.white : theme.colors.primary
              }
              sx={{
                padding: 0,
                // background: "#5932F3",

                border: ' 1px solid #5932F3',
                cursor: 'pointer'
              }}
              onClick={() => {
                setToggle('Brand');
              }}
              variant="secondary"
            >
              <Text mt="4px">Brand</Text>
            </Button>
          </FlexBox>
          <Box mt={theme.marginSpacing.xxl} width="280px">
            <Label htmlFor="email" fontSize={['18px', '16px']} color="#5932F3">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              mt={theme.marginSpacing.s}
              sx={{
                border: ` 1px solid ${emailError ? 'red' : '#5932F3'}`
              }}
              onChange={(e) => handleInputChange('email', e)}

              //   placeholder="jane@example.com"
            />
            {emailError && loginClick && (
              <Label htmlFor="email" fontSize="14px" color="red">
                *Enter the valid email
              </Label>
            )}
          </Box>
          <Box mt={theme.marginSpacing.xxl} width="280px">
            <Label
              htmlFor="password"
              fontSize={['18px', '16px']}
              color="#5932F3"
            >
              Password
            </Label>
            <Input
              id="email"
              name="email"
              type="password"
              mt={theme.marginSpacing.s}
              sx={{
                border: ` 1px solid ${passwordError ? 'red' : '#5932F3'}`
              }}
              onChange={(e) => handleInputChange('password', e)}

              //   placeholder="jane@example.com"
            />
            {passwordError && loginClick && (
              <Label htmlFor="email" fontSize="14px" color="red">
                *Password should not be empty. Try again.
              </Label>
            )}
          </Box>
          <Box
            mt={[theme.marginSpacing.xxxl, theme.marginSpacing.xxl]}
            mb={[0, theme.marginSpacing.xxxl]}
          >
            <Button
              //   mt={[80,80]}
              fontFamily={theme.fonts.button}
              width="125px"
              height="40px"
              fontSize="16px"
              textAlign="center"
              sx={{
                background: '#5932F3',
                color: 'white',
                border: ' 1px solid #5932F3',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center'
              }}
              variant="secondary"
              onClick={() => {
                if (email && password && !emailError && !passwordError) {
                  handleLogin({ email, password });

                  // navigate('/app/analytics', { replace: true });
                } else {
                  if (password.length === 0) {
                    setPasswordErr(true);
                  }
                  // if (defaultUsername !== email) {
                  //   setEmailErr(true);
                  // }
                  // if (defaultPassword !== password) {
                  //   setPasswordErr(true);
                  // }
                  setLoginClick(true);
                }
              }}
            >
              <Text>Login</Text>
              {' '}
              {loading && (
                <CircularProgress
                  size={20}
                  style={{ marginLeft: 6, color: 'white' }}
                />
              )}
            </Button>
          </Box>
        </FlexBox>
        <Box
          width={['100%', 563]}
          // height={682}
          // mt={["168px", "3rem"]}
          // sx={{ textAlign: "initial" }}
          px={[theme.marginSpacing.xl, 0]}
          // vertical
        >
          <FlexBox
            mt={['148px', theme.marginSpacing.xl]}
            fontSize={['16px', 18]}
          >
            {/* <FlexBox justifyContent={"start"} alignItems={"center"}> */}
            <Text fontWeight="400">Don’t have an account?</Text>
            {/* <Link color="primary" >
              Sign up
            </Link> */}
            <Text
              color="primary"
              ml={1}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => navigate('/signup', { replace: true })}
            >
              Sign up
            </Text>
          </FlexBox>
          {/* </FlexBoax> */}
          <FlexBox
            mt={[theme.marginSpacing.xxxl, theme.marginSpacing.xl]}
            mb={[theme.marginSpacing.xxl, theme.marginSpacing.xl]}
            fontSize={['12px', '14px']}
            width={['auto', '327px']}
            justifyContent={['space-between', 'space-between']}
          >
            <Text>©Swan</Text>
            <Text
              sx={{ fontSize: '20px', marginTop: '-10px', color: '#C4C4C4' }}
            >
              .
            </Text>
            <Text>Contact</Text>
            <Text
              sx={{ fontSize: '20px', marginTop: '-10px', color: '#C4C4C4' }}
            >
              .
            </Text>
            <Text>Privacy Policy</Text>
          </FlexBox>
        </Box>
      </FlexBox>
    </Box>
  );
}
