const { database } = require('./database');

const columns = [
  'id',
  'first_name',
  'last_name',
  'father',
  'mother',
  'home_address_line_1',
  'home_address_line_2',
  'city',
  'region',
  'zip_code',
].join(', ');

const resultsDom = document.getElementById('results');

function displayResults(results) {
  resultsDom.innerHTML = '';

  for (const result of results) {
    const name = result['first_name'] + ' ' + result['last_name'];
    const address = [
      result['home_address_line_1'],
      result['home_address_line_2'] ? result['home_address_line_2'] : '',
      result['city'],
      result['region'],
      result['zip_code']
    ].join(' ');

    const resultDom = document.createElement('div');
    resultDom.id = result['id'];
    resultDom.className = 'result';
    resultDom.innerHTML =
        `<p class="result-name">${name}</p>` +
        `<p class="result-address">${address}</p>` +
        `<p class="result-father">Father: ${result['father']}</p>` +
        `<p class="result-mother">Mother: ${result['mother']}</p>`;
    resultDom.onclick = function () {
      editMode(this.id);
    };

    resultsDom.appendChild(resultDom);
  }
}

document.getElementById('search').onkeyup = function () {
  if (!this.value) {
    resultsDom.classList.remove('show-results');
  } else {
    resultsDom.classList.add('show-results');

    let query = 'SELECT ' + columns + ' FROM registry WHERE CONCAT(first_name, " ", last_name) LIKE ';
    query += JSON.stringify('%' + this.value + '%');
    query += ' ORDER BY first_name';

    if (this.value.length < 4) {
      query += ' LIMIT 10';
    }

    database.query(query, function (error, results) {
      if (error) {
        throw error;
      }

      if (results.length != 0) {
        displayResults(results);
      } else {
        const resultsDom = document.getElementById('results');

        resultsDom.innerHTML = '';

        const noEntriesDom = document.createElement('div');
        noEntriesDom.classList.add('no-entries');
        noEntriesDom.innerHTML = '<span>No entries were found.</span>'

        resultsDom.appendChild(noEntriesDom);
      }
    });
  }
};
