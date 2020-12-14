import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';

import {
  closeConfirmationDialog,
  closeForm,
  openConfirmationDialog,
  postFormData,
} from '../actions';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: theme.spacing(2),
    gridAutoFlow: 'column',
  },
  header: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    marginBottom: theme.spacing(2),
  },
  partnerInfoContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    gridColumn: '1 / 13',
    padding: theme.spacing(2),
    position: 'relative',
    '&::before': {
      background: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      content: '"Partner"',
      display: 'block',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize * 0.85,
      left: theme.spacing(1),
      padding: theme.spacing(0, 1 * 0.5),
      position: 'absolute',
      top: -theme.spacing(1),
    },
  },
  stickTabs: {
    background: theme.palette.background.paper,
    left: 0,
    position: 'sticky',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.modal + 1,
  },
}));

const InputField = (props) => {
  if (props.type === 'radio') {
    return (
      <RadioGroup
        name={props.name}
        onChange={props.onChange}
        row
        style={props.style ? props.style : { gridColumn: '1 / 13' }}
        value={props.value}
      >
        {props.children.map((child) => (
          <FormControlLabel
            control={<Radio color="primary" />}
            key={child.label}
            label={child.label}
            value={child.value}
          />
        ))}
      </RadioGroup>
    );
  } else {
    const defaultProps = {
      fullWidth: true,
      InputLabelProps: {},
      style: { gridColumn: '1 / 13' },
      variant: 'outlined',
    };

    if (props.style) {
      defaultProps.style = props.style;
    }

    if (props.type === 'date') {
      defaultProps.InputLabelProps = { shrink: true };
    }

    return <TextField {...props} {...defaultProps} />;
  }
};

function Form({ form, dispatch }) {
  const [data, setData] = React.useState(form.data);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [modifiedFields, setModifiedFields] = React.useState({});
  const [tab, setTab] = React.useState(0);

  const classes = useStyles();
  const wasModified = Object.keys(modifiedFields).length !== 0;

  React.useEffect(() => {
    setData(form.data);
    setModifiedFields({});
    setTab(0);
  }, [form]);

  function handleBlur(event) {
    setData({ ...data, [event.target.name]: event.target.value.trim() });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });

    if (!(name in modifiedFields)) {
      setModifiedFields({ ...modifiedFields, [name]: null });
    }
  }

  function handleClose() {
    if (!wasModified) {
      dispatch(closeForm());
    } else {
      dispatch(
        openConfirmationDialog(
          'You made some modifications to this form. Are you sure you want to close it?',
          (confirmation) => {
            if (confirmation) {
              dispatch(closeForm());
            }

            dispatch(closeConfirmationDialog());
          }
        )
      );
    }
  }

  function handleSave() {
    dispatch(postFormData(data));
  }

  function makeInputFields(params) {
    return params.map((props, i) => (
      <InputField
        {...props}
        key={i}
        onBlur={handleBlur}
        onChange={handleChange}
        value={data[props.name]}
      />
    ));
  }

  return (
    <Dialog
      fullScreen
      onKeyUp={(event) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      }}
      open={form.isOpen}
    >
      <DialogContent style={{ paddingTop: 0 }}>
        <div className={classes.header}>
          <Tabs
            className={classes.stickTabs}
            onChange={(_, value) => setTab(value)}
            value={tab}
            variant="fullWidth"
          >
            <Tab label="Info" />
            <Tab label="Baptism" />
            <Tab label="Communion" />
            <Tab label="Confirmation" />
            <Tab label="Wedding" />
            <Tab label="Profession of Faith" />
          </Tabs>
          {data['_id'] !== null && (
            <>
              <IconButton onClick={(event) => setMenuAnchor(event.target)}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                open={!!menuAnchor}
              >
                <MenuItem
                  onClick={() => {
                    setMenuAnchor(null);
                    dispatch(
                      openConfirmationDialog(
                        'Are you sure you want to remove this person from records?',
                        (confirmation) => {
                          if (confirmation) {
                            console.log('Remove:', data);
                          }

                          dispatch(closeConfirmationDialog());
                        }
                      )
                    );
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem>Print</MenuItem>
              </Menu>
            </>
          )}
        </div>
        {tab === 0 && (
          <div className={classes.grid}>
            {makeInputFields([
              {
                label: 'First Name',
                name: 'first_name',
                style: { gridColumn: '1 / 7' },
              },
              {
                label: 'Last Name',
                name: 'last_name',
                style: { gridColumn: '7 / 13' },
              },
              {
                children: [
                  {
                    label: 'Female',
                    value: 'F',
                  },
                  {
                    label: 'Male',
                    value: 'M',
                  },
                ],
                name: 'sex',
                type: 'radio',
              },
              {
                label: 'Birthday',
                name: 'birthday',
                type: 'date',
              },
              {
                label: 'Birth City',
                name: 'birth_city',
              },
              {
                label: 'Home Address Line 1',
                name: 'home_address_line_1',
              },
              {
                label: 'Home Address Line 2',
                name: 'home_address_line_2',
              },
              {
                label: 'City',
                name: 'city',
                style: { gridColumn: '1 / 5' },
              },
              {
                label: 'State / Province',
                name: 'province',
                style: { gridColumn: '5 / 9' },
              },
              {
                label: 'Postal Code',
                name: 'postal_code',
                style: { gridColumn: '9 / 13' },
              },
              {
                label: 'Mother',
                name: 'mother',
              },
              {
                label: 'Father',
                name: 'father',
              },
              {
                label: 'Comments',
                multiline: true,
                name: 'comments',
              },
            ])}
          </div>
        )}
        {tab === 1 && (
          <div className={classes.grid}>
            {makeInputFields([
              {
                label: 'Date',
                name: 'baptism_date',
                type: 'date',
              },
              {
                label: 'Church',
                name: 'baptism_church',
              },
              {
                label: 'Presider',
                name: 'baptism_presider',
              },
              {
                label: 'Godfather',
                name: 'baptism_godfather',
              },
              {
                label: 'Proxy Godfather',
                name: 'baptism_proxy_godfather',
              },
              {
                label: 'Godmother',
                name: 'baptism_godmother',
              },
              {
                label: 'Proxy Godmother',
                name: 'baptism_proxy_godmother',
              },
              {
                label: 'Christian Witness',
                name: 'baptism_christian_witness',
              },
              {
                label: 'Volume',
                name: 'baptism_volume',
                style: { gridColumn: '1 / 5' },
              },
              {
                label: 'Page',
                name: 'baptism_page',
                style: { gridColumn: '5 / 9' },
              },
              {
                label: 'Line',
                name: 'baptism_line',
                style: { gridColumn: '9 / 13' },
              },
            ])}
          </div>
        )}
        {tab === 2 && (
          <div className={classes.grid}>
            {makeInputFields([
              {
                label: 'Date',
                name: 'communion_date',
                type: 'date',
              },
              {
                label: 'Church',
                name: 'communion_church',
              },
              {
                label: 'Presider',
                name: 'communion_presider',
              },
              {
                label: 'Volume',
                name: 'communion_volume',
                style: { gridColumn: '1 / 5' },
              },
              {
                label: 'Page',
                name: 'communion_page',
                style: { gridColumn: '5 / 9' },
              },
              {
                label: 'Line',
                name: 'communion_line',
                style: { gridColumn: '9 / 13' },
              },
            ])}
          </div>
        )}
        {tab === 3 && (
          <div className={classes.grid}>
            {makeInputFields([
              {
                label: 'Date',
                name: 'confirmation_date',
                type: 'date',
              },
              {
                label: 'Church',
                name: 'confirmation_church',
              },
              {
                label: 'Presider',
                name: 'confirmation_presider',
              },
              {
                label: 'Confirmation Name',
                name: 'confirmation_name',
              },
              {
                label: 'Sponsor',
                name: 'confirmation_sponsor',
              },
              {
                label: 'Volume',
                name: 'confirmation_volume',
                style: { gridColumn: '1 / 5' },
              },
              {
                label: 'Page',
                name: 'confirmation_page',
                style: { gridColumn: '5 / 9' },
              },
              {
                label: 'Line',
                name: 'confirmation_line',
                style: { gridColumn: '9 / 13' },
              },
            ])}
          </div>
        )}
        {tab === 4 && (
          <div className={classes.grid}>
            <div className={classes.grid + ' ' + classes.partnerInfoContainer}>
              {makeInputFields([
                {
                  label: 'First Name',
                  name: 'wedding_partner_first_name',
                  style: { gridColumn: '1 / 7' },
                },
                {
                  label: 'Last Name',
                  name: 'wedding_partner_last_name',
                  style: { gridColumn: '7 / 13' },
                },
                {
                  label: 'Father',
                  name: 'wedding_partner_father',
                },
                {
                  label: 'Mother',
                  name: 'wedding_partner_mother',
                },
                {
                  label: 'Home Address Line 1',
                  name: 'wedding_partner_home_address_line_1',
                },
                {
                  label: 'Home Address Line 2',
                  name: 'wedding_partner_home_address_line_2',
                },
                {
                  label: 'City',
                  name: 'wedding_partner_city',
                  style: { gridColumn: '1 / 5' },
                },
                {
                  label: 'State / Province',
                  name: 'wedding_partner_province',
                  style: { gridColumn: '5 / 9' },
                },
                {
                  label: 'Postal Code',
                  name: 'wedding_partner_postal_code',
                  style: { gridColumn: '9 / 13' },
                },
                {
                  label: 'Baptism Date',
                  name: 'wedding_partner_baptism_date',
                  type: 'date',
                },
                {
                  label: 'Baptism Church',
                  name: 'wedding_partner_baptism_church',
                },
              ])}
            </div>
            {makeInputFields([
              {
                label: 'Date',
                name: 'wedding_date',
                type: 'date',
              },
              {
                label: 'Church',
                name: 'wedding_church',
              },
              {
                label: 'Presider',
                name: 'wedding_presider',
              },
              {
                label: 'Witness 1',
                name: 'wedding_witness_1',
              },
              {
                label: 'Witness 2',
                name: 'wedding_witness_2',
              },
              {
                label: 'Volume',
                name: 'wedding_volume',
                style: { gridColumn: '1 / 5' },
              },
              {
                label: 'Page',
                name: 'wedding_page',
                style: { gridColumn: '5 / 9' },
              },
              {
                label: 'Line',
                name: 'wedding_line',
                style: { gridColumn: '9 / 13' },
              },
            ])}
          </div>
        )}
        {tab === 5 && (
          <div className={classes.grid}>
            {makeInputFields([
              {
                label: 'Date',
                name: 'profession_of_faith_date',
                type: 'date',
              },
              {
                label: 'Church',
                name: 'profession_of_faith_church',
              },
              {
                label: 'Presider',
                name: 'profession_of_faith_presider',
              },
              {
                label: 'Sponsor 1',
                name: 'profession_of_faith_sponsor_1',
              },
              {
                label: 'Sponsor 2',
                name: 'profession_of_faith_sponsor_2',
              },
              {
                label: 'Volume',
                name: 'profession_of_faith_volume',
                style: { gridColumn: '1 / 5' },
              },
              {
                label: 'Page',
                name: 'profession_of_faith_page',
                style: { gridColumn: '5 / 9' },
              },
              {
                label: 'Line',
                name: 'profession_of_faith_line',
                style: { gridColumn: '9 / 13' },
              },
            ])}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {wasModified && (
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        )}
        <Button onClick={handleClose}>{wasModified ? 'Cancel' : 'Back'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect((state) => state)(Form);
