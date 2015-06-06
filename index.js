'use strict';

var kmp = require('kmp-matcher').kmp;


var xpath = function (func, node /* args */) {
  var args = [].slice.call(arguments, 2);
  if (args.length) {
    args = ',' + args.map(function (arg) {
      if (args.indexOf('"') >= 0) {
        throw new Error('Unimplemented: can\'t include \'"\' in XPath expression.');
      }
      return '"' + arg + '"';
    }).join(',');
  }

  return [func, '(', node, args, ')'].join('');
};


module.exports = function (query, opts) {
  opts = opts || {};

  if (!query.length) {
    return [];
  }

  var xnode = '.';
  if (opts.ignoreCase) {
    query = query.toLowerCase();
    xnode = xpath('translate', xnode, query.toUpperCase(), query);
  }

  var xpathExpression = '//text()[' + xpath('contains', xnode, query) + ']';
  var xpathResult = document.evaluate(xpathExpression, document, null,
                                      XPathResult.ANY_TYPE, null);

  var result = [];
  var node;
  while (node = xpathResult.iterateNext()) {
    kmp(opts.ignoreCase ? node.textContent.toLowerCase() : node.textContent,
        query)
      .forEach(function (start) {
        var range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + query.length);
        result.push(range);
      });
  }
  return result;
};
