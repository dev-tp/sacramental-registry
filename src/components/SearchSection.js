import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import FindInPageOutlined from '@material-ui/icons/FindInPageOutlined';
import PrintOutlined from '@material-ui/icons/PrintOutlined';
import React from 'react';

import './SearchSection.css';
import connection from '../api/database';

function SearchResult(props) {
  const { data } = props;

  return (
    <div className="SearchResult" id={data['id']}>
      <div className="SearchResult__info">
        <div style={{ fontWeight: 'bold' }}>
          {data['first_name']} {data['last_name']}
        </div>
        <div>{data['home_address_line_1']} {data['home_address_line_2']}</div>
        <div>{data['city']}, {data['region']} {data['zip_code']}</div>
        <div>Father: {data['father'] ? data['father'] : '–'}</div>
        <div>Mother: {data['mother'] ? data['mother'] : '–'}</div>
      </div>
      <div className="SearchResult__actions">
        <button className="SearchResult__button">
          <FindInPageOutlined />
        </button>
        <button className="SearchResult__button" disabled>
          <PrintOutlined />
        </button>
        <button className="SearchResult__button">
          <DeleteForeverOutlined />
        </button>
      </div>
    </div>
  );
}

function SearchResults(props) {
  const { values } = props;
  const classNames = ['SearchResults'];
  const isEmpty = values.length === 0;

  let results;

  if (isEmpty) {
    classNames.push('SearchResults--empty');
  } else {
    results = values.map(value => (
      <SearchResult data={value} key={value['id']} />
    ));
  }

  return (
    <div className={classNames.join(' ')}>
      {isEmpty ? <span>No results</span> : results}
    </div>
  );
}

export function SearchSection() {
  const [date, setDate] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('baptism_date');
  const [name, setName] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [resultsByDate, setResultsByDate] = React.useState([]);
  const [searchByName, setSearchByName] = React.useState(true);

  let searchField;

  function submit({ key }) {
    if (key === 'Enter') {
      const setter = searchByName ? setResults : setResultsByDate;

      let sql = `SELECT * FROM registry
                 WHERE DATE(date_entered) = DATE(NOW())
                 ORDER BY date_entered DESC`;

      if (searchByName) {
        if (name) {
          const value = JSON.stringify(`%${name}%`);
          sql = `SELECT * FROM registry
                 WHERE CONCAT(first_name, ' ', last_name) LIKE ${value}
                 LIMIT 30`;
        }
      } else {
        if (date) {
          sql = `SELECT * FROM registry
                 WHERE ${dateFilter} = '${date}'
                 LIMIT 30`;
        }
      }

      connection.query(sql, (error, rows) => {
        if (error) {
          return setter([]);
        }

        setter(rows);
      });
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
        <div className="SearchSection__input-group">
          {searchField}
        </div>
      </div>
      <SearchResults values={searchByName ? results : resultsByDate} />
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

export default SearchSection;
