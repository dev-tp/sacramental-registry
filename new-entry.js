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

      values[input.id] = input.value;
    }
  }

  for (const option of document.getElementsByTagName('select')) {
    if (option.id != '') {
      if (option.value == '') {
        required = true;
      }

      values[option.id] = option.value;
    }
  }

  if (required) {
    return;
  }

  const columns = Object.keys(values).join(', ');
  const query = 'INSERT INTO registry (' + columns + ') VALUES ?';

  console.log(query);
  console.log(Object.values(values));
}

document.getElementById('birthdate').onchange = function () {
  if (this.value) {
    this.classList.remove('invalid');
  }
};
