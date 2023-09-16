# fasttext.wasm.js

[![NPM version](https://img.shields.io/npm/v/fasttext.wasm.js?color=a1b858&label=)](https://www.npmjs.com/package/fasttext.wasm.js)

WebAssembly version of [fastText](https://github.com/facebookresearch/fastText/) with compressed `lid.176.ftz` model (~900KB) and a typescript wrapper This project focuses on cross-platform, zero-dependency and out-of-the-box.

## Usage

```ts
// node
import {
  LanguageIdentifyModel,
  initializeFastTextModule,
} from 'fasttext.wasm.js'

await initializeFastTextModule()
// Use lid.176.ftz as default model
const model = new LanguageIdentifyModel()
await model.load()
const result = model.identify('Hello, world!')
console.log(result) // 'en'
```

```ts
// browser
import {
  LanguageIdentifyModel,
  initializeFastTextModule,
} from 'fasttext.wasm.js/browser'

await initializeFastTextModule()
const model = new LanguageIdentifyModel({
  // Specific model path under public dir,
  // You can download it from https://fasttext.cc/docs/en/language-identification.html
  modelHref: '/models/lid.176.ftz',
})
await model.load()
const result = model.identify('Hello, world!')
console.log(result) // 'en'
```

## Credits

- [DreamOfIce/fastText.wasm](https://github.com/DreamOfIce/fastText.wasm)
- [facebookresearch/fastText/webassembly](https://github.com/facebookresearch/fastText/tree/main/webassembly)

## References

- [Language identification](https://fasttext.cc/blog/2017/10/02/blog-post.html)

## Build & Publish

- `npm run build`
- `npx changeset`
- `npx changeset version`
- `git commit`
- `npx changeset publish`
- `git push --follow-tags`

> [`changeset` prerelease doc](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

## License

[MIT](./LICENSE) License © 2023 [Yuns](https://github.com/yunsii)
