import { snackBarReducerConstant } from '../reducerConstant';

export const showSuccessSnackbar = (message:any) => (dispatch:any) => {
  dispatch({ type: snackBarReducerConstant.SNACKBAR_SUCCESS, message });
};

export const showFailureSnackbar = (message:any) => (dispatch:any) => {
  dispatch({ type: snackBarReducerConstant.SNACKBAR_FAILURE, message });
};

export const clearSnackbar = () => (dispatch:any) => {
  dispatch({ type: snackBarReducerConstant.SNACKBAR_CLEAR });
};

export const pageLoader = (value:boolean) => (dispatch:any) => {
  dispatch({ type: snackBarReducerConstant.PAGELOADER, value });
};
