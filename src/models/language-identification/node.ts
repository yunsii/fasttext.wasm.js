import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

export class LanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: BaseLanguageIdentificationModelOptions = {}) {
    const modeRelativePath = './assets/lid.176.ftz'
    const defaultModelHref = new URL(modeRelativePath, import.meta.url).href
    const { modelPath = defaultModelHref } = options

    super({ modelPath })
  }
}
