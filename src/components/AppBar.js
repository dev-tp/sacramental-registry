import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import MuiAppBar from '@material-ui/core/AppBar';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function AppBar(props) {
  return (
    <MuiAppBar {...props} variant="outlined">
      <Toolbar>
        <IconButton color="inherit" edge="start">
          <Menu />
        </IconButton>
        <Typography variant="h6">Sacramental Registry</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Search />
        </IconButton>
        <IconButton color="inherit" edge="end">
          <Settings />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
