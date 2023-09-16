import { LanguageIdentifyModel as NodeLanguageIdentifyModel } from './node'

import type { LanguageIdentifyModelOptions as NodeLanguageIdentifyModelOptions } from './node'

export type LanguageIdentifyModelOptions =
  Required<NodeLanguageIdentifyModelOptions>

export class LanguageIdentifyModel extends NodeLanguageIdentifyModel {
  constructor(options: LanguageIdentifyModelOptions) {
    super(options)
  }
}
