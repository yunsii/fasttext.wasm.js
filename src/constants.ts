export const commonAssetsDir = '/fastText'
export const commonAssetsModelsDir = '/fastText/models'

export const trainFileInWasmFs = 'train.txt'
export const testFileInWasmFs = 'test.txt'
export const modelFileInWasmFs = 'model.bin'

export const IS_BROWSER
  = typeof window !== 'undefined'
  && !!window.document
  && !!window.document.createElement

export const IS_WORKER
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  = 'importScripts' in globalThis && typeof globalThis.importScripts == 'function'
