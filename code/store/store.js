"use strict";

const data = [];
const productsElem = document.getElementById("products");
const inputBox = document.getElementById("search-box").children[0];

// Populate the data array with some random information--this is 
// just for demonstration; normally, you'd load a JSON file.
for (let i = 0; i < 100; i++) {
  data.push({
    name: "blah blah",
    color: "hsl(" + (Math.random() * 360 | 0) + 
      ", " + (Math.random() * 100 | 0) + "%, " + 
      (Math.random() * 100 | 0) + "%)",
    description: ("abcdefghijklmnopqrstuvwxyz"[Math.random() * 26 | 0]
      .repeat(7) + " ")
      .repeat(Math.random() * 50 | 0),
    price: Math.random() * 1000 | 0
  });
}

// Listen for keydown events on the search box and filter products
inputBox.addEventListener("keydown", function (e) {

  // Show filtered set of products. The 1 ms delay is 
  // a hack so that inputBox.value is accurate
  setTimeout(function () {

    // Clear previous list of products
    productsElem.innerHTML = "";

    // Show the newly filtered list
    showProducts(filter(data, inputBox.value));
  }, 1);
});

// Puts the data into the document 
function showProducts(data) {
  data.forEach(function (e) {

    // Make a new element for each product
    const elem = document.createElement("div");
    elem.className = "product";
    elem.innerHTML = "<h2>" + e.name + "</h2>" + 
      "<div style='height: 150px; width: 150px; " + 
      "background: " + e.color + "'></div>" +
      "<p>" + e.description + "</p>" + 
      "<span><i>$" + e.price + "</i></span>";

    // Append the new product to the products element
    productsElem.appendChild(elem);
  });
}

// Returns an array of data matching a search term
function filter(data, term) {

  // array.filter returns an array with only items 
  // returned by the parameter function
  return data.filter(function (e) {

    // Look at each value in the product object 
    // and compare it to the search term
    for (const property in e) {
      if (e[property].toString().indexOf(term) >= 0) {
        return e;
      }
    }
  });
}

// Show all products on script load
showProducts(data);
