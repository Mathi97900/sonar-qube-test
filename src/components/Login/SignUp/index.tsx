/* eslint-disable indent */
import { Input, Label } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Image, Text
} from 'rebass';
import FaviconLogoWithName from '../../../assets/FaviconLogoWithName.svg';
import { loginAction } from '../../../store/action/authAction';
import { showFailureSnackbar, showSuccessSnackbar } from '../../../store/action/snackbarAction';
import { Theme } from '../../../theme/px/types';
import ApiUtil from '../../../util/ApiUtil';
import Header from '../../Header';
import FlexBox from '../../utility/FlexBox';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme<Theme>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordErr] = useState(false);
  const [cPassLengthError, setCPassLengthError] = useState(false);

  const [passLengthError, setPassLengthError] = useState(false);

  const [confirmPasswordError, setConfirmPasswordErr] = useState(false);

  const [emailError, setEmailErr] = useState(false);
  const [loginClick, setLoginClick] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const isMobile = window.innerWidth < 576;

  //   const [toggle, setToggle] = useState('Brand');
  const emailRegex = /^\S+@\S+\.\S+$/;
  //   const defaultUsername = 'hey@getswan.co';
  //   const defaultPassword = 'Getswan@123';

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
    setConfirmPasswordErr(false);
    setPassLengthError(false);
    setCPassLengthError(false);

    switch (type) {
      case 'email':
        if (!emailRegex.test(e.target.value)) {
          setEmailErr(true);
        }
        // if (e.target.value !== defaultUsername) {
        //   setEmailErr(true);
        // }
        return setEmail(e.target.value);
      case 'password':

        return setPassword(e.target.value);
      case 'ConfirmPassword':

        return setConfirmPassword(e.target.value);
      default:
        return '';
    }
  };
  const clearFieldData = () => {
    setEmailErr(false);
        setPasswordErr(false);
    setConfirmPasswordErr(false);
    setPassLengthError(false);
    setCPassLengthError(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  const handleSignup = (data:any) => {
    ApiUtil.postData(
      'auth/register',
      data
    ).then((res:any) => {
      dispatch(
        showSuccessSnackbar(
          'User created successfully !'
        )
      );
      clearFieldData();
      //   ApiUtil.storeToken(res.data);
      console.log(res);
    }).catch((err) => {
      dispatch(showFailureSnackbar(err?.data?.msg || 'Something went wrong'));
      console.log(err);
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
            Sign up!
          </Text>

          <Box mt={theme.marginSpacing.xl} width="280px">
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
              value={email}
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
                border: ` 1px solid ${passwordError || passLengthError ? 'red' : '#5932F3'}`
              }}
              value={password}
              onChange={(e) => handleInputChange('password', e)}

              //   placeholder="jane@example.com"
            />
            {passwordError && loginClick && (
              <Label htmlFor="email" fontSize="14px" color="red">
                *Password and confirm password should be same. Try again.

              </Label>
            )}
            {passLengthError && loginClick && (
              <Label htmlFor="email" fontSize="14px" color="red">
                { password.length < 4 && password.length === 0 ? '*Password should not be empty.' : '*Password should be minimum 4 character.'}

              </Label>
            )}
            <Box mt={theme.marginSpacing.xxl} width="280px">
              <Label
                htmlFor="password"
                fontSize={['18px', '16px']}
                color="#5932F3"
              >
                Confirm password
              </Label>
              <Input
                id="email"
                name="email"
                type="password"
                mt={theme.marginSpacing.s}
                sx={{
                  border: ` 1px solid ${confirmPasswordError || cPassLengthError ? 'red' : '#5932F3'}`
                }}
                value={confirmPassword}
                onChange={(e) => handleInputChange('ConfirmPassword', e)}
              />
              {confirmPasswordError && loginClick && (
              <Label htmlFor="email" fontSize="14px" color="red">
                *Password and confirm password should be same. Try again.
              </Label>
              )}
              {cPassLengthError && loginClick && (
              <Label htmlFor="email" fontSize="14px" color="red">
                *Password should not be empty.

              </Label>
              )}
            </Box>
          </Box>
          <Box
            mt={[theme.marginSpacing.xxxl, theme.marginSpacing.xxl]}
            mb={[0, theme.marginSpacing.xl]}
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
                cursor: 'pointer'
              }}
              variant="secondary"
              onClick={() => {
                if (
                  email && confirmPassword && password && password.length > 4
                  && !emailError
                  && confirmPassword === password
                ) {
                  handleSignup({ email, password });

                  dispatch(loginAction(true));
                  // navigate('/app/analytics', { replace: true });
                } else {
                  // if (password.length < 4) {
                  //   setEmailErrLength(true);
                  // }
                  if (!emailRegex.test(email)) {
                    setEmailErr(true);
                  }
                  if (confirmPassword.length === 0) {
                    setCPassLengthError(true);
                  }
                  if (password.length === 0 || password.length < 4) {
                    setPassLengthError(true);
                  }
                  if (confirmPassword !== password) {
                    setPasswordErr(true);
                    setConfirmPasswordErr(true);
                  }
                  setLoginClick(true);
                }
              }}
            >
              Sign Up
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
            mb={['148px', theme.marginSpacing.xl]}
            fontSize={['16px', 18]}
          >
            {/* <FlexBox justifyContent={"start"} alignItems={"center"}> */}
            <Text fontWeight="400">Back to login?</Text>

            <Text color="primary" ml={1} sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/login', { replace: true })}>
              login
            </Text>
          </FlexBox>
          {/* </FlexBoax> */}

        </Box>
      </FlexBox>
    </Box>
  );
}
