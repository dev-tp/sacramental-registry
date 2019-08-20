document.getElementById('form__cancel-button').onclick = function () {
  switchSection('search-form');
};

loadComponent('components/form/profile.html', 'form__inputs');
loadComponent('components/form/baptism.html', 'form__inputs');
