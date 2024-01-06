import { getFastTextModule } from '../../helpers/modules/common'

import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

import { commonAssetsDir, commonAssetsModelsDir } from '@/constants'

export interface LanguageIdentificationModelOptions
  extends Omit<BaseLanguageIdentificationModelOptions, 'getFastTextModule'> {}

export class LanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: LanguageIdentificationModelOptions = {}) {
    super({
      wasmPath: `${commonAssetsDir}/fastText.common.wasm`,
      modelPath: `${commonAssetsModelsDir}/lid.176.ftz`,
      ...options,
      getFastTextModule,
    })
  }
}

export async function getLanguageIdentificationModel(
  options: LanguageIdentificationModelOptions = {},
) {
  return new LanguageIdentificationModel(options)
}

/** Alias of `getLanguageIdentificationModel` */
export const getLIDModel = getLanguageIdentificationModel
