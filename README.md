# fasttext.wasm.js

Node and Browser env supported WebAssembly version of fastText: Library for efficient text classification and representation learning.

[![NPM version](https://img.shields.io/npm/v/fasttext.wasm.js?color=a1b858&label=)](https://www.npmjs.com/package/fasttext.wasm.js) [![Download monthly](https://img.shields.io/npm/dm/fasttext.wasm.js.svg)](https://www.npmjs.com/package/fasttext.wasm.js)

WebAssembly version of [fastText](https://github.com/facebookresearch/fastText/) with compressed `lid.176.ftz` model (~900KB) and a typescript wrapper. This project focuses on cross-platform, zero-dependency and out-of-the-box.

## Features

- Written in **TypeScript**
- Supported **Node**, **Worker**, **Browser** and **Browser extension** runtime
- Integrated language identification

## Usage

In Node.js, you should use this approach [for binding js best performance](https://github.com/emscripten-core/emscripten/blob/5ffaadf56234ecf9b645df72e715c08322821553/src/settings.js#L1333).

```ts
import { getLIDModel } from 'fasttext.wasm.js'

const lidModel = await getLIDModel()
await lidModel.load()
const result = await lidModel.identify('Hello, world!')
console.log(result) // 'en'
```

In others environments, use like below:

```ts
import { getLIDModel } from 'fasttext.wasm.js'

const lidModel = await getLIDModel()
// Default paths:
// {
//   wasmPath: '/fastText/fasttext.common.wasm',
//   modelPath: '/fastText/models/lid.176.ftz',
// }
await lidModel.load()
const result = await lidModel.identify('Hello, world!')
console.log(result) // 'en'
```

**Do not forget** that download and place [`/fastText/fasttext.common.wasm`](./src/core/fastText.common.wasm) and [`/fastText/models/lid.176.ftz`](./src/models/language-identification/assets/lid.176.ftz) in public root directory. You can override the default paths if necessary.

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
- [Language identification resources](https://fasttext.cc/docs/en/language-identification.html)

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
