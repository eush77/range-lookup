[![npm](https://nodei.co/npm/range-lookup.png)](https://nodei.co/npm/range-lookup/)

# range-lookup

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Find all [DOM ranges][range] for a given text string.

[range]: https://developer.mozilla.org/en-US/docs/Web/API/range

[travis]: https://travis-ci.org/eush77/range-lookup
[travis-badge]: https://travis-ci.org/eush77/range-lookup.svg
[david]: https://david-dm.org/eush77/range-lookup
[david-badge]: https://david-dm.org/eush77/range-lookup.png

## Example

```js
var rangeLookup = require('range-lookup');

var ranges = rangeLookup('some string');

// Highlight ranges.
var selection = window.getSelection();
ranges.forEach(selection.addRange.bind(selection));
```

## API

### `rangeLookup(query)`

`query` — string to search for.

Returns array of ranges, one for each match.

## Limitations

- This module is not capable of matching text that crosses text nodes boundaries.
- Double quotation marks (`"`) are not supported. PRs welcome.

## Install

```
npm install range-lookup
```

## License

MIT
