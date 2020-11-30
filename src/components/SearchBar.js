import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Search from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    minWidth: 300,
    position: 'relative',
    width: '25%',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    width: '100%',
  },
  dropdownContainer: {
    alignItems: 'center',
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'auto 1fr',
    padding: theme.spacing(2),
  },
  searchBar: {
    width: '100%',
  },
  wrapper: {
    padding: theme.spacing(1),
  },
}));

const initialQuery = {
  category: '',
  end_date: '',
  start_date: '',
  query: '',
};

export default function SearchBar() {
  const [displayDropdown, setDisplayDropdown] = React.useState(false);
  const [query, setQuery] = React.useState(initialQuery);

  const classes = useStyles();

  function handleChange(event) {
    setQuery({ ...query, [event.target.name]: event.target.value });
  }

  function reset() {
    setDisplayDropdown(false);
    setQuery(initialQuery);
  }

  function search() {
    console.log(query);
  }

  return (
    <Paper
      className={classes.root}
      elevation={0}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          search();
        }
      }}
    >
      <div className={classes.wrapper}>
        <IconButton onClick={search} size="small">
          <Search />
        </IconButton>
      </div>
      <InputBase
        className={classes.searchBar}
        name="query"
        onChange={handleChange}
        placeholder="Search"
        value={query.query}
      />
      <div className={classes.wrapper}>
        <IconButton
          size="small"
          onClick={() => setDisplayDropdown(!displayDropdown)}
        >
          {displayDropdown ? <ArrowDropUp /> : <ArrowDropDown />}
        </IconButton>
      </div>
      {displayDropdown && (
        <Paper className={classes.dropdown} elevation={2}>
          <div className={classes.dropdownContainer}>
            <Typography>Category</Typography>
            <Select
              name="category"
              onChange={handleChange}
              value={query.category}
            >
              <MenuItem value="birthday">Birthday</MenuItem>
              <MenuItem value="baptism_date">Baptism</MenuItem>
              <MenuItem value="communion_date">Communion</MenuItem>
              <MenuItem value="confirmation_date">Confirmation</MenuItem>
              <MenuItem value="wedding_date">Wedding</MenuItem>
              <MenuItem value="profession_of_faith_date">
                Profession of Faith
              </MenuItem>
            </Select>
            <Typography>Start Date</Typography>
            <TextField
              name="start_date"
              onBlur={() => {
                if (query.end_date === '') {
                  setQuery({ ...query, end_date: query.start_date });
                }
              }}
              onChange={handleChange}
              type="date"
              value={query.start_date}
            />
            <Typography>End Date</Typography>
            <TextField
              name="end_date"
              onChange={handleChange}
              type="date"
              value={query.end_date}
            />
            <div style={{ gridColumn: '1 / 3', textAlign: 'end' }}>
              <Button color="primary" onClick={search}>
                Search
              </Button>
              <Button onClick={() => reset()}>Cancel</Button>
            </div>
          </div>
        </Paper>
      )}
    </Paper>
  );
}
