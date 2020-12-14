import {
  CLOSE_CONFIRMATION_DIALOG,
  OPEN_CONFIRMATION_DIALOG,
} from '../constants';

export const openConfirmationDialog = (message, onClose) => ({
  type: OPEN_CONFIRMATION_DIALOG,
  message,
  onClose,
});

export const closeConfirmationDialog = () => ({
  type: CLOSE_CONFIRMATION_DIALOG,
});
