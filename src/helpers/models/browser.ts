export async function initializeFastTextModule() {
  const fastTextModularized = (await import('../../core/fastText.browser'))
    .default
  globalThis.fastTextModule ??= await fastTextModularized()
  return globalThis.fastTextModule
}
