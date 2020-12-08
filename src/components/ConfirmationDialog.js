import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function ConfirmationDialog(props) {
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onClose(true)}>
          Yes
        </Button>
        <Button onClick={() => props.onClose(false)}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
