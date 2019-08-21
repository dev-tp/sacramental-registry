function displayResults(results) {
  const containerElem = document.querySelector('#search-form__results');

  containerElem.innerHTML = '';

  for (const result of results) {
    const name = `${result['first_name']} ${result['last_name']}`;
    const address = [
      result['home_address_line_1'],
      result['home_address_line_2'] ? result['home_address_line_2'] : '',
      result['city'],
      result['region'],
      result['zip_code']
    ].join(' ');

    const resultElem = document.createElement('div');
    resultElem.id = result['id'];
    resultElem.className = 'search-form__result';
    resultElem.innerHTML =
      `<p class="search-form__result-name">${name}</p>` +
      `<p class="search-form__result-address">${address}</p>` +
      `<p class="search-form__result-mother">Mother: ${result['mother'] ? result['mother'] : '&ndash;'}</p>` +
      `<p class="search-form__result-father">Father: ${result['father'] ? result['father'] : '&ndash;'}</p>`;
    resultElem.onclick = function () {
      // TODO Display result in form
    };

    containerElem.appendChild(resultElem);
  }
}

document.getElementById('search-form__create-button').onclick = function () {
  switchSection('form');
};

document.getElementById('search-form__date-search-button').onclick = function () {
  $('#search-form__normal-search').toggle();
  $('#search-form__date-search').toggle();

  this.checked = !this.checked;

  if (this.checked) {
    this.querySelector('i').classList.add('text-primary');
  } else {
    this.querySelector('i').classList.remove('text-primary');
  }
}

document.getElementById('search-form__normal-search').onkeyup = function () {
  if (this.timeout) {
    clearTimeout(this.timeout);
  }

  if (this.value && this.value.length > 2) {
    // Delay 500ms before sending a request to the database
    this.timeout = setTimeout(() => {
      const value = JSON.stringify('%' + this.value + '%');
      const query = `SELECT * FROM registry WHERE CONCAT(first_name, " ", last_name) LIKE ${value} AND deleted = 0`;

      database.query(query, function (error, results) {
        if (error) {
          throw error;
        }

        displayResults(results);
      });
    }, 500);
  }
};
