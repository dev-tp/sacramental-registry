import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import TextField from '../components/TextField';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: theme.spacing(2),
    gridAutoFlow: 'column',
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
    marginBottom: theme.spacing(2),
    position: 'sticky',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Form() {
  const [data, setData] = React.useState({
    first_name: '',
    last_name: '',
    sex: '',
    birthday: '',
    birth_city: '',
    home_address_line_1: '',
    home_address_line_2: '',
    city: '',
    province: '',
    postal_code: '',
    father: '',
    mother: '',
    comments: '',
    baptism_date: '',
    baptism_church: '',
    baptism_presider: '',
    baptism_godfather: '',
    baptism_proxy_godfather: '',
    baptism_godmother: '',
    baptism_proxy_godmother: '',
    baptism_christian_witness: '',
    baptism_volume: '',
    baptism_page: '',
    baptism_line: '',
    communion_date: '',
    communion_church: '',
    communion_presider: '',
    communion_volume: '',
    communion_page: '',
    communion_line: '',
    confirmation_date: '',
    confirmation_church: '',
    confirmation_presider: '',
    confirmation_name: '',
    confirmation_sponsor: '',
    confirmation_volume: '',
    confirmation_page: '',
    confirmation_line: '',
    wedding_date: '',
    wedding_church: '',
    wedding_presider: '',
    wedding_witness_1: '',
    wedding_witness_2: '',
    wedding_partner_first_name: '',
    wedding_partner_last_name: '',
    wedding_partner_father: '',
    wedding_partner_mother: '',
    wedding_partner_home_address_line_1: '',
    wedding_partner_home_address_line_2: '',
    wedding_partner_city: '',
    wedding_partner_province: '',
    wedding_partner_postal_code: '',
    wedding_partner_baptism_date: '',
    wedding_partner_baptism_church: '',
    wedding_volume: '',
    wedding_page: '',
    wedding_line: '',
    profession_of_faith_date: '',
    profession_of_faith_church: '',
    profession_of_faith_presider: '',
    profession_of_faith_sponsor_1: '',
    profession_of_faith_sponsor_2: '',
    profession_of_faith_volume: '',
    profession_of_faith_page: '',
    profession_of_faith_line: '',
  });

  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  return (
    <Dialog fullScreen open={false}>
      <DialogContent style={{ paddingTop: 0 }}>
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
        {tab === 0 && (
          <div className={classes.grid}>
            <TextField
              label="First Name"
              name="first_name"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 7' }}
              value={data['first_name']}
            />
            <TextField
              label="Last Name"
              name="last_name"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '7 / 13' }}
              value={data['last_name']}
            />
            <RadioGroup
              onChange={(event) =>
                setData({ ...data, sex: event.target.value })
              }
              row
              style={{ gridColumn: '1 / 13' }}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Female"
                value="F"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Male"
                value="M"
              />
            </RadioGroup>
            <TextField
              label="Birthday"
              name="birthday"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              type="date"
              value={data['birthday']}
            />
            <TextField
              label="Birth City"
              name="birth_city"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['birth_city']}
            />
            <TextField
              label="Home Address Line 1"
              name="home_address_line_1"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['home_address_line_1']}
            />
            <TextField
              label="Home Address Line 2"
              name="home_address_line_2"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['home_address_line_2']}
            />
            <TextField
              label="City"
              name="city"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 5' }}
              value={data['city']}
            />
            <TextField
              label="State / Province"
              name="province"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '5 / 9' }}
              value={data['province']}
            />
            <TextField
              label="Postal Code"
              name="postal_code"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '9 / 13' }}
              value={data['postal_code']}
            />
            <TextField
              label="Father"
              name="father"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['father']}
            />
            <TextField
              label="Mother"
              name="mother"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['mother']}
            />
            <TextField
              label="Comments"
              multiline
              name="comments"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['comments']}
            />
          </div>
        )}
        {tab === 1 && (
          <div className={classes.grid}>
            <TextField
              label="Date"
              name="baptism_date"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              type="date"
              value={data['baptism_date']}
            />
            <TextField
              label="Church"
              name="baptism_church"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_church']}
            />
            <TextField
              label="Presider"
              name="baptism_presider"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_presider']}
            />
            <TextField
              label="Godfather"
              name="baptism_godfather"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_godfather']}
            />
            <TextField
              label="Proxy Godfather"
              name="baptism_proxy_godfather"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_proxy_godfather']}
            />
            <TextField
              label="Godmother"
              name="baptism_godmother"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_godmother']}
            />
            <TextField
              label="Proxy Godmother"
              name="baptism_proxy_godmother"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_proxy_godmother']}
            />
            <TextField
              label="Christian Witness"
              name="baptism_christian_witness"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['baptism_christian_witness']}
            />
            <TextField
              label="Volume"
              name="baptism_volume"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 5' }}
              value={data['baptism_volume']}
            />
            <TextField
              label="Page"
              name="baptism_page"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '5 / 9' }}
              value={data['baptism_page']}
            />
            <TextField
              label="Line"
              name="baptism_line"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '9 / 13' }}
              value={data['baptism_line']}
            />
          </div>
        )}
        {tab === 2 && (
          <div className={classes.grid} hidden={tab !== 2}>
            <TextField
              label="Date"
              name="communion_date"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              type="date"
              value={data['communion_date']}
            />
            <TextField
              label="Church"
              name="communion_church"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['communion_church']}
            />
            <TextField
              label="Presider"
              name="communion_presider"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['communion_presider']}
            />
            <TextField
              label="Volume"
              name="communion_volume"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 5' }}
              value={data['communion_volume']}
            />
            <TextField
              label="Page"
              name="communion_page"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '5 / 9' }}
              value={data['communion_page']}
            />
            <TextField
              label="Line"
              name="communion_line"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '9 / 13' }}
              value={data['communion_line']}
            />
          </div>
        )}
        {tab === 3 && (
          <div className={classes.grid}>
            <TextField
              label="Date"
              name="confirmation_date"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              type="date"
              value={data['confirmation_date']}
            />
            <TextField
              label="Church"
              name="confirmation_church"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['confirmation_church']}
            />
            <TextField
              label="Presider"
              name="confirmation_presider"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['confirmation_presider']}
            />
            <TextField
              label="Confirmation Name"
              name="confirmation_name"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['confirmation_name']}
            />
            <TextField
              label="Sponsor"
              name="confirmation_sponsor"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['confirmation_sponsor']}
            />
            <TextField
              label="Volume"
              name="confirmation_volume"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 5' }}
              value={data['confirmation_volume']}
            />
            <TextField
              label="Page"
              name="confirmation_page"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '5 / 9' }}
              value={data['confirmation_page']}
            />
            <TextField
              label="Line"
              name="confirmation_line"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '9 / 13' }}
              value={data['confirmation_line']}
            />
          </div>
        )}
        {tab === 4 && (
          <div className={classes.grid}>
            <TextField
              label="Date"
              name="wedding_date"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              type="date"
              value={data['wedding_date']}
            />
            <TextField
              label="Church"
              name="wedding_church"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['wedding_church']}
            />
            <TextField
              label="Presider"
              name="wedding_presider"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['wedding_presider']}
            />
            <TextField
              label="Witness 1"
              name="wedding_witness_1"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['wedding_witness_1']}
            />
            <TextField
              label="Witness 2"
              name="wedding_witness_2"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['wedding_witness_2']}
            />
            <div className={classes.grid + ' ' + classes.partnerInfoContainer}>
              <TextField
                label="First Name"
                name="wedding_partner_first_name"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 7' }}
                value={data['wedding_partner_first_name']}
              />
              <TextField
                label="Last Name"
                name="wedding_partner_last_name"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '7 / 13' }}
                value={data['wedding_partner_last_name']}
              />
              <TextField
                label="Father"
                name="wedding_partner_father"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 13' }}
                value={data['wedding_partner_father']}
              />
              <TextField
                label="Mother"
                name="wedding_partner_mother"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 13' }}
                value={data['wedding_partner_mother']}
              />
              <TextField
                label="Home Address Line 1"
                name="wedding_partner_home_address_line_1"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 13' }}
                value={data['wedding_partner_home_address_line_1']}
              />
              <TextField
                label="Home Address Line 2"
                name="wedding_partner_home_address_line_2"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 13' }}
                value={data['wedding_partner_home_address_line_2']}
              />
              <TextField
                label="City"
                name="wedding_partner_city"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 5' }}
                value={data['wedding_partner_city']}
              />
              <TextField
                label="State / Province"
                name="wedding_partner_province"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '5 / 9' }}
                value={data['wedding_partner_province']}
              />
              <TextField
                label="Postal Code"
                name="wedding_partner_postal_code"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '9 / 13' }}
                value={data['wedding_partner_postal_code']}
              />
              <TextField
                label="Baptism Date"
                name="wedding_partner_baptism_date"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 13' }}
                type="date"
                value={data['wedding_partner_baptism_date']}
              />
              <TextField
                label="Baptism Church"
                name="wedding_partner_baptism_church"
                onBlur={(name, value) => setData({ ...data, [name]: value })}
                style={{ gridColumn: '1 / 13' }}
                value={data['wedding_partner_baptism_church']}
              />
            </div>
            <TextField
              label="Volume"
              name="wedding_volume"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 5' }}
              value={data['wedding_volume']}
            />
            <TextField
              label="Page"
              name="wedding_page"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '5 / 9' }}
              value={data['wedding_page']}
            />
            <TextField
              label="Line"
              name="wedding_line"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '9 / 13' }}
              value={data['wedding_line']}
            />
          </div>
        )}
        {tab === 5 && (
          <div className={classes.grid}>
            <TextField
              label="Date"
              name="profession_of_faith_date"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              type="date"
              value={data['profession_of_faith_date']}
            />
            <TextField
              label="Church"
              name="profession_of_faith_church"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['profession_of_faith_church']}
            />
            <TextField
              label="Presider"
              name="profession_of_faith_presider"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['profession_of_faith_presider']}
            />
            <TextField
              label="Sponsor 1"
              name="profession_of_faith_sponsor_1"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['profession_of_faith_sponsor_1']}
            />
            <TextField
              label="Sponsor 2"
              name="profession_of_faith_sponsor_2"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 13' }}
              value={data['profession_of_faith_sponsor_2']}
            />
            <TextField
              label="Volume"
              name="profession_of_faith_volume"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '1 / 5' }}
              value={data['profession_of_faith_volume']}
            />
            <TextField
              label="Page"
              name="profession_of_faith_page"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '5 / 9' }}
              value={data['profession_of_faith_page']}
            />
            <TextField
              label="Line"
              name="profession_of_faith_line"
              onBlur={(name, value) => setData({ ...data, [name]: value })}
              style={{ gridColumn: '9 / 13' }}
              value={data['profession_of_faith_line']}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => console.log(data)}>
          Save
        </Button>
        <Button>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
