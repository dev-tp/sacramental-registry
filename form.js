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
    'first_name',
    'last_name',
    'sex',
    'DATE_FORMAT(birthdate, "%Y-%m-%d") AS birthdate',
    'birth_city',
    'home_address_line_1',
    'home_address_line_2',
    'city',
    'region',
    'zip_code',
    'father',
    'mother',
    'DATE_FORMAT(baptism_date, "%Y-%m-%d") AS baptism_date',
    'baptism_church',
    'baptism_godfather',
    'baptism_godmother',
    'baptism_proxy_godmother',
    'baptism_presider',
    'baptism_volume',
    'DATE_FORMAT(communion_date, "%Y-%m-%d") AS communion_date',
    'communion_church',
    'communion_presider',
    'communion_volume',
    'DATE_FORMAT(confirmation_date, "%Y-%m-%d") AS confirmation_date',
    'confirmation_church',
    'confirmation_presider',
    'confirmation_sponsor',
    'confirmation_volume',
    'DATE_FORMAT(marriage_date, "%Y-%m-%d") AS marriage_date',
    'marriage_partner_first_name',
    'marriage_partner_last_name',
    'marriage_partner_father',
    'marriage_partner_mother',
    'marriage_partner_home_address_line_1',
    'marriage_partner_home_address_line_2',
    'marriage_partner_city',
    'DATE_FORMAT(marriage_partner_baptism_date, "%Y-%m-%d") AS marriage_partner_baptism_date',
    'marriage_partner_baptism_church',
    'marriage_wedding_place',
    'marriage_presider',
    'marriage_witness_1',
    'marriage_witness_2',
    'marriage_volume',
    'DATE_FORMAT(death_date, "%Y-%m-%d") AS death_date',
    'DATE_FORMAT(death_burial_date, "%Y-%m-%d") AS death_burial_date',
    'death_burial',
    'death_anointing',
    'death_presider',
    'death_volume',
    'comments',
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
