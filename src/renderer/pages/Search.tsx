import { Theme, createStyles, fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    card: {
      marginBottom: 10,
      '&:last-child': {
        marginBottom: 0,
      }
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
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
    toolbar: theme.mixins.toolbar,
  }),
);

export default function Search(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar} />
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
    </>
  );
}
