import fastTextModularized from '../../core/fastText.common'

export interface InitializeFastTextModuleOptions
  extends Partial<Pick<EmscriptenModule, 'locateFile'>> {}

/**
 * If `document.currentScript.src` is falsy value, it will load `fasttext.common.wasm` from public root directly by default,
 *
 * You can download it from https://github.com/yunsii/fasttext.wasm.js/blob/master/src/core/fastText.common.wasm
 *
 * You can also use `locateFile` callback to custom `fasttext.common.wasm` full path.
 */
export async function initializeFastTextModule(
  options?: InitializeFastTextModuleOptions,
) {
  globalThis.fastTextModule ??= await fastTextModularized({
    locateFile: (url, scriptDirectory) => {
      return (scriptDirectory || '/') + url
    },
    ...options,
  })
  return globalThis.fastTextModule
}
