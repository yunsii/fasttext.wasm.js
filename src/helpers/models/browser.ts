import fastTextModularized from '../../core/fastText.browser'

export async function initializeFastTextModule() {
  globalThis.fastTextModule ??= await fastTextModularized()
  return globalThis.fastTextModule
}
