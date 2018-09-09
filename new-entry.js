const { database } = require('./database');

M.AutoInit();
M.Datepicker.init(document.querySelectorAll('.datepicker'), {
  format: 'yyyy-mm-dd',
  yearRange: 100
});

function submit() {
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

  const query = 'INSERT INTO registry (' + Object.keys(values).join(', ') + ') VALUES ?';

  database.query(query, [[Object.values(values)]], function (error, _) {
    if (error) {
      throw error;
    }

    window.location.href = 'index.html';
  });
}

document.getElementById('birthdate').onchange = function () {
  if (this.value) {
    this.classList.remove('invalid');
  }
};
