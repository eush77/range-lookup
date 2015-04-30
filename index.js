document.addEventListener('mouseup', function () {
  var selection = window.getSelection();
  if (selection.isCollapsed || selection.rangeCount != 1) {
    return;
  }
  var query = selection.toString();
  if (query.indexOf('"') >= 0) {
    console.error('word-highlight: Resist to search for query with quotes.');
    return;
  }
  var xpathResult = document.evaluate('//text()[contains(.,"' + query + '")]', document, null, XPathResult.ANY_TYPE, null);
  var node;
  while (node = xpathResult.iterateNext()) {
    var textContent = node.textContent;
    var re = RegExp(query, 'g');
    while (pos = re.exec(textContent)) {
      var range = document.createRange();
      range.setStart(node, pos.index);
      range.setEnd(node, pos.index + query.length);
      selection.addRange(range);
    }
  }
});
