import { commonAssetsDir, commonAssetsModelsDir } from '@/constants'

import { getFastTextModule } from '../../helpers/modules/common'
import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

export interface LanguageIdentificationModelOptions
  extends Omit<BaseLanguageIdentificationModelOptions, 'getFastTextModule'> {}

export class LanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: LanguageIdentificationModelOptions = {}) {
    // Detect origin, in Next.js without origin prefix, it will prefix with <origin>/_next/static/chunks/<my-path>
    const origin
      = typeof globalThis.location !== 'undefined'
        ? globalThis.location.origin
        : ''

    super({
      wasmPath: `${origin}${commonAssetsDir}/fastText.common.wasm`,
      modelPath: `${origin}${commonAssetsModelsDir}/lid.176.ftz`,
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
