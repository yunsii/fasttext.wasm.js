export async function initializeFastTextModule() {
  const fastTextModularized = (await import('../../core/fastText.node')).default
  globalThis.fastTextModule ??= await fastTextModularized()
  return globalThis.fastTextModule
}
