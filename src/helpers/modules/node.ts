import type { InitializeFastTextModuleOptions } from './types'

export async function initializeFastTextModule(
  options: InitializeFastTextModuleOptions = {},
) {
  const { wasmPath, ...rest } = options

  // Dynamic import to avoid runtime resolve error
  const fastTextModularized = (await import('../../core/fastText.node')).default

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
