export const trainFileInWasmFs = 'train.txt'
export const testFileInWasmFs = 'test.txt'
export const modelFileInWasmFs = 'model.bin'

export const IS_BROWSER =
  typeof window !== 'undefined' &&
  !!window.document &&
  !!window.document.createElement
