import { POST_DATA } from '../constants';

const initialState = {
  registry: [],
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case POST_DATA:
      return { registry: [...state.registry, action.data] };
    default:
      return state;
  }
}
