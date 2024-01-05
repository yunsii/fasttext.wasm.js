import { FastText } from '../../FastText'

import languages from './languages.json'

import type { IdentifyLang, IdentifyLangVector } from './types'
import type { FastTextModel } from '../../FastTextModel'

export interface BaseLanguageIdentificationModelOptions {
  modelHref: string
}

export class BaseLanguageIdentificationModel {
  modelHref: string
  model: FastTextModel | null = null

  constructor(options: BaseLanguageIdentificationModelOptions) {
    const { modelHref } = options
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
    return BaseLanguageIdentificationModel.formatLang(vector.get(0)[1])
  }

  async identifyVerbose(text: string) {
    const vector = (await this.load()).predict(text, 10, 0.0)
    return Array.from({ length: vector.size() }).map((_, index) => {
      return {
        lang: BaseLanguageIdentificationModel.formatLang(vector.get(index)[1]),
        possibility: vector.get(index)[0],
      } as IdentifyLangVector
    })
  }

  /**
   * fastText [language identification model](https://fasttext.cc/docs/en/language-identification.html)
   * result is based on [List of Wikipedias](https://en.wikipedia.org/wiki/List_of_Wikipedias) `WP code`
   *
   * This lib provide a normalize method to transform `WP code` to ISO 639-3 as much as possible.
   *
   * More detail refer to [languages scripts](https://github.com/yunsii/fasttext.wasm.js/tree/master/scripts/languages).
   */
  normalizeIdentifyLang(lang: IdentifyLang): {
    /**
     * The three-letter 639-3 identifier.
     *
     * Attentions:
     *
     * - `eml` is not standard ISO 639-2 and ISO 639-3 code
     * - `bih` and `nah` are ISO 639-2 codes, but not standard ISO 639-3 codes
     */
    alpha3Code: string
    /** refName: manually normalize rawLanguage fit https://iso639-3.sil.org/code_tables/download_tables */
    refName: string
  } {
    return languages[lang]
  }
}
