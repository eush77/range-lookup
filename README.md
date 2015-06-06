[![npm](https://nodei.co/npm/range-lookup.png)](https://nodei.co/npm/range-lookup/)

# range-lookup

[![Dependency Status][david-badge]][david]

Find all matching [DOM ranges][range] for a given text string.

[range]: https://developer.mozilla.org/en-US/docs/Web/API/range

[david]: https://david-dm.org/eush77/range-lookup
[david-badge]: https://david-dm.org/eush77/range-lookup.png

## Example

```js
var rangeLookup = require('range-lookup');

var ranges = rangeLookup('some string');

ranges
//=> Array [ Range, Range, Range, Range ]

// Highlight ranges.
var selection = window.getSelection();
ranges.forEach(selection.addRange.bind(selection));
```

## API

### `rangeLookup(query)`

`query` — string to search for.

Returns array of matching ranges.

## Limitations

- This module is not capable of matching text that crosses text nodes boundaries.

## Install

```
npm install range-lookup
```

## License

MIT
