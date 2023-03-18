import { activeGarmentConstant } from '../reducerConstant';

// eslint-disable-next-line import/prefer-default-export
export const setActiveGarmentData = (value:object) => async (dispatch:any) => {
  dispatch({ type: activeGarmentConstant.ACTIVE_GARMENT_DATA, value });
};

export const setActiveGarmentDataWithS3StructureData = (value:object) => (dispatch:any) => {
  dispatch({ type: activeGarmentConstant.ACTIVE_GARMENT_WITH_S3_STRUCTURE_DATA, value });
};

export const setGarmentStoreName = (value:string) => (dispatch:any) => {
  dispatch({ type: activeGarmentConstant.GARMENT_STORE_NAME, value });
};

export const setAdvancedInputs = (value: object) => (dispatch: any) => {
  dispatch({ type: activeGarmentConstant.ADVANCED_INPUTS, value });
};

export const setPresetsList = (value: object) => (dispatch: any) => {
  dispatch({ type: activeGarmentConstant.PRESETSLIST, value });
};
