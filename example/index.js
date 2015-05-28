'use strict';

var rangeLookup = require('../');


var lookup = function (query) {
  var selection = window.getSelection();
  selection.removeAllRanges();
  rangeLookup(query).forEach(selection.addRange.bind(selection));
};


document.addEventListener('DOMContentLoaded', function () {
  var queryEl = document.querySelector('input');
  queryEl.addEventListener('keyup', function () {
    lookup(queryEl.value);
  });
});
