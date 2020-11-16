import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appBar} />
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      />
    </div>
  );
}
