import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import MuiAppBar from '@material-ui/core/AppBar';
import Settings from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SearchBar from './SearchBar';

const useStyles = makeStyles(() => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    width: 300,
  },
}));

export default function AppBar(props) {
  const classes = useStyles();

  return (
    <MuiAppBar {...props} variant="outlined">
      <Toolbar disableGutters>
        <div className={classes.wrapper}>
          <IconButton color="inherit">
            <Menu />
          </IconButton>
          <Typography variant="h6">Sacramental Registry</Typography>
        </div>
        <SearchBar />
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
