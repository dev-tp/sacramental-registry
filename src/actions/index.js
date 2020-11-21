import {
  CLOSE_FORM,
  OPEN_FORM,
  OPEN_FORM_WITH_DATA,
  POST_DATA,
  RECEIVE_DATA,
  REQUEST_DATA,
} from '../constants';

export const closeForm = () => ({ type: CLOSE_FORM });
export const openForm = () => ({ type: OPEN_FORM });
export const openFormWithData = (data) => ({ type: OPEN_FORM_WITH_DATA, data });

export const fetchData = () => (dispatch) => {
  dispatch(requestData());
  return fetch('/api/registry').then((response) =>
    response.json().then((json) => dispatch(receiveData(json)))
  );
};

export const postData = (data) => ({ type: POST_DATA, data });
export const receiveData = (data) => ({ type: RECEIVE_DATA, data });
export const requestData = () => ({ type: REQUEST_DATA });
