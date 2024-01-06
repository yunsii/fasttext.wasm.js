import type { InitializeFastTextModuleOptions } from './types'

/**
 * If `document.currentScript.src` is falsy value, it will load `fasttext.common.wasm` from public root directly by default,
 *
 * You can download it from https://github.com/yunsii/fasttext.wasm.js/blob/master/src/core/fastText.common.wasm
 *
 * You can also use `locateFile` callback to custom `fasttext.common.wasm` full path.
 */
export async function initializeFastTextModule(
  options: InitializeFastTextModuleOptions = {},
) {
  const { wasmPath, ...rest } = options

  // Dynamic import to avoid runtime resolve error
  const fastTextModularized = (await import('../../core/fastText.common'))
    .default

  return await fastTextModularized({
    // Binding js use the callback to locate wasm for now
    locateFile: (url, scriptDirectory) => {
      if (wasmPath) {
        return typeof wasmPath === 'string'
          ? wasmPath
          : wasmPath(url, scriptDirectory)
      }

      return (scriptDirectory || '/') + url
    },
    ...rest,
  })
}
