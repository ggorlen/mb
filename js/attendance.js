"use strict";


var attendanceFormElem = document.getElementById("attendance-form-btn");
var attendanceBoxElem = document.getElementById("attendance-box");

$(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
  });
});

function addAttendee(form) {
  var name = form.elements.name.value;

  if (name.length === 0) { 
    $(attendanceBoxElem).effect('shake', { 
      times: 2, distance: 2
    }, 200);

    return false; 
  }
  
  $.ajax({
    type: 'POST',
    url: 'https://hills.ccsf.edu/~ggorlen/php/attendance/add_attendee.php',
    crossDomain: true,
    data: $(form).serialize(),

    success: function (responseData, textStatus, jqXHR) {
      form.reset();
      attendanceFormElem.innerHTML = '<div><i class="fa fa-check fa-2x"></i></div>';
    },

    error: function (responseData, textStatus, errorThrown) { 
      // TODO
      form.reset();
      attendanceFormElem.innerHTML = '<div><i class="fa fa-check fa-2x"></i></div>';
    }
  });
};
