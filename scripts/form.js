document.getElementById('form__cancel-button').onclick = function () {
  switchSection('search-form');
};

['profile', 'baptism', 'communion', 'confirmation', 'marriage', 'profession-of-faith'].forEach(component => {
  loadComponent(`components/form/${component}.html`, 'form__inputs');
});
