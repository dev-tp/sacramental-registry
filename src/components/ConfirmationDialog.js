import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';

function ConfirmationDialog({ state }) {
  return (
    <Dialog open={state.isOpen}>
      <DialogContent>
        <DialogContentText>{state.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => state.onClose(true)}>
          Yes
        </Button>
        <Button onClick={() => state.onClose(false)}>No</Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect((state) => ({ state: state.confirmationDialog }))(
  ConfirmationDialog
);
