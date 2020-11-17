import Checkbox from '@material-ui/core/Checkbox';
import MuiTable from '@material-ui/core/Table';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = ['Name', 'Address', 'Mother', 'Father'];
const values = [];

for (let i = 0; i < 21; i++) {
  values.push({
    id: i,
    Name: '-',
    Address: '-',
    Mother: '-',
    Father: '-',
  });
}

export default function Table() {
  const [selected, setSelected] = React.useState({});

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

  return (
    <MuiTable stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectedCount > 0 && selectedCount < values.length}
              onChange={selectAll}
            />
          </TableCell>
          {columns.map((column) => (
            <TableCell key={column}>{column}</TableCell>
          ))}
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
