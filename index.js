'use strict';

var kmp = require('kmp-matcher').kmp;


module.exports = function (query) {
  if (!query.length) {
    return [];
  }

  var xpathResult = document.evaluate('//text()[contains(.,"' + query + '")]',
                                      document, null, XPathResult.ANY_TYPE, null);
  var result = [];
  var node;
  while (node = xpathResult.iterateNext()) {
    kmp(node.textContent, query)
      .forEach(function (start) {
        var range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + query.length);
        result.push(range);
      });
  }
  return result;
};
