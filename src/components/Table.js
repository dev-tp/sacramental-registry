import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BackupOutlined from '@material-ui/icons/BackupOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import ImportContacts from '@material-ui/icons/ImportContacts';
import MuiTable from '@material-ui/core/Table';
import PrintOutlined from '@material-ui/icons/PrintOutlined';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { openFormWithData } from '../actions';

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'grid',
    gap: theme.spacing(1),
    gridAutoFlow: 'column',
  },
  empty: {
    alignItems: 'center',
    color: theme.palette.text.hint,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  tableHeadOptions: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
  },
}));

const columns = ['Name', 'Address', 'Mother', 'Father'];

function Table({ data, dispatch }) {
  const [selected, setSelected] = React.useState({});

  const classes = useStyles();
  const selectedCount = Object.keys(selected).length;
  const values = data.registry;

  function select(value) {
    const state = { ...selected };

    if (value['_id'] in selected) {
      delete state[value['_id']];
    } else {
      state[value['_id']] = value;
    }

    setSelected(state);
  }

  function selectAll(event) {
    const state = {};

    if (event.target.checked) {
      values.forEach((value) => (state[value['_id']] = value));
      return setSelected(state);
    }

    setSelected(state);
  }

  return values.length === 0 ? (
    <div className={classes.empty}>
      <div style={{ textAlign: 'center' }}>
        <ImportContacts style={{ fontSize: '6em' }} />
        <Typography>Search for people in registry</Typography>
      </div>
    </div>
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
        {values.map((value) => {
          const isSelected = value['_id'] in selected;
          return (
            <TableRow
              hover
              key={value['_id']}
              onClick={() => dispatch(openFormWithData(value))}
              selected={isSelected}
              style={{ cursor: 'pointer' }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  onChange={() => select(value)}
                  onClick={(event) => event.stopPropagation()}
                />
              </TableCell>
              <TableCell>
                {value['first_name']} {value['last_name']}
              </TableCell>
              <TableCell>{value['home_address_line_1']}</TableCell>
              <TableCell>{value['mother']}</TableCell>
              <TableCell>{value['father']}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
}

export default connect((state) => state)(Table);
