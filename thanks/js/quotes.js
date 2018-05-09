"use strict";

// Handler for a successful request
function onSuccess(responseText) {
  var quotesElem = document.getElementById("quotes");

  // Make a div for each quote
  responseText.split("\n").forEach(function (e) {
    var quoteElem = document.createElement("div");
    var quote = e.split("#");
    quoteElem.innerHTML = 
      "<div class=\"quote-content\">" + quote[1] + "</div>" +
      "<div class=\"quote-name\">" + quote[0] + "</div>" 
    ;
    quoteElem.className = "quote";
    quotesElem.appendChild(quoteElem);
  });
}

// Create and send the request
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    onSuccess(request.responseText);
  }
};
request.open("get", "quotes.txt");
request.setRequestHeader("Content-type", "text/plain");
request.send();
