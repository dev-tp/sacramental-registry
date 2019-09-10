import { Link, Route, Switch } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DescriptionIcon from '@material-ui/icons/Description';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import Analytics from './pages/Analytics';
import Form from './pages/Form';
import Search from './pages/Search';
import Settings from './pages/Settings';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

export default function App(): JSX.Element {
  const classes = useStyles();

  const icons = [
    <ListItemIcon><SearchIcon /></ListItemIcon>,
    <ListItemIcon><DescriptionIcon /></ListItemIcon>,
    <ListItemIcon><AssessmentIcon /></ListItemIcon>,
    <ListItemIcon><SettingsIcon /></ListItemIcon>,
  ];

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {['Search', 'Form', 'Analytics', 'Settings'].map((text, index) => (
            <ListItem key={text} button component={Link} to={`${text.toLowerCase()}`}>
              {icons[index]}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/form" component={Form} />
          <Route path="/search" component={Search} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </main>
    </div>
  );
}
