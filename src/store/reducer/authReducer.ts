// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { userReducerConstant } from '../reducerConstant';

interface loginState {

  isLoggedIn: boolean,
  loginUser: any,
  currentStore: any,
  storeList: any
}
function loginCheck() {
  const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
  if (credentials?.access_token) {
    const { exp }: any = jwt_decode(credentials.access_token);
    if (Date.now() <= exp * 100000) {
      return true;
    }
  }
  return false;
}
const initialState: loginState = {
  isLoggedIn: loginCheck(),
  loginUser: {},
  currentStore: null,
  storeList: []

};

// eslint-disable-next-line default-param-last
const authReducer = (state: loginState = initialState, action: any) => {
  switch (action.type) {
    case userReducerConstant.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.value
      };
    case userReducerConstant.LOGIN_USER:
      return {
        ...state,
        loginUser: action.value
      };
    case userReducerConstant.LOGOUT:
      localStorage.removeItem('userCredentials');
      return {
        ...initialState
      };
    case userReducerConstant.STORE_LIST:
      return {
        ...state,
        storeList: action.value
      };
    case userReducerConstant.CURRENT_STORE:
      return {
        ...state,
        currentStore: action.value
      };
    default:
      return state;
  }
};

export default authReducer;
