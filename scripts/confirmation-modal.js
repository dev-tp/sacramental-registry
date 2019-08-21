function confirmMessage(message, callback) {
  $('#confirmation-modal').modal('show');

  $('#confirmation-modal .modal-body p').html(message);

  $('#confirmation-modal .btn-primary').on('click', () => {
    $('#confirmation-modal').modal('hide');
    callback();
  });
}
