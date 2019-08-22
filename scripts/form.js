let formInputs = null;
let formIsModified = false;

function clearForm() {
  formInputs.forEach(function (input) {
    if (input.type == 'radio') {
      input.checked = !!input.getAttribute('checked');
    } else {
      input.value = '';
    }
  });

  // Move to first pill
  document.querySelector('.nav-pills li a').click();

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
    switchSection('search-form');
  } else {
    const message = 'There is some modified content. Are you sure you want to continue without saving?';

    confirmMessage(message, function () {
      switchSection('search-form');
    });
  }
};

(async function () {
  // Load components first before they can be usable
  await Promise.all(['profile', 'baptism', 'communion', 'confirmation', 'marriage', 'profession-of-faith'].map(component => {
    return loadComponent(`components/form/${component}.html`, 'form__inputs');
  }));

  formInputs = document.querySelectorAll('#form__inputs input');

  formInputs.forEach(function (input) {
    input.onchange = function () {
      formIsModified = true;
    };
  });
})();
