import { CLOSE_FORM, OPEN_FORM, OPEN_FORM_WITH_DATA } from '../constants';
import { dataWasNotPosted, dataWasPosted } from './data';

export const closeForm = () => ({
  type: CLOSE_FORM,
});

export const openForm = () => ({
  type: OPEN_FORM,
});

export const openFormWithData = (data) => ({
  type: OPEN_FORM_WITH_DATA,
  data,
});

export const postFormData = (data) => (dispatch) => {
  return fetch('/api/registry', {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
  }).then((response) =>
    response.json().then((json) => {
      if (json.error) {
        return dispatch(dataWasNotPosted(json.error));
      }

      data['_id'] = json['_id'];

      dispatch(dataWasPosted(data));
      dispatch(closeForm());
    })
  );
};
