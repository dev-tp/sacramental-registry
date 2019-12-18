import React from 'react';

import './SearchSection.css';

export function SearchSection() {
  const [date, setDate] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('baptism');
  const [name, setName] = React.useState('');
  const [searchByName, setSearchByName] = React.useState(true);

  let searchField;

  function submit({ key }) {
    if (key === 'Enter') {
      if (searchByName) {
        console.log(`Search for ${name}`);
      } else {
        console.log(`Search for ${dateFilter} on ${date}`);
      }
    }
  }

  if (searchByName) {
    searchField =
      <input
        className="form-control"
        onChange={event => setName(event.target.value)}
        onKeyDown={submit}
        placeholder="Search name"
        type="text"
      />;
  } else {
    searchField =
      <>
        <select
          className="custom-select"
          onChange={event => setDateFilter(event.target.value)}
          style={{ marginRight: '0.6em' }}
        >
          <option value="baptism_date">Baptism</option>
          <option value="birth_date">Birthday</option>
          <option value="communion_date">Communion</option>
          <option value="confirmation_date">Confirmation</option>
          <option value="marriage_date">Marriage</option>
          <option value="profession_of_faith_date">Profession of Faith</option>
        </select>
        <input
          className="form-control"
          onChange={event => setDate(event.target.value)}
          onKeyDown={submit}
          type="date"
        />
      </>;
  }

  return (
    <section className="SearchSection">
      <div className="SearchSection__search">
        <div className="group">
          {searchField}
        </div>
      </div>
      <SearchResults values={[]} />
      <div className="SearchSection__options">
        <button
          className="btn text-primary"
          disabled
          style={{ fontSize: '0.9em' }}
        >
          Print listed
        </button>
        <button
          className="btn"
          onClick={() => setSearchByName(!searchByName)}
          style={{ fontSize: '0.9em' }}
        >
          Search by {searchByName ? 'date' : 'name'}
        </button>
      </div>
    </section>
  );
}

function SearchResults(props) {
  const { values } = props;
  const classNames = ['SearchSection__search-results'];
  const isEmpty = values.length === 0;

  let results;

  if (isEmpty) {
    classNames.push('SearchSection__search-results--empty');
  } else {
    results = values.map(value => (
      <div
        className="SearchSection__search-result"
        id={value['id']}
        key={value['id']}
      >
        <div>{value['first_name']} {value['last_name']}</div>
        <div>{value['home_address_line_1']} {value['home_address_line_2']}</div>
        <div>{value['city']}, {value['region']} {value['zip_code']}</div>
        <div>Father: {value['father'] ? value['father'] : '–'}</div>
        <div>Mother: {value['mother'] ? value['mother'] : '–'}</div>
      </div>
    ));
  }

  return (
    <div className={classNames.join(' ')}>
      {isEmpty ? <span>No results</span> : results}
    </div>
  );
}

export default SearchSection;
