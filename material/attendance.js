$(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
  });
});

function addAttendee(form) {
  let name = form.elements.name.value;
  $.ajax({
    type: 'POST',
    url: 'https://hills.ccsf.edu/~ggorlen/php/attendance/add_attendee.php',
    crossDomain: true,
    data: $(form).serialize(),
    success: function (responseData, textStatus, jqXHR) {
      form.reset();
      $('#attendance-box').toggleClass('panel-info panel-success');
      $('#attendance-box-body')
        .hide()
        .html("Thanks, " + name + "!")
        .fadeIn(400);
    },
    error: function (responseData, textStatus, errorThrown) { 
      $('#attendance-box').toggleClass('panel-info panel-danger');
      $('#attendance-box-body')
        .hide()
        .html("Server error--try again later.")
        .fadeIn(400);
    }
  });
};
