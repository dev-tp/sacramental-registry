import {
  CLOSE_CONFIRMATION_DIALOG,
  OPEN_CONFIRMATION_DIALOG,
} from '../constants';

const initialState = {
  message: '',
  onClose: () => {},
  isOpen: false,
};

export default function confirmationDialog(state = initialState, action) {
  switch (action.type) {
    case CLOSE_CONFIRMATION_DIALOG:
      return { ...initialState, message: state.message };
    case OPEN_CONFIRMATION_DIALOG:
      return {
        message: action.message,
        onClose: action.onClose,
        isOpen: true,
      };
    default:
      return state;
  }
}
