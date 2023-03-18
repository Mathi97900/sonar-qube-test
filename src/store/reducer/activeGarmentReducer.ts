import { activeGarmentConstant } from '../reducerConstant';

export type presetType = {
  id: number,
  preset_name: string,
  gender: string,
  status: string,
  advanced_inputs: {
    measurementType: string,
    measurementTolerance: { unit: string, value: number },
    garmentStrechy: string,
    garmentWeight: string,
    garmentShape: string,
    garmentSize: string
  },
  createdAt: Date,
  updatedAt: Date,
}
interface activeGarmentState {

  activeGarmentData: any,
  activeGarmentDataWithS3StructureData: any,
  garmentStoreName: string,
  presetsList: presetType[],
  advancedInputs: {
    measurementType: string,
    measurementTolerance: { unit: string, value: number },
    garmentStrechy: string,
    garmentWeight: string,
    garmentShape: string,
    garmentSize: string
  }
}

const initialState: activeGarmentState = {
  activeGarmentData: {},
  activeGarmentDataWithS3StructureData: {},
  garmentStoreName: '',
  presetsList: [],
  advancedInputs: {
    measurementType: 'Hang up',
    measurementTolerance: { unit: 'inches', value: 1 },
    garmentStrechy: 'Non -- 0%',
    garmentWeight: 'Light',
    garmentShape: 'Apple',
    garmentSize: 'Tight'
  }
};
// eslint-disable-next-line default-param-last
const activeGarmentReducer = (state: activeGarmentState = initialState, action: any) => {
  switch (action.type) {
    case activeGarmentConstant.ACTIVE_GARMENT_DATA:
      return {
        ...state,
        activeGarmentData: action.value
      };
    case activeGarmentConstant.ACTIVE_GARMENT_WITH_S3_STRUCTURE_DATA:
      return {
        ...state,
        activeGarmentDataWithS3StructureData: action.value
      };
    case activeGarmentConstant.GARMENT_STORE_NAME:
      return {
        ...state,
        garmentStoreName: action.value
      };
    case activeGarmentConstant.ADVANCED_INPUTS:
      return {
        ...state,
        advancedInputs: action.value
      };
    case activeGarmentConstant.PRESETSLIST:
      return {
        ...state,
        presetsList: action.value
      };

    default:
      return state;
  }
};

export default activeGarmentReducer;
