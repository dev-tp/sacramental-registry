const { database } = require('./database');

function populateTable(results) {
  const tableBody = document.getElementById('people');

  for (const result of results) {
    const values = Object.values(result).map(function (value) {
      return '<td>' + (value ? value : '-') + '</td>';
    });

    values.shift();

    const row = document.createElement('tr');
    row.classList.add('person');
    row.id = result.id;
    row.innerHTML = values.join('');
    row.onclick = function () {
      window.location.href = 'form.html?id=' + this.id;
    };

    tableBody.appendChild(row);
  }
}

const columns = [
  'id',
  'first_name',
  'last_name',
  'sex',
  'DATE_FORMAT(birthdate, "%M %e, %Y") AS birthdate',
  'birth_city',
  'father',
  'mother',
  'CONCAT(home_address_line_1, " ", IF(home_address_line_2 IS NULL, "", home_address_line_2)) AS "home_address"',
  'city',
  'region',
  'zip_code',
  'DATE_FORMAT(baptism, "%M %e, %Y") AS baptism',
  'DATE_FORMAT(communion, "%M %e, %Y") AS communion',
  'DATE_FORMAT(confirmation, "%M %e, %Y") AS confirmation',
  'DATE_FORMAT(wedding, "%M %e, %Y") AS wedding',
  'DATE_FORMAT(profession_of_faith, "%M %e, %Y") AS profession_of_faith',
  'DATE_FORMAT(death, "%M %e, %Y") AS death',
];

const query = 'SELECT ' + columns.join(', ') + ' FROM registry ORDER BY first_name LIMIT 100';

database.query(query, function (error, results) {
  if (error) {
    throw error;
  }

  populateTable(results);
});
