import {
  CLOSE_FORM,
  OPEN_FORM,
  OPEN_FORM_WITH_DATA,
  POST_DATA,
} from '../constants';

export const closeForm = () => ({ type: CLOSE_FORM });
export const openForm = () => ({ type: OPEN_FORM });
export const openFormWithData = (data) => ({ type: OPEN_FORM_WITH_DATA, data });
export const postData = (data) => ({ type: POST_DATA, data });
