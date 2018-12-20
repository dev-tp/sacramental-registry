const { remote } = require('electron');

const { database } = require('./database');

const editModeColumns = [
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
  'marriage_church',
  'marriage_presider',
  'marriage_witness_1',
  'marriage_witness_2',
  'marriage_volume',
  'DATE_FORMAT(profession_of_faith_date, "%Y-%m-%d") AS profession_of_faith_date',
  'profession_of_faith_church',
  'profession_of_faith_presider',
  'profession_of_faith_sponsor_1',
  'profession_of_faith_sponsor_2',
  'profession_of_faith_volume',
  'profession_of_faith_page',
  'profession_of_faith_number',
  'DATE_FORMAT(death_date, "%Y-%m-%d") AS death_date',
  'DATE_FORMAT(death_burial_date, "%Y-%m-%d") AS death_burial_date',
  'death_burial',
  'death_anointing',
  'death_presider',
  'death_volume',
  'comments',
].join(', ');
const formView = document.getElementById('form-view');
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
const resultsDom = document.getElementById('results');

function clearForm() {
  for (const input of formView.getElementsByTagName('input')) {
    const sibling = input.nextElementSibling;

    input.classList.remove('invalid');
    input.classList.remove('valid');

    if (input.type != 'radio') {
      input.value = null;
    }

    if (sibling.tagName == 'LABEL') {
      sibling.classList.remove('active');
    } else if (sibling.classList.contains('autocomplete-content')) {
      sibling.nextElementSibling.classList.remove('active');
    }
  }

  // Simulate clicking on personal-info tab
  const eventTrigger = document.createEvent('Event');
  eventTrigger.initEvent('click', true, false);
  document.getElementById('personal-info-tab').dispatchEvent(eventTrigger);

  const regionSelectBox = formView.getElementsByTagName('select')[0];
  const option = regionSelectBox.options[4]; // California's index is 4
  regionSelectBox.option = option;
  regionSelectBox.M_FormSelect.input.value = option.innerText;

  document.getElementsByName('sex')[0].checked = true;
}

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
      `<p class="result-father">Father: ${result['father'] ? result['father'] : '-'}</p>` +
      `<p class="result-mother">Mother: ${result['mother'] ? result['mother'] : '-'}</p>`;
    resultDom.onclick = function () {
      editMode(this.id);
    };

    resultsDom.appendChild(resultDom);
  }
}

function editMode(id) {
  document.getElementById('main-view').style.display = 'none';
  document.getElementById('form-view').style.display = 'block';

  clearForm();

  if (id) {
    document.getElementById('edit-mode').style.display = 'block';
    document.getElementById('create-mode').style.display = 'none';

    const query = `SELECT ${editModeColumns} FROM registry WHERE id = ${id}`;

    database.query(query, function (error, results) {
      if (error) {
        throw error;
      }

      const names = [];
      const result = results[0];

      Object.keys(result).forEach(function (key) {
        const input = document.getElementById(key);

        if (input) {
          input.value = result[key] ? result[key] : '';

          const labelDom = input.nextElementSibling;

          if (labelDom && input.value) {
            if (labelDom.tagName == 'LABEL') {
              labelDom.classList.add('active');
            } else if (labelDom.tagName == 'UL') {
              labelDom.nextElementSibling.classList.add('active');
            }
          }

          if (input.tagName == 'SELECT') {
            const option = input.options[input.selectedIndex];
            input.M_FormSelect.input.value = option.innerText;
          }

          if (key == 'first_name' || key == 'last_name') {
            names.push(result[key]);

            if (names.length == 2) {
              const message = `Are you sure you want to permanently delete the entry for ${names.join(' ')}?`;
              document.getElementById('modal-message').innerText = message;
            }
          }
        } else {
          // Radio buttons
          for (const option of document.getElementsByName(key)) {
            option.checked = option.value == result[key];
          }
        }
      });
    });

    document.getElementById('update-button').onclick = function () {
      submit(update, id);
    };

    document.getElementById('confirm-deletion-button').onclick = function () {
      database.query(`UPDATE registry SET deleted = 1 WHERE id = ${id}`, function (error, _) {
        if (error) {
          throw error;
        }

        const searchBox = document.getElementById('search');
        searchBox.nextElementSibling.classList.remove('active');
        searchBox.value = '';

        resultsDom.classList.remove('show-results');

        switchToMainView();
      });
    };

  } else {
    document.getElementById('edit-mode').style.display = 'none';
    document.getElementById('create-mode').style.display = 'block';
    document.getElementById('submit-button').onclick = function () {
      submit(insert);
    };
  }
}

function insert(values) {
  const query = `INSERT INTO registry (${Object.keys(values).join(', ')}) VALUES ?`;

  database.query(query, [[Object.values(values)]], function (error, _) {
    if (error) {
      throw error;
    }

    switchToMainView();
  });
}

function loadPrintOptions() {
  const dateInputs = document.querySelectorAll('[id$="date"]');
  const printOptions = [];

  for (let i = 1; i < dateInputs.length; i++) {
    const prefix = dateInputs[i].id.substr(0, dateInputs[i].id.indexOf('date') - 1);

    if (prefix == 'marriage_partner_baptism' || prefix == 'death_burial') {
      continue;
    }

    let addOption = false;

    if (dateInputs[i].value) {
      addOption = true;
    }

    if (!addOption) {
      let placeDom = document.getElementById(`${prefix}_church`);

      if (!placeDom && prefix == 'death') {
        placeDom = document.getElementById('death_burial');
      }

      if (placeDom.value) {
        addOption = true;
      }
    }

    if (addOption) {
      printOptions.push(prefix);
    }
  }

  const previewButton = document.getElementById('preview-certificate');

  previewButton.disabled = true;

  if (printOptions.length == 0) {
    document.getElementById('print-message').innerText = 'No certificates are available for preview.';
  } else {
    const printOptionsDom = document.getElementById('print-options');

    printOptionsDom.innerHTML = '';

    for (const printOption of printOptions) {
      const optionDom = document.createElement('p');

      optionDom.innerHTML =
        `<label for="${printOption}-certificate">` +
        `  <input type="radio" name="print-option" id="${printOption}-certificate" value="${printOption}">` +
        `  <span class="capitalize">${printOption}</span>` +
        `</label>`;

      optionDom.querySelector('input').onchange = function () {
        loadSelectedCertificate(this.value);
        previewButton.disabled = false;
      };

      printOptionsDom.appendChild(optionDom);
    }
  }

  previewButton.onclick = function () {
    document.getElementById('certificate').style.display = 'flex';
    document.getElementById('choose-certificate').style.display = 'none';
  };

  document.getElementById('print-certificate-button').onclick = function () {
    const window = remote.getCurrentWindow();

    if (window) {
      window.webContents.print();
    }
  };

  document.getElementById('close-preview-button').onclick = function () {
    document.getElementById('certificate').style.display = 'none';
    document.getElementById('choose-certificate').style.display = 'block';
  };
}

function loadSelectedCertificate(sacrament) {
  const verbs = {
    'baptism': 'was baptized',
    'communion': 'did his/her first communion',
    'confirmation': 'was confirmed',
  };

  const mother = document.getElementById('mother').value;
  const father = document.getElementById('father').value;

  const fullName = `${document.getElementById('first_name').value} ${document.getElementById('last_name').value}`;
  const parents = mother && father ? `${father} & ${mother}` : mother ? mother : father ? father : null;
  const presider = document.getElementById(`${sacrament}_presider`).value;

  let sacramentDate = new Date(document.getElementById(`${sacrament}_date`).value);
  sacramentDate = `${months[sacramentDate.getMonth()]} ${sacramentDate.getDate()}, ${sacramentDate.getFullYear()}`;

  // TODO Death location does not end with _church
  const sacramentChurch = document.getElementById(`${sacrament}_church`).value;

  let certificateText = `This is to certify that ${fullName}`;

  if (parents) {
    certificateText += `, child of ${parents},`;
  }

  certificateText += ` ${verbs[sacrament]} on ${sacramentDate}`;

  if (sacramentChurch) {
    certificateText += ` at ${sacramentChurch}`;
  }

  if (presider) {
    certificateText += ` by ${presider}`;
  }

  certificateText += '.';

  document.getElementById('certificate-title').innerText = `Certificate of ${sacrament.replace(/^\w/, function (letter) {
    return letter.toUpperCase();
  })}`;

  document.getElementById('certificate-text').innerText = certificateText;

  const date = new Date();
  const today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  document.getElementById('certificate-datum').innerText = today;
}

function submit(callback, id) {
  let required = false;

  const values = {};

  for (const input of formView.getElementsByTagName('input')) {
    if (input.id != '') {
      if (input.value == '' && input.required) {
        input.classList.add('invalid');
        required = true;
      }

      values[input.id] = input.value ? input.value : null;
    } else if (input.type == 'radio' && input.checked) {
      values[input.name] = input.value;
    }
  }

  for (const option of formView.getElementsByTagName('select')) {
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

function switchToMainView() {
  document.getElementById('form-view').style.display = 'none';
  document.getElementById('main-view').style.display = 'flex';
}

function update(values, id) {
  const fields = Object.keys(values).map(function (key) {
    return `${key} = ${JSON.stringify(values[key])}`;
  }).join(', ');

  const query = `UPDATE registry SET ${fields} WHERE id = ${id}`;

  database.query(query, function (error, _) {
    if (error) {
      throw error;
    }

    switchToMainView();
  });
}

for (const button of document.getElementsByClassName('cancel-button')) {
  button.onclick = switchToMainView;
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
      `FROM registry WHERE (CONCAT(first_name, " ", last_name) LIKE ${JSON.stringify('%' + this.value + '%')}) AND deleted = 0 ` +
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

M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
  data: {
    'Cathedral of Our Lady of the Angels': null,
  }
});

M.FloatingActionButton.init(document.querySelector('.fixed-action-btn'), {
  direction: 'left',
  hoverEnabled: false,
});

M.Modal.init(document.getElementById('choose-certificate'), {
  onOpenStart: loadPrintOptions,
  onCloseEnd: function () {
    // Clear -certificate IDs to prevent concatenating them to update query
    document.getElementById('print-options').innerHTML = '';
  },
});
