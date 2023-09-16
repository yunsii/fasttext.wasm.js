import { FastText } from '../../FastText'

import type { DetectLang } from './types'
import type { FastTextModel } from '../../FastTextModel'

const modeRelativePath = '../../models/lid.176.ftz'
const defaultModelHref = new URL(modeRelativePath, import.meta.url).href

export interface LanguageIdentifyModelOptions {
  modelHref?: string
}

export class LanguageIdentifyModel {
  modelHref: string
  model: FastTextModel | null = null

  constructor(options: LanguageIdentifyModelOptions = {}) {
    const { modelHref = defaultModelHref } = options
    this.modelHref = modelHref
  }

  async load() {
    if (!this.model) {
      const fastText = new FastText()
      const modelHref = this.modelHref
      this.model = await fastText.loadModel(modelHref)
    }
    return this.model
  }

  static formatLang(raw: string) {
    return raw.replace('__label__', '') as DetectLang
  }

  async identify(text: string) {
    const vector = (await this.load()).predict(text, 1, 0.0)
    return LanguageIdentifyModel.formatLang(vector.get(0)[1])
  }

  async identifyVerbose(text: string) {
    const vector = (await this.load()).predict(text, 10, 0.0)
    return Array.from({ length: vector.size() }).map((_, index) => {
      return {
        lang: LanguageIdentifyModel.formatLang(vector.get(index)[1]),
        possibility: vector.get(index)[0],
      }
    })
  }
}
