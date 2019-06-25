<h3 align="center">GistBox</h3>
<p align="center">📌📋 A helper class for updating a single-file Gist<p>
<p align="center"><a href="https://npmjs.com/package/gist-box"><img src="https://badgen.net/npm/v/gist-box" alt="NPM"></a> <a href="https://action-badges.now.sh"><img src="https://action-badges.now.sh/JasonEtco/gist-box" alt="Build Status"></a> <a href="https://codecov.io/gh/JasonEtco/gist-box/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/gist-box" alt="Codecov"></a></p>

## Usage

### Installation

```sh
$ npm install gist-box
```

```js
const { GistBox } = require('gist-box')
```

### API

```js
const box = new GistBox({ id, token })
await box.update({
  filename: 'example.md',
  description: 'A new description',
  content: 'The new content'
})
```

You can also import some boundary numbers to use when dealing with pinned Gists:

```js
const {
  MAX_LENGTH, // The number of characters rendered in one line
  MAX_LINES,  // The number of lines it will render
  MAX_HEIGHT, // The height of the box, in pixels
  MAX_WIDTH   // The width of the box, in pixels
} = require('gist-box')
```

---

Shoutout to [@matchai](https://github.com/matchai) for starting this trend with [bird-box](https://github.com/matchai/bird-box)!
