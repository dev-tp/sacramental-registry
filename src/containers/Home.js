import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';
import Table from '../components/Table';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    marginLeft: drawerWidth,
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} />
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      />
      <main className={classes.container}>
        <Toolbar />
        <div className={classes.content}>
          <Table />
        </div>
      </main>
    </div>
  );
}
