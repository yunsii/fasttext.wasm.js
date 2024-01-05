import fastTextModularized from '../../core/fastText.common'

export interface InitializeFastTextModuleOptions
  extends Partial<Pick<EmscriptenModule, 'locateFile'>> {}

export async function initializeFastTextModule(
  options?: InitializeFastTextModuleOptions,
) {
  globalThis.fastTextModule ??= await fastTextModularized({
    locateFile: (url, scriptDirectory) => {
      return scriptDirectory + url
    },
    ...options,
  })
  return globalThis.fastTextModule
}
