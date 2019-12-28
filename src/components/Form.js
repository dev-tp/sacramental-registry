import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import React from 'react';

import './Form.css';

function Baptism(props) {
  const [state, setState] = props.state;

  return (
    <section className="Baptism">
      {[
        {
          id: 'baptism_date',
          label: 'Baptism Date',
          type: 'date',
        },
        {
          id: 'baptism_church',
          label: 'Baptism Church',
        },
        {
          id: 'baptism_godfather',
          label: 'Godfather',
        },
        {
          id: 'baptism_proxy_godfather',
          label: 'Proxy Godfather',
        },
        {
          id: 'baptism_godmother',
          label: 'Godmother',
        },
        {
          id: 'baptism_proxy_godmother',
          label: 'Proxy Godmother',
        },
        {
          id: 'baptism_christian_witness',
          label: 'Christian Witness',
        },
        {
          id: 'baptism_presider',
          label: 'Presider',
        },
        {
          id: 'baptism_volume',
          label: 'Volume',
          style: { gridColumn: '1 / 5' },
          type: 'number',
        },
        {
          id: 'baptism_page',
          label: 'Section',
          style: { gridColumn: '5 / 9' },
          type: 'number',
        },
        {
          id: 'baptism_number',
          label: 'Line',
          style: { gridColumn: '9 / 13' },
          type: 'number',
        }
      ].map(props => (
        <Input
          key={props.id}
          onBlur={(id, value) => setState({ ...state, [id]: value })}
          type="text"
          value={state[props.id]}
          {...props}
        />
      ))}
    </section>
  );
}

function Communion(props) {
  const [state, setState] = props.state;

  return (
    <section className="Communion">
      {[
        {
          id: 'communion_date',
          label: 'First Communion Date',
          type: 'date',
        },
        {
          id: 'communion_church',
          label: 'First Communion Church',
        },
        {
          id: 'communion_presider',
          label: 'Presider',
        },
        {
          id: 'communion_volume',
          label: 'Volume',
          style: { gridColumn: '1 / 5' },
          type: 'number',
        },
        {
          id: 'communion_page',
          label: 'Section',
          style: { gridColumn: '5 / 9' },
          type: 'number',
        },
        {
          id: 'communion_number',
          label: 'Line',
          style: { gridColumn: '9 / 13' },
          type: 'number',
        },
      ].map(props => (
        <Input
          key={props.id}
          onBlur={(id, value) => setState({ ...state, [id]: value })}
          type="text"
          value={state[props.id]}
          {...props}
        />
      ))}
    </section>
  );
}

function Confirmation(props) {
  const [state, setState] = props.state;

  return (
    <section className="Confirmation">
      {[
        {
          id: 'confirmation_date',
          label: 'Confirmation Date',
          type: 'date',
        },
        {
          id: 'confirmation_church',
          label: 'Confirmation Church',
        },
        {
          id: 'confirmation_presider',
          label: 'Presider',
        },
        {
          id: 'confirmation_sponsor',
          label: 'Sponsor',
        },
        {
          id: 'confirmation_volume',
          label: 'Volume',
          style: { gridColumn: '1 / 5' },
          type: 'number',
        },
        {
          id: 'confirmation_page',
          label: 'Section',
          style: { gridColumn: '5 / 9' },
          type: 'number',
        },
        {
          id: 'confirmation_number',
          label: 'Line',
          style: { gridColumn: '9 / 13' },
          type: 'number',
        },
      ].map(props => (
        <Input
          key={props.id}
          onBlur={(id, value) => setState({ ...state, [id]: value })}
          type="text"
          value={state[props.id]}
          {...props}
        />
      ))}
    </section>
  );
}

function Info(props) {
  const [state, setState] = props.state;

  return (
    <section className="Info">
      {[
        {
          id: 'first_name',
          label: 'First Name',
          placeholder: 'Middle name can included here',
          style: { gridColumn: '1 / 7' },
        },
        {
          id: 'last_name',
          label: 'Last Name',
          style: { gridColumn: '7 / 13' },
        },
        {
          id: 'birth_date',
          label: 'Birthday',
          type: 'date',
        },
        {
          id: 'birth_city',
          label: 'Birth City',
        },
        {
          id: 'home_address_line_1',
          label: 'Home Address Line 1',
        },
        {
          id: 'home_address_line_2',
          label: 'Home Address Line 2',
          placeholder: 'Apartment, suite, unit, building, floor, etc.',
        },
        {
          id: 'city',
          label: 'City',
          style: { gridColumn: '1 / 5' },
        },
        {
          id: 'region',
          label: 'Region',
          style: { gridColumn: '5 / 9' },
        },
        {
          id: 'zip_code',
          label: 'Postal Code',
          style: { gridColumn: '9 / 13' },
        },
        {
          id: 'mother',
          label: 'Mother',
        },
        {
          id: 'father',
          label: 'Father',
        },
        {
          id: 'comments',
          label: 'Comments',
          type: 'textarea',
        }
      ].map(props => (
        <Input
          key={props.id}
          onBlur={(id, value) => setState({ ...state, [id]: value })}
          type="text"
          value={state[props.id]}
          {...props}
        />
      ))}
    </section>
  );
}

function Input(props) {
  const [value, setValue] = React.useState(props.value ? props.value : '');

  let input;

  if (props.type === 'textarea') {
    input = (
      <textarea
        className="form-control"
        id={props.id}
        onBlur={event => {
          const trimmedValue = event.target.value.trim();
          props.onBlur(props.id, trimmedValue);
          setValue(trimmedValue);
        }}
        onChange={event => setValue(event.target.value)}
        rows="4"
        style={{ minHeight: '6.8em' }}
        value={value}
      />
    );
  } else {
    input = (
      <input
        className="form-control"
        id={props.id}
        min={props.type === 'number' ? 0 : null}
        onBlur={event => {
          const trimmedValue = event.target.value.trim();
          props.onBlur(props.id, trimmedValue);
          setValue(trimmedValue);
        }}
        onChange={event => setValue(event.target.value)}
        placeholder={props.placeholder}
        type={props.type}
        value={value}
      />
    );
  }

  return (
    <div className="form-group" style={props.style}>
      <label htmlFor={props.id}>{props.label}</label>
      {input}
    </div>
  );
}

function Marriage(props) {
  const [state, setState] = props.state;

  return (
    <section className="Marriage">
      {[
        {
          id: 'marriage_partner_first_name',
          label: 'First Name',
          placeholder: 'Middle name can included here',
          style: { gridColumn: '1 / 7' },
        },
        {
          id: 'marriage_partner_last_name',
          label: 'Last Name',
          style: { gridColumn: '7 / 13' },
        },
        {
          id: 'marriage_partner_home_address_line_1',
          label: 'Home Address 1',
        },
        {
          id: 'marriage_partner_home_address_line_2',
          label: 'Home Address 2',
          placeholder: 'Apartment, suite, unit, building, floor, etc.',
        },
        {
          id: 'marriage_partner_city',
          label: 'City',
          style: { gridColumn: '1 / 5' },
        },
        {
          id: 'marriage_partner_region',
          label: 'Region',
          style: { gridColumn: '5 / 9' },
        },
        {
          id: 'marriage_partner_zip_code',
          label: 'Postal Code',
          style: { gridColumn: '9 / 13' },
        },
        {
          id: 'marriage_partner_baptism_date',
          label: 'Baptism Date',
          type: 'date',
        },
        {
          id: 'marriage_partner_baptism_church',
          label: 'Baptism Church',
        },
        {
          id: 'marriage_partner_mother',
          label: 'Mother',
        },
        {
          id: 'marriage_partner_father',
          label: 'Father',
        },
        {
          id: 'marriage_date',
          label: 'Wedding Date',
          type: 'date',
        },
        {
          id: 'marriage_church',
          label: 'Wedding Church',
        },
        {
          id: 'marriage_presider',
          label: 'Presider',
        },
        {
          id: 'marriage_witness_1',
          label: 'Witness 1',
        },
        {
          id: 'marriage_witness_2',
          label: 'Witness 2',
        },
        {
          id: 'marriage_volume',
          label: 'Volume',
          style: { gridColumn: '1 / 5' },
          type: 'number',
        },
        {
          id: 'marriage_page',
          label: 'Section',
          style: { gridColumn: '5 / 9' },
          type: 'number',
        },
        {
          id: 'marriage_number',
          label: 'Line',
          style: { gridColumn: '9 / 13' },
          type: 'number',
        },
      ].map(props => (
        <Input
          key={props.id}
          onBlur={(id, value) => setState({ ...state, [id]: value })}
          type="text"
          value={state[props.id]}
          {...props}
        />
      ))}
    </section>
  );
}

function ProfessionOfFaith(props) {
  const [state, setState] = props.state;

  return (
    <section className="ProfessionOfFaith">
      {[
        {
          id: 'profession_of_faith_date',
          label: 'Profession Date',
          type: 'date',
        },
        {
          id: 'profession_of_faith_church',
          label: 'Profession Church',
        },
        {
          id: 'profession_of_faith_presider',
          label: 'Presider',
        },
        {
          id: 'profession_of_faith_sponsor',
          label: 'Sponsor',
        },
        {
          id: 'profession_of_faith_volume',
          label: 'Volume',
          style: { gridColumn: '1 / 5' },
          type: 'number',
        },
        {
          id: 'profession_of_faith_page',
          label: 'Section',
          style: { gridColumn: '5 / 9' },
          type: 'number',
        },
        {
          id: 'profession_of_faith_number',
          label: 'Line',
          style: { gridColumn: '9 / 13' },
          type: 'number',
        },
      ].map(props => (
        <Input
          key={props.id}
          onBlur={(id, value) => setState({ ...state, [id]: value })}
          type="text"
          value={state[props.id]}
          {...props}
        />
      ))}
    </section>
  );
}

export function Form() {
  const state = React.useState({});

  return (
    <div className="Form">
      <Tabs selectedTabClassName="active" selectedTabPanelClassName="show">
        <TabList className="nav nav-fill nav-pills">
          <Tab className="nav-link nav-item">Info</Tab>
          <Tab className="nav-link nav-item">Baptism</Tab>
          <Tab className="nav-link nav-item">Communion</Tab>
          <Tab className="nav-link nav-item">Confirmation</Tab>
          <Tab className="nav-link nav-item">Marriage</Tab>
          <Tab className="nav-link nav-item">Profession of Faith</Tab>
        </TabList>
        <form>
          <TabPanel className="fade">
            <Info state={state} />
          </TabPanel>
          <TabPanel className="fade">
            <Baptism state={state} />
          </TabPanel>
          <TabPanel className="fade">
            <Communion state={state} />
          </TabPanel>
          <TabPanel className="fade">
            <Confirmation state={state} />
          </TabPanel>
          <TabPanel className="fade">
            <Marriage state={state} />
          </TabPanel>
          <TabPanel className="fade">
            <ProfessionOfFaith state={state} />
          </TabPanel>
        </form>
      </Tabs>
    </div>
  );
}

export default Form;
