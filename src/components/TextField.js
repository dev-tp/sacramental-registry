import MuiTextField from '@material-ui/core/TextField';
import React from 'react';

export default function TextField(props) {
  const [value, setValue] = React.useState('');

  React.useEffect(() => setValue(props.value), [props]);

  const defaultProps = {
    fullWidth: true,
    InputLabelProps: {},
    value,
    variant: 'outlined',
  };

  if (props.type === 'date') {
    defaultProps.InputLabelProps = { shrink: true };
  }

  return (
    <MuiTextField
      {...props}
      {...defaultProps}
      onBlur={() => {
        const trimmedValue = value.trim();
        props.onBlur(props.name, trimmedValue);
        setValue(trimmedValue);
      }}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
