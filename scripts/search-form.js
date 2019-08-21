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
