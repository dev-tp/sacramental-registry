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
  'baptism_christian_witness',
  'baptism_proxy_godmother',
  'baptism_presider',
  'baptism_volume',
  'baptism_page',
  'baptism_number',
  'DATE_FORMAT(communion_date, "%Y-%m-%d") AS communion_date',
  'communion_church',
  'communion_presider',
  'communion_volume',
  'communion_page',
  'communion_number',
  'DATE_FORMAT(confirmation_date, "%Y-%m-%d") AS confirmation_date',
  'confirmation_church',
  'confirmation_presider',
  'confirmation_sponsor',
  'confirmation_volume',
  'confirmation_page',
  'confirmation_number',
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
  'marriage_page',
  'marriage_number',
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
  'death_page',
  'death_number',
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
    document.getElementById('certificate-id').innerText = id;

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

    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = true;
    submitButton.onclick = function () {
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
    'communion': 'celebrated the Sacrament of the Holy Eucharist and received First Communion\n',
    'confirmation': 'was sealed with the Gift of the Holy Spirit\n',
  };

  const mother = document.getElementById('mother').value;
  const father = document.getElementById('father').value;

  const fullName = `${document.getElementById('first_name').value} ${document.getElementById('last_name').value}`;
  const parents = mother && father ? `${father} and ${mother}` : mother ? mother : father ? father : null;
  const presider = document.getElementById(`${sacrament}_presider`).value;

  const birthCity = document.getElementById('birth_city').value;
  let birthdate = new Date(document.getElementById('birthdate').value);
  birthdate = `${months[birthdate.getUTCMonth()]} ${birthdate.getUTCDate()}, ${birthdate.getUTCFullYear()}`;
  const birthInfo = `born in ${birthCity} on ${birthdate}`;

  let sacramentDate = new Date(document.getElementById(`${sacrament}_date`).value);
  sacramentDate = `${months[sacramentDate.getUTCMonth()]} ${sacramentDate.getUTCDate()}, ${sacramentDate.getUTCFullYear()}`;

  // TODO Death location does not end with _church
  const sacramentChurch = document.getElementById(`${sacrament}_church`).value;

  let certificateText = `This is to certify that\n${fullName}\n`;

  if (parents) {
    certificateText += `child of\n${parents}\n`;
  }

  certificateText += `${birthInfo}\n`;

  certificateText += ` ${verbs[sacrament]} on ${sacramentDate}`;

  if (sacramentChurch) {
    certificateText += ` at the ${sacramentChurch}`;
  }

  certificateText += `\nAccording to the Rite of the Roman Catholic Church`;

  if (presider) {
    certificateText += `\nby ${presider}`;
  }

  if (sacrament == 'baptism') {
    const godfather = document.getElementById('baptism_godfather').value;
    const godmother = document.getElementById('baptism_godmother').value;

    const sponsors = godfather && godmother ? `${godfather} and ${godmother}` : godmother ? godmother : godfather ? godfather : null;

    if (sponsors) {
      certificateText += `\nThe sponsor${godfather && godmother ? 's' : ''} being\n${sponsors}`;
    }

    certificateText += `\nas it appears on the Baptismal Registry of this church`;
  }

  document.getElementById('certificate-title').innerText = `Certificate of ${sacrament.replace(/^\w/, function (letter) {
    return letter.toUpperCase();
  })}`;

  document.getElementById('certificate-text').innerText = certificateText;
  document.getElementById('certificate-datum').innerText = `Dated ${sacramentDate}`;
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
  values[comments.id] = comments.value ? comments.value : null;

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

document.getElementById('certificate-pastor').onkeyup = function () {
  const certificateContent = document.getElementById('certificate-content');

  if (this.originalOffsetWidth === undefined) {
    this.originalOffsetWidth = this.offsetWidth;
  }

  if (this.originalCertificateOffsetWidth === undefined) {
    this.originalCertificateOffsetWidth = certificateContent.offsetWidth;
  }

  let offsetWidth = this.offsetWidth - this.originalOffsetWidth;

  if (offsetWidth < 0) {
    offsetWidth = 0;
  }

  // 42px is set to be the default font size for #certificate-content
  const width = (this.originalCertificateOffsetWidth + offsetWidth) / 42;

  certificateContent.style.width = `${width}em`;
};

document.getElementById('search').onkeyup = function () {
  if (!this.value) {
    resultsDom.classList.remove('show-results');
  } else {
    let query = `SELECT * FROM registry `;
    let doQuery = false;

    if (/^@\w*\s\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.value)) {
      const tokens = this.value.split(' ');

      let date = tokens[1].split('/');

      date = `${date[2]}-${date[0]}-${date[1]}`;

      if ('@birthday'.includes(tokens[0])) {
        query += `WHERE birthdate = "${date}" `;
      } else if ('@baptism'.includes(tokens[0])) {
        query += `WHERE baptism_date = "${date}" `;
      } else if ('@birthday'.includes(tokens[0])) {
        query += `WHERE birthday_date = "${date}" `;
      } else if ('@communion'.includes(tokens[0])) {
        query += `WHERE communion_date = "${date}" `;
      } else if ('@confirmation'.includes(tokens[0])) {
        query += `WHERE confirmation_date = "${date}" `;
      } else if ('@marriage'.includes(tokens[0])) {
        query += `WHERE marriage_date = "${date}" `;
      } else if ('@profession'.includes(tokens[0])) {
        query += `WHERE profession_of_faith_date = "${date}" `;
      }

      doQuery = true;

    } else if (!this.value.startsWith('@')) {
      query += `WHERE (CONCAT(first_name, " ", last_name) LIKE ${JSON.stringify('%' + this.value + '%')}) AND deleted = 0 `;
      doQuery = true;
    }

    query += `ORDER BY first_name`;

    if (this.value.length < 4) {
      query += ' LIMIT 10';
    }

    if (doQuery) {
      database.query(query, function (error, results) {
        if (error) {
          throw error;
        }

        if (results.length != 0) {
          resultsDom.classList.add('show-results');
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
  }
};

[ // Request: Disable submit button until a sacrament is filled
  'baptism_date',
  'communion_date',
  'confirmation_date',
  'marriage_date',
  'profession_of_faith_date',
].forEach(function (id) {
  document.getElementById(id).onchange = function () {
    if (this.value) {
      document.getElementById('submit-button').disabled = false;
    }
  };
});

M.AutoInit();

M.Autocomplete.init(document.querySelectorAll('.church'), {
  data: {
    'Cathedral of Our Lady of the Angels': null,
  }
});

M.Autocomplete.init(document.querySelectorAll('.presider'), {
  data: {
    'Abp. José Gomez': null,
    'Fr. David Gallardo': null,
    'Fr. Juan Ochoa': null,
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
