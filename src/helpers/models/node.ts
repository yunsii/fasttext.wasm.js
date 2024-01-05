import fastTextModularized from '../../core/fastText.node'

export async function initializeFastTextModule() {
  globalThis.fastTextModule ??= await fastTextModularized()
  return globalThis.fastTextModule
}
