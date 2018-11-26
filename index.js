const { database } = require('./database');

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

function editMode(id) {
  document.getElementById('main-view').style.display = 'none';
  document.getElementById('form-view').style.display = 'block';

  if (id) {
    document.getElementById('edit-mode').style.display = 'block';
    document.getElementById('create-mode').style.display = 'none';
  } else {
    document.getElementById('edit-mode').style.display = 'none';
    document.getElementById('create-mode').style.display = 'block';
  }
}

for (const button of document.getElementsByClassName('cancel-button')) {
  button.onclick = function () {
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('main-view').style.display = 'flex';
  };
}

document.getElementById('add-entry-button').onclick = function () {
  editMode();
};

document.getElementById('search').onkeyup = function () {
  if (!this.value) {
    resultsDom.classList.remove('show-results');
  } else {
    resultsDom.classList.add('show-results');

    let query =
        `SELECT id, first_name, last_name, father, mother, home_address_line_1, home_address_line_2, city, region, zip_code ` +
        `FROM registry WHERE CONCAT(first_name, " ", last_name) LIKE ${JSON.stringify('%' + this.value + '%')} ` +
        `ORDER BY first_name`;

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

M.AutoInit();
