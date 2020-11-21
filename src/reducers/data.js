import { POST_DATA, RECEIVE_DATA, REQUEST_DATA } from '../constants';

const initialState = {
  isFetching: false,
  registry: [],
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case POST_DATA:
      return { registry: [...state.registry, action.data] };
    case REQUEST_DATA:
      return { ...state, isFetching: true };
    case RECEIVE_DATA:
      return { ...state, registry: action.data, isFetching: false };
    default:
      return state;
  }
}
