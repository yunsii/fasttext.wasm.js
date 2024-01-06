import type { BaseLanguageIdentificationModelOptions } from './base'

import { IS_BROWSER, IS_WORKER } from '@/constants'

export async function getLanguageIdentificationModel(
  options: BaseLanguageIdentificationModelOptions = {},
) {
  if (IS_BROWSER || IS_WORKER) {
    const { LanguageIdentificationModel } = await import('./common')
    return new LanguageIdentificationModel(options)
  }
  const { LanguageIdentificationModel } = await import('./node')
  return new LanguageIdentificationModel(options)
}

/** Alias of `getLanguageIdentificationModel` */
export const getLIDModel = getLanguageIdentificationModel
