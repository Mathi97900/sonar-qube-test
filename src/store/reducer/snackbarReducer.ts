import { snackBarReducerConstant } from '../reducerConstant';

interface snackbarState {
  successSnackbarMessage: string;
  snackbarOpen: boolean;
  failureSnackbarMessage: string;
  severity: string;
  errorSnackbarOpen: boolean;
  infoSnackbarOpen: boolean;
  pageLoader:boolean;

}

const initialState: snackbarState = {
  successSnackbarMessage: '',
  snackbarOpen: false,
  failureSnackbarMessage: '',
  severity: '',
  errorSnackbarOpen: false,
  infoSnackbarOpen: false,
  pageLoader: false
};
// eslint-disable-next-line default-param-last
const snackbarReducer = (state: snackbarState = initialState, action: any) => {
  switch (action.type) {
    case snackBarReducerConstant.SNACKBAR_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        successSnackbarMessage: action.message,
        severity: 'success'
      };
    case snackBarReducerConstant.SNACKBAR_FAILURE:
      return {
        ...state,
        snackbarOpen: true,
        failureSnackbarMessage: action.message,
        severity: 'error'
      };
    case snackBarReducerConstant.SNACKBAR_CLEAR:
      return {
        ...state,
        snackbarOpen: false,
        errorSnackbarOpen: false,
        successSnackbarMessage: '',
        failureSnackbarMessage: '',
        infoSnackbarOpen: false
      };
    case snackBarReducerConstant.PAGELOADER:
      return {
        ...state,
        pageLoader: action.value
      };

    default:
      return state;
  }
};

export default snackbarReducer;
