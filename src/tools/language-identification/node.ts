import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

export interface NodeLanguageIdentificationModelOptions
  extends Partial<BaseLanguageIdentificationModelOptions> {}

export class NodeLanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: NodeLanguageIdentificationModelOptions = {}) {
    const modeRelativePath = '../../models/lid.176.ftz'
    const defaultModelHref = new URL(modeRelativePath, import.meta.url).href
    const { modelHref = defaultModelHref } = options

    super({ modelHref })
  }
}
