import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import Profile from './Profile';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: {
    minHeight: 24
  },
}));

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function Form(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const categories = ['Profile', 'Baptism', 'Communion', 'Confirmation', 'Marriage', 'Profession of Faith'];
  const sections = [<Profile />, <div />, <div />, <div />, <div />, <div />];

  function handleChange(_: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Tabs value={value} onChange={handleChange} variant="scrollable">
            {categories.map(label => <Tab label={label} />)}
          </Tabs>
        </AppBar>
        {sections.map((section, i) => <TabPanel value={value} index={i}>{section}</TabPanel>)}
      </div>
    </>
  );
}
