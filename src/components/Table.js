import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BackupOutlined from '@material-ui/icons/BackupOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import MuiTable from '@material-ui/core/Table';
import PrintOutlined from '@material-ui/icons/PrintOutlined';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'grid',
    gap: theme.spacing(1),
    gridAutoFlow: 'column',
  },
  tableHeadOptions: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
  },
}));

const columns = ['Name', 'Address', 'Mother', 'Father'];

function Table({ data }) {
  const [selected, setSelected] = React.useState({});
  const classes = useStyles();

  const values = data.registry.map((person, i) => ({
    id: i,
    Name: `${person['first_name']} ${person['last_name']}`,
    Address: `${person['home_address_line_1']} ${person['home_address_line_2']}`,
    Mother: person['mother'],
    Father: person['father'],
  }));

  function select(id) {
    const state = { ...selected };

    if (id in selected) {
      delete state[id];
    } else {
      state[id] = null;
    }

    setSelected(state);
  }

  function selectAll(event) {
    const state = {};

    if (event.target.checked) {
      values.forEach((value) => (state[value.id] = null));
      return setSelected(state);
    }

    setSelected(state);
  }

  const selectedCount = Object.keys(selected).length;

  return values.length === 0 ? (
    <div />
  ) : (
    <MuiTable stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={values.length > 0 && selectedCount === values.length}
              indeterminate={selectedCount > 0 && selectedCount < values.length}
              onChange={selectAll}
            />
          </TableCell>
          {selectedCount !== 0 ? (
            <TableCell colSpan={4}>
              <div className={classes.tableHeadOptions}>
                <div className={classes.actions}>
                  <IconButton color="inherit" size="small">
                    <PrintOutlined fontSize="small" />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <BackupOutlined fontSize="small" />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <DeleteOutlined fontSize="small" />
                  </IconButton>
                </div>
                <div style={{ flexGrow: 1 }} />
                <Typography variant="inherit">
                  {selectedCount} selected
                </Typography>
              </div>
            </TableCell>
          ) : (
            <>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {values.map((value, i) => {
          const isSelected = value.id in selected;
          return (
            <TableRow key={i} selected={isSelected}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  onChange={() => select(value.id)}
                />
              </TableCell>
              {columns.map((column, j) => (
                <TableCell key={j}>{value[column]}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
}

export default connect((state) => state)(Table);
