function listCertificates(dateInputs) {
  $('#list-certificates-modal').modal('show');

  const modalBody = $('#list-certificates-modal .modal-body');

  modalBody.html('');

  for (const dateInput of dateInputs) {
    const customControlElem = document.createElement('div');
    customControlElem.classList.add('custom-control', 'custom-radio');

    customControlElem.innerHTML =
      `<input id="${dateInput.name}-option" class="custom-control-input" name="selected_certificate" type="radio" value="${dateInput.name}">
       <label class="custom-control-label" for="${dateInput.name}-option">${dateInput.dataset.display}</label>`;

    modalBody.append(customControlElem);
  }

  // https://stackoverflow.com/questions/14969960/jquery-click-events-firing-multiple-times
  $('#list-certificates-modal .btn-primary').unbind().on('click', function () {
    const inputs = document.querySelectorAll('.custom-control-input[name="selected_certificate"]');

    for (const input of inputs) {
      if (input.checked) {
        break;
      }
    }
  });
}
