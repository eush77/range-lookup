(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var rangeLookup = require('../');


var lookup = function (query) {
  var selection = window.getSelection();
  selection.removeAllRanges();
  rangeLookup(query).forEach(selection.addRange.bind(selection));
};


(function () {
  var queryEl = document.querySelector('input');
  queryEl.addEventListener('keyup', function () {
    lookup(queryEl.value);
  });
}());

},{"../":2}],2:[function(require,module,exports){
'use strict';

var kmp = require('kmp-matcher').kmp;


module.exports = function (query) {
  if (!query.length) {
    return [];
  }

  if (query.indexOf('"') >= 0) {
    throw new Error('Unimplemented: can\'t match &quot;');
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

},{"kmp-matcher":3}],3:[function(require,module,exports){
(function() {
    var kmp_matcher = {
        kmp: function(s, p) {
            var n = s.length;
            var m = p.length;
            var prefix = kmp_matcher.calcPrefixFunction(p);
            var res = [];
            var q = -1;
            for(var i = 0; i < n; i++) {
                while(q >= 0 && p[q + 1] != s[i]) {
                    q = prefix[q];
                }
                if(p[q + 1] == s[i]) {
                    q++;
                }
                if(q == m - 1) {
                    res.push(i - m + 1);
                    q = prefix[q];
                }
            }
            return res;
        },
        calcPrefixFunction: function(p) {
            var n = p.length;
            var prefix = [];
            var q = -1;
            prefix.push(q);
            for(var i = 1; i < n; i++) {
                while(q >= 0 && p[q + 1] != p[i]) {
                    q = prefix[q];
                }
                if(p[q + 1] == p[i]) {
                    q++;
                }
                prefix[i] = q;
            }
            return prefix;
        },
    };
    if (typeof define === 'function' && define.amd) define(function() { return kmp_matcher; });
    else if (typeof module !== 'undefined') module.exports = kmp_matcher;
    else if (typeof self !== 'undefined') self.kmp_matcher = kmp_matcher;
    else window.kmp_matcher = kmp_matcher;
})();
},{}]},{},[1]);
