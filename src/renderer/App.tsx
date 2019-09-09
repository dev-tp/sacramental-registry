import { Theme, createStyles, fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DescriptionIcon from '@material-ui/icons/Description';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Skeleton from '@material-ui/lab/Skeleton';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    card: {
      marginBottom: 10,
      '&:last-child': {
        marginBottom: 0,
      }
    }
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for person"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
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
            <ListItem button key={text}>
              {icons[index]}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div id="searchResults">
          {Array(3).fill(0).map((_, index) => (
            <Card className={classes.card} key={index}>
              <CardContent>
                <Skeleton width={'25%'} />
                <Skeleton width={'40%'} />
                <Skeleton width={'25%'} />
                <Skeleton width={'20%'} />
              </CardContent>
            </Card>
          ))}
          {/* <Card className={classes.card}>
            <CardContent>
              <Typography>First and Last Name</Typography>
              <Typography color="textSecondary">123 Address St. City, Region 00000</Typography>
              <Typography color="textSecondary">Mother: &ndash;</Typography>
              <Typography color="textSecondary">Father: &ndash;</Typography>
            </CardContent>
            <CardActions>
              <Button color="primary">View</Button>
              <Button color="primary">Print</Button>
            </CardActions>
          </Card> */}
        </div>
      </main>
    </div>
  );
}
