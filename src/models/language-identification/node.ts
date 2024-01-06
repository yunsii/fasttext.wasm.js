import { getFastTextModule } from '../../helpers/modules/node'

import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

export interface LanguageIdentificationModelOptions
  extends Omit<BaseLanguageIdentificationModelOptions, 'getFastTextModule'> {}

export class LanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: LanguageIdentificationModelOptions = {}) {
    const modeRelativePath = './assets/lid.176.ftz'
    const defaultModelHref = new URL(modeRelativePath, import.meta.url).href
    const { modelPath = defaultModelHref } = options

    super({ modelPath, getFastTextModule })
  }
}

export async function getLanguageIdentificationModel(
  options: LanguageIdentificationModelOptions = {},
) {
  return new LanguageIdentificationModel(options)
}

/** Alias of `getLanguageIdentificationModel` */
export const getLIDModel = getLanguageIdentificationModel
