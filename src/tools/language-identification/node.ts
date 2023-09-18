import { FastText } from '../../FastText'

import languages from './languages.json'

import type { IdentifyLang, IdentifyLangVector } from './types'
import type { FastTextModel } from '../../FastTextModel'

const modeRelativePath = '../../models/lid.176.ftz'
const defaultModelHref = new URL(modeRelativePath, import.meta.url).href

export interface LanguageIdentificationModelOptions {
  modelHref?: string
}

export class LanguageIdentificationModel {
  modelHref: string
  model: FastTextModel | null = null

  constructor(options: LanguageIdentificationModelOptions = {}) {
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
    return raw.replace('__label__', '') as IdentifyLang
  }

  async identify(text: string) {
    const vector = (await this.load()).predict(text, 1, 0.0)
    return LanguageIdentificationModel.formatLang(vector.get(0)[1])
  }

  async identifyVerbose(text: string) {
    const vector = (await this.load()).predict(text, 10, 0.0)
    return Array.from({ length: vector.size() }).map((_, index) => {
      return {
        lang: LanguageIdentificationModel.formatLang(vector.get(index)[1]),
        possibility: vector.get(index)[0],
      } as IdentifyLangVector
    })
  }

  normalizeIdentifyLang(lang: IdentifyLang): {
    /**
     * Attentions:
     *
     * - `eml` is not standard ISO 639.2 and ISO 639.3 code
     * - `bih` and `nah` are not standard ISO 639.3 code
     */
    alpha3Code: string
    /** refName: manually normalize rawLanguage fit https://iso639-3.sil.org/code_tables/download_tables */
    refName: string
  } {
    return languages[lang]
  }
}
