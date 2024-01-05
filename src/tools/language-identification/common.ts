import { BaseLanguageIdentificationModel } from './base'

import type { BaseLanguageIdentificationModelOptions } from './base'

export interface CommonLanguageIdentificationModelOptions
  extends BaseLanguageIdentificationModelOptions {}

export class CommonLanguageIdentificationModel extends BaseLanguageIdentificationModel {
  constructor(options: CommonLanguageIdentificationModelOptions) {
    super(options)
  }
}
