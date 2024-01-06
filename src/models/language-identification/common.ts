import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

import { commonAssetsDir, commonAssetsModelsDir } from '@/constants'

export class LanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: BaseLanguageIdentificationModelOptions = {}) {
    super({
      wasmPath: `${commonAssetsDir}/fastText.common.wasm`,
      modelPath: `${commonAssetsModelsDir}/lid.176.ftz`,
      ...options,
    })
  }
}
