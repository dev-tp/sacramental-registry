function confirmMessage(message, callback) {
  $('#confirmation-modal').modal('show');

  $('#confirmation-modal .modal-body p').html(message);

  $('#confirmation-modal .btn-primary').unbind().on('click', function () {
    $('#confirmation-modal').modal('hide');
    callback();
  });
}
