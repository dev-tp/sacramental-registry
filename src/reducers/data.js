import {
  DATA_WAS_NOT_POSTED,
  DATA_WAS_POSTED,
  DATA_WAS_UPDATED,
  RECEIVE_DATA,
  REQUEST_DATA,
  REQUEST_FAILED,
} from '../constants';

const initialState = {
  error: null,
  isFetching: false,
  registry: [],
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case DATA_WAS_NOT_POSTED:
      return {
        ...state,
        error: action.error,
      };
    case DATA_WAS_POSTED:
      return {
        ...state,
        error: null,
        registry: [...state.registry, action.data],
      };
    case DATA_WAS_UPDATED:
      return {
        ...state,
        error: null,
        registry: state.registry.map((data) =>
          data['_id'] === action.data['_id'] ? action.data : data
        ),
      };
    case REQUEST_DATA:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case RECEIVE_DATA:
      return {
        ...state,
        error: null,
        isFetching: false,
        registry: action.data,
      };
    default:
      return state;
  }
}
