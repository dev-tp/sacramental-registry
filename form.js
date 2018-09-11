const { database } = require('./database');

function insert(values) {
  const query = 'INSERT INTO registry (' + Object.keys(values).join(', ') + ') VALUES ?';

  database.query(query, [[Object.values(values)]], function (error, _) {
    if (error) {
      throw error;
    }

    window.location.href = 'index.html';
  });
}

function submit(callback, id) {
  let required = false;

  const values = {};

  for (const input of document.getElementsByTagName('input')) {
    if (input.id != '') {
      if (input.value == '' && input.required) {
        input.classList.add('invalid');
        required = true;
      }

      values[input.id] = input.value ? input.value : null;
    }
  }

  for (const option of document.getElementsByTagName('select')) {
    if (option.id != '') {
      if (option.value == '') {
        required = true;
      }

      values[option.id] = option.value ? option.value : null;
    }
  }

  const comments = document.getElementById('comments');
  values[comments.id] = comments.innerText ? comments.innerText : null;

  if (required) {
    return;
  }

  callback(values, id);
}

function update(values, id) {
  const fields = Object.keys(values).map(function (key) {
    return key + ' = ' + JSON.stringify(values[key]);
  }).join(', ');

  const query = 'UPDATE registry SET ' + fields + ' WHERE id = ' + id;

  database.query(query, function (error, _) {
    if (error) {
      throw error;
    }

    window.location.href = 'index.html';
  });
}

M.AutoInit();

document.getElementById('birthdate').onchange = function () {
  if (this.value) {
    this.classList.remove('invalid');
  }
};

const submitButton = document.getElementById('submit-button');
submitButton.onclick = function () {
  submit(insert);
};

if (window.location.search) {
  const columns = [
    'baptism',
    'baptism_church',
    'birth_city',
    'DATE_FORMAT(birthdate, "%Y-%m-%d") AS "birthdate"',
    'city',
    'comments',
    'communion',
    'confirmation',
    'date_entered',
    'death',
    'father',
    'first_name',
    'home_address_line_1',
    'home_address_line_2',
    'last_name',
    'mother',
    'profession_of_faith',
    'region',
    'sex',
    'wedding',
    'zip_code',
  ].join(', ');

  const id = window.location.search.substring(4);
  const query = 'SELECT ' + columns + ' FROM registry WHERE id = ' + id;

  database.query(query, function (error, results) {
    if (error) {
      throw error;
    }

    const result = results[0];

    Object.keys(result).forEach(function (key) {
      const domElement = document.getElementById(key);

      if (domElement) {
        domElement.value = result[key] ? result[key] : '';

        const labelDom = domElement.parentElement.getElementsByTagName('label')[0];

        if (labelDom && domElement.value) {
          labelDom.classList.add('active');
        } else if (domElement.nodeName == 'SELECT') {
          const option = domElement.options[domElement.selectedIndex];
          domElement.M_FormSelect.input.value = option.innerText;
        }

        if (key == 'first_name') {
          document.getElementById('modal-message').innerText = 'Are you sure you want to delete the entry for ' + result[key] + '?';
        }
      }
    });
  });

  submitButton.innerText = 'Update';
  submitButton.onclick = function () {
    submit(update, id);
  };

  document.getElementById('confirm-deletion-button').onclick = function () {
    database.query('DELETE FROM registry WHERE id = ' + id, function (error, _) {
      if (error) {
        throw error;
      }

      window.location.href = 'index.html';
    });
  };
  document.getElementById('delete-button').style.display = 'inline';
}
