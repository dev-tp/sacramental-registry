const formModifiedInputs = {};

let formData = null;
let formInputs = null;
let formIsModified = false;

function clearForm() {
  formInputs.forEach(function (input) {
    if (input.type == 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }

    delete formModifiedInputs[input.name];
  });

  formIsModified = false;
}

function edit(result) {
  document.getElementById('form__options').classList.add('edit');
  clearForm();

  formData = result;

  for (const name in result) {
    const inputs = document.getElementsByName(name);

    if (inputs.length == 1) {
      if (result[name] instanceof Date) {
        inputs[0].value = result[name].toISOString().split('T')[0];
      } else {
        inputs[0].value = result[name];
      }
    } else if (inputs.length > 1) {
      for (const input of inputs) { // Radio buttons
        if (input.value == result[name]) {
          input.checked = true;
          break;
        }
      }
    }
  }

  switchSection('form');
}

function warnIfModifiedContentExists() {
  if (!formIsModified) {
    document.getElementById('form__options').classList.remove('edit');
    document.querySelector('.nav-pills li a').click();
    switchSection('search-form');
  } else {
    const message = 'There is some modified content. Are you sure you want to continue without saving?';

    confirmMessage(message, function () {
      document.getElementById('form__options').classList.remove('edit');
      document.querySelector('.nav-pills li a').click();
      switchSection('search-form');
    });
  }
}

document.getElementById('form__cancel-button').onclick = warnIfModifiedContentExists;

document.getElementById('form__create-button').onclick = function () {
  if (formIsModified) {
    const columns = [];
    const values = [];

    for (const name in formModifiedInputs) {
      columns.push(name);

      if (formModifiedInputs[name].type == 'number') {
        values.push(formModifiedInputs[name].value);
      } else {
        values.push(JSON.stringify(formModifiedInputs[name].value));
      }
    }

    const query = `INSERT INTO registry (${columns.join(', ')}) VALUES (${values.join(', ')})`;

    database.query(query, function (error, _) {
      if (error) {
        throw error;
      }

      document.querySelector('.nav-pills li a').click();
      switchSection('search-form');
      updateSearchResults();
    });
  }
};

document.getElementById('form__delete-button').onclick = function () {
  confirmMessage('Are you sure you want to delete this entry?', function () {
    database.query(`UPDATE registry SET deleted = 1 WHERE id = ${formData['id']}`, function (error, _) {
      if (error) {
        throw error;
      }

      document.querySelector('.nav-pills li a').click();
      switchSection('search-form');
      updateSearchResults();
    });
  });
};

document.getElementById('form__list-certificates-button').onclick = function () {
  const validDateInputs = [];

  document.querySelectorAll('.sacrament').forEach(function (dateInput) {
    if (dateInput.value) {
      validDateInputs.push(dateInput);
    }
  });

  hasMultipleCertificates = validDateInputs.length > 1;

  if (hasMultipleCertificates) {
    listCertificates(validDateInputs);
  } else {
    loadCertificateData(null, validDateInputs[0].name.split('_')[0]);
  }
};

document.getElementById('form__update-button').onclick = function () {
  if (formIsModified) {
    const parameters = Object.keys(formModifiedInputs).map(function (name) {
      if (formModifiedInputs[name].type == 'number') {
        return `${name} = ${formModifiedInputs[name].value}`;
      }
      return `${name} = ${JSON.stringify(formModifiedInputs[name].value)}`;
    });

    const query = `UPDATE registry SET ${parameters.join(', ')} WHERE id = ${formData['id']}`;

    database.query(query, function (error, _) {
      if (error) {
        throw error;
      }

      document.querySelector('.nav-pills li a').click();
      switchSection('search-form');
      updateSearchResults();
    });
  }
};

document.querySelector('#form form').onsubmit = event => event.preventDefault();

(async function () {
  // Load components first before they can be usable
  await Promise.all(['profile', 'baptism', 'communion', 'confirmation', 'marriage', 'profession-of-faith'].map(component => {
    return loadComponent(`components/form/${component}.html`, 'form__inputs');
  }));

  formInputs = document.getElementById('form__inputs').querySelectorAll('input, textarea');

  formInputs.forEach(function (input) {
    input.onchange = function () {
      formModifiedInputs[this.name] = {type: this.type, value: this.value};
      formIsModified = true;
    };
  });
})();
