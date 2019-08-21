let formInputs = null;
let formIsModified = false;

document.getElementById('form__cancel-button').onclick = function () {
  if (!formIsModified) {
    switchSection('search-form');
  } else {
    const message = 'There is some modified content. Are you sure you want to continue without saving?';

    confirmMessage(message, function () {
      formInputs.forEach(input => {
        if (input.type == 'radio') {
          input.checked = !!input.getAttribute('checked');
        } else {
          input.value = '';
        }
      });

      // Move to first pill
      document.querySelector('.nav-pills li a').click();
      switchSection('search-form');

      formIsModified = false;
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
