import { combineReducers } from 'redux';
import activeGarmentReducer from './activeGarmentReducer';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  activeGarment: activeGarmentReducer,
  snackbar: snackbarReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
