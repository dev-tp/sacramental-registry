function displayResults(containerElem, results) {
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
      edit(result);
    };

    containerElem.appendChild(resultElem);
  }
}

function search(input, query) {
  if (input.timeout) {
    clearTimeout(input.timeout);
  }

  const containerElem = document.querySelector('#search-form__results');

  if (input.value && input.value.length > 2) {
    input.timeout = setTimeout(function () {
      database.query(query, function (error, results) {
        if (error) {
          throw error;
        }

        containerElem.innerHTML = '';

        if (results.length > 0) {
          containerElem.classList.remove('search-form__no-results');
          displayResults(containerElem, results);
        } else {
          containerElem.classList.add('search-form__no-results');
          containerElem.innerHTML = `<p>No results for "${input.value}"</p>`;
        }
      });
    }, 300);

  } else if (input.value == '') {
    containerElem.innerHTML = '';
  }
}

function updateSearchResults() {
  if (document.getElementById('search-form__date-search-button').checked) {
    document.getElementById('search-form__date-search').onchange();
  } else {
    document.getElementById('search-form__normal-search').onkeyup();
  }
}

document.getElementById('search-form__create-button').onclick = function () {
  clearForm();
  switchSection('form');
};

document.getElementById('search-form__date-search').onchange = function () {
  const containerElem = document.getElementById('search-form__date-search');

  const category = containerElem.querySelector('select').value;
  const date = containerElem.querySelector('input').value;

  const query = `SELECT * FROM registry WHERE ${category} = "${date}" AND deleted = 0`;
  this.value = date;

  search(this, query);
};

document.getElementById('search-form__date-search-button').onclick = function () {
  $('#search-form__normal-search').toggle();
  $('#search-form__date-search').toggle();

  this.checked = !this.checked;

  if (this.checked) {
    this.querySelector('span').classList.add('text-primary');
  } else {
    this.querySelector('span').classList.remove('text-primary');
  }
};

document.getElementById('search-form__normal-search').onkeyup = function () {
  const value = JSON.stringify('%' + this.value + '%');
  const query = `SELECT * FROM registry WHERE CONCAT(first_name, " ", last_name) LIKE ${value} AND deleted = 0`;
  search(this, query);
};
