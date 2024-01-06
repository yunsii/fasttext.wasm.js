import fastTextModularized from '../../core/fastText.node'

import type { InitializeFastTextModuleOptions } from './types'

export async function initializeFastTextModule(
  options: InitializeFastTextModuleOptions = {},
) {
  const { wasmPath, ...rest } = options

  if (wasmPath) {
    return await fastTextModularized({
      // Binding js use the callback to locate wasm for now
      locateFile: (url, scriptDirectory) => {
        return typeof wasmPath === 'string'
          ? wasmPath
          : wasmPath(url, scriptDirectory)
      },
      ...rest,
    })
  }
  return await fastTextModularized(rest)
}
