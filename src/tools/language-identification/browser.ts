import { LanguageIdentificationModel as NodeLanguageIdentificationModel } from './node'

import type { LanguageIdentificationModelOptions as NodeLanguageIdentificationModelOptions } from './node'

export type LanguageIdentificationModelOptions =
  Required<NodeLanguageIdentificationModelOptions>

export class LanguageIdentificationModel extends NodeLanguageIdentificationModel {
  constructor(options: LanguageIdentificationModelOptions) {
    super(options)
  }
}
