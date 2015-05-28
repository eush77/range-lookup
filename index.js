'use strict';


module.exports = function (query) {
  if (!query.length) {
    return [];
  }

  var xpathResult = document.evaluate('//text()[contains(.,"' + query + '")]',
                                      document, null, XPathResult.ANY_TYPE, null);
  var result = [];
  var node;
  while (node = xpathResult.iterateNext()) {
    var textContent = node.textContent;
    var re = RegExp(query, 'g');
    var pos;
    while (pos = re.exec(textContent)) {
      var range = document.createRange();
      range.setStart(node, pos.index);
      range.setEnd(node, pos.index + query.length);
      result.push(range);
    }
  }
  return result;
};
