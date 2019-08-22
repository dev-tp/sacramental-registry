const formModifiedInputs = {};

let formInputs = null;
let formIsModified = false;

function clearForm() {
  formInputs.forEach(function (input) {
    if (input.type == 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });

  for (const name in formModifiedInputs) {
    delete formModifiedInputs[name];
  }

  formIsModified = false;
}

function edit(result) {
  document.getElementById('form__options').classList.add('edit');
  clearForm();

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

document.getElementById('form__cancel-button').onclick = function () {
  document.getElementById('form__options').classList.remove('edit');

  if (!formIsModified) {
    document.querySelector('.nav-pills li a').click();
    switchSection('search-form');
  } else {
    const message = 'There is some modified content. Are you sure you want to continue without saving?';

    confirmMessage(message, function () {
      document.querySelector('.nav-pills li a').click();
      switchSection('search-form');
    });
  }
};

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
      switchSection('search-form');
    });
  }

  return false;
};

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
