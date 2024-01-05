# fasttext.wasm.js

Node and Browser env supported WebAssembly version of fastText: Library for efficient text classification and representation learning.

[![NPM version](https://img.shields.io/npm/v/fasttext.wasm.js?color=a1b858&label=)](https://www.npmjs.com/package/fasttext.wasm.js) [![Download monthly](https://img.shields.io/npm/dm/fasttext.wasm.js.svg)](https://www.npmjs.com/package/fasttext.wasm.js)

WebAssembly version of [fastText](https://github.com/facebookresearch/fastText/) with compressed `lid.176.ftz` model (~900KB) and a typescript wrapper. This project focuses on cross-platform, zero-dependency and out-of-the-box.

## Features

- Written in **TypeScript**
- **Node**, **Browser** and **Browser extension** support
- Language identification integrated

## Usage

```ts
// Node
import {
  LanguageIdentificationModel,
  initializeFastTextModule,
} from 'fasttext.wasm.js'

await initializeFastTextModule()
// Use lid.176.ftz as default model
const model = new LanguageIdentificationModel()
await model.load()
const result = await model.identify('Hello, world!')
console.log(result) // 'en'
```

```ts
// Others
import {
  LanguageIdentificationModel,
  initializeFastTextModule,
} from 'fasttext.wasm.js/common'

// It will load fasttext.common.wasm from public root directly by default,
// You can download it from https://github.com/yunsii/fasttext.wasm.js/blob/master/src/core/fastText.common.wasm
// You can also use `locateFile` callback to custom fasttext.common.wasm full path.
await initializeFastTextModule()
const model = new LanguageIdentificationModel({
  // Specific model path under public directory,
  // You can download it from https://fasttext.cc/docs/en/language-identification.html
  modelHref: '/models/lid.176.ftz',
})
await model.load()
const result = await model.identify('Hello, world!')
console.log(result) // 'en'
```

## Benchmark

> [codesandbox/language-detect-benchmark](https://codesandbox.io/p/sandbox/language-detect-benchmark-7fcwf4?file=/index.ts)

- **10x Faster** and **very more accurate** than [languagedetect](https://github.com/FGRibreau/node-language-detect)
- **~3x Faster** and **more accurate** than [franc](https://github.com/wooorm/franc)

## Related

- [awesome-exhibition/fasttext.wasm.js](https://awesome-exhibition.vercel.app/awesome/fasttext.wasm.js) - Next.js example.
- [yunsii/browser-extension-with-fasttext.wasm.js](https://github.com/yunsii/browser-extension-with-fasttext.wasm.js) - Use fasttext.wasm.js in browser extension.

## Credits

- [DreamOfIce/fastText.wasm](https://github.com/DreamOfIce/fastText.wasm)
- [facebookresearch/fastText/webassembly](https://github.com/facebookresearch/fastText/tree/main/webassembly)

## References

- [Language identification](https://fasttext.cc/blog/2017/10/02/blog-post.html)

## Build & Publish

### Requirements

- [emsdk](https://emscripten.org/docs/getting_started/downloads.html#installation-instructions-using-the-emsdk-recommended)
- [xmake](https://xmake.io/#/guide/installation)

Pay attention, add `source ./emsdk_env.sh` to shell profile to auto load emsdk env, and `export EMSDK_QUIET=1` can be used to suppress these messages.

- `npm run build`
- `npx changeset`
- `npx changeset version`
- `git commit`
- `npx changeset publish`
- `git push --follow-tags`

> [`changeset` prerelease doc](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

## License

[MIT](./LICENSE) License © 2023 [Yuns](https://github.com/yunsii)
