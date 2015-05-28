'use strict';


module.exports = function (query) {
  var xpathResult = document.evaluate('//text()[contains(.,"' + query + '")]',
                                      document, null, XPathResult.ANY_TYPE, null);
  var result = [];
  var node;
  while (node = xpathResult.iterateNext()) {
    var textContent = node.textContent;
    var re = RegExp(query, 'g');
    while (pos = re.exec(textContent)) {
      var range = document.createRange();
      range.setStart(node, pos.index);
      range.setEnd(node, pos.index + query.length);
      result.push(range);
    }
  }
};
