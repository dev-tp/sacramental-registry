import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    textfield: {
      width: '100%',
    },
  }),
);

export default function Profile(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            className={classes.textfield}
            label="First Name"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textfield}
            label="Last Name"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Birthday"
            margin="dense"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Birth City"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Home Address Line 1"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Home Address Line 2"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            label="City"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            label="Region"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            label="ZIP Code"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Mother"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Father"
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Comments"
            margin="dense"
            multiline
            variant="outlined"
            rowsMax="4"
            rows="2"
          />
        </Grid>
      </Grid>
    </>
  );
}
