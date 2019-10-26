# format-fuse.js

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]
[![Coverage][codecov-shield]][codecov]

> Utility to format matching [fuse.js](https://github.com/krisk/fuse) results for easier text highlighting.

## Install

```bash
yarn add format-fuse.js
```

## Usage

The utility expects fuse.js search results as an array and outputs matching text based on matching indices.

```js
import format from 'format-fuse.js';

const results = format([
  {
    item: {
      title: 'Monster 1959',
      author: { firstName: 'David', lastName: 'Maine' }
    },
    matches: [
      {
        indices: [[1, 2]],
        value: 'Monster 1959',
        key: 'title',
        arrayIndex: 0
      }
    ]
  }
]);

console.log(results);
/**
 * [
    {
      author: { firstName: 'David', lastName: 'Maine' },
      title: [
        { matches: false, text: 'M' },
        { matches: true, text: 'on' },
        { matches: false, text: 'ster 1959' }
      ]
    }
  ]
 */
```

Matching and unmatching text become easier to iterate through.

### Example

```jsx
import * as React from 'react';

export function Highlighter(results) {
  return (
    <div>
      {results.map(({ title }) => {
        if (Array.isArray(title)) {
          return title.map(({ matches, text }) => {
            return matches ? <mark>{text}</mark> : text;
          });
        }

        return title;
      })}
    </div>
  );
}
```

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/format-fuse.js.svg?color=blue
[npm-url]: https://npmjs.com/package/format-fuse.js
[build]: https://travis-ci.com/metonym/format-fuse.js.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/format-fuse.js
[codecov]: https://codecov.io/gh/metonym/format-fuse.js
[codecov-shield]: https://img.shields.io/codecov/c/github/metonym/format-fuse.js.svg
