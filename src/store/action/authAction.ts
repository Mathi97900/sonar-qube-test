import ApiUtil from '../../util/ApiUtil';
import { userReducerConstant } from '../reducerConstant';

export const loginAction = (value: boolean) => (dispatch: any) => {
  dispatch({ type: userReducerConstant.LOGIN_SUCCESS, value });
};

export const logOut = () => (dispatch: any) => {
  ApiUtil.nullifyToken();
  localStorage.clear();
  sessionStorage.clear();
  dispatch({ type: userReducerConstant.LOGOUT });
};

export const setStoreList = (value: any) => (dispatch: any) => {
  dispatch({ type: userReducerConstant.STORE_LIST, value });
};

export const setLoginUser = (value: any) => (dispatch: any) => {
  dispatch({ type: userReducerConstant.LOGIN_USER, value });
};

export const setCurrentStore = (value: any) => (dispatch: any) => {
  dispatch({ type: userReducerConstant.CURRENT_STORE, value });
};
