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

      if (!placeDom) {
        if (prefix == 'marriage') {
          placeDom = document.getElementById('marriage_wedding_place');
        } else if (prefix == 'death') {
          placeDom = document.getElementById('death_burial');
        }
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

  let selectedCertificate;

  if (printOptions.length == 0) {
    document.getElementById('print-message').innerText = 'No certificates are available for preview.';
  } else {
    const printOptionsDom = document.getElementById('print-options');

    printOptionsDom.innerHTML = '';

    for (const printOption of printOptions) {
      const optionDom = document.createElement('p');

      optionDom.innerHTML = `<label for="${printOption}-certificate">` +
                            `  <input type="radio" name="print-option" id="${printOption}-certificate" value="${printOption}">` +
                            `  <span class="capitalize">${printOption}</span>` +
                            `</label>`;

      optionDom.querySelector('input').onchange = function () {
        selectedCertificate = this.value;
        previewButton.disabled = false;
      };

      printOptionsDom.appendChild(optionDom);
    }
  }

  previewButton.onclick = function () {
    console.log(selectedCertificate);
  };
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
M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
  data: {
    'Cathedral of Our Lady of the Angels': null,
  }
});
M.FloatingActionButton.init(document.querySelector('.fixed-action-btn'), {
  direction: 'left',
});
M.Modal.init(document.getElementById('choose-certificate'), {
  onOpenStart: loadPrintOptions,
});

document.getElementById('birthdate').onchange = function () {
  if (this.value) {
    this.classList.remove('invalid');
  }
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

  const id = window.location.search.substring(4);
  const query = 'SELECT ' + columns + ' FROM registry WHERE id = ' + id;

  database.query(query, function (error, results) {
    if (error) {
      throw error;
    }

    const names = [];
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

        if (key == 'first_name' || key == 'last_name') {
          names.push(result[key]);

          if (names.length == 2) {
            const message = 'Are you sure you want to permanently delete the entry for ' + names.join(' ') + '?';
            document.getElementById('modal-message').innerText = message;
          }
        }
      }
    });
  });

  document.getElementById('update-button').onclick = function () {
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

  document.getElementById('create-mode').style.display = 'none';
  document.getElementById('edit-mode').style.display = 'inherit';
} else {
  document.getElementById('submit-button').onclick = function () {
    submit(insert);
  };
}
