import {
  DATA_WAS_NOT_POSTED,
  DATA_WAS_POSTED,
  DATA_WAS_UPDATED,
  RECEIVE_DATA,
  REQUEST_DATA,
} from '../constants';

export const fetchData = () => (dispatch) => {
  dispatch(requestData());
  return fetch('/api/registry').then((response) =>
    response.json().then((json) => dispatch(receiveData(json)))
  );
};

export const dataWasNotPosted = (error) => ({
  type: DATA_WAS_NOT_POSTED,
  error,
});

export const dataWasPosted = (data) => ({
  type: DATA_WAS_POSTED,
  data,
});

export const dataWasUpdated = (data) => ({
  type: DATA_WAS_UPDATED,
  data,
});

export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data,
});

export const requestData = () => ({
  type: REQUEST_DATA,
});
