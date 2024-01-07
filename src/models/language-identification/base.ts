import { getFastTextClass } from '../../FastText'

import languages from './assets/languages.json'

import type { IdentifyLangResult, RawIdentifyLang } from './types'
import type { FastTextModel } from '../../FastTextModel'
import type { InitializeFastTextModuleOptions } from '@/helpers/modules/types'
import type { GetFastTextModule } from '@/helpers/modules'

const LANGUAGES_LIMIT = Object.keys(languages).length

export interface BaseLanguageIdentificationModelOptions
  extends InitializeFastTextModuleOptions {
  getFastTextModule: GetFastTextModule
  modelPath?: string
}

export class BaseLanguageIdentificationModel {
  getFastTextModule: GetFastTextModule
  wasmPath: InitializeFastTextModuleOptions['wasmPath']
  modelPath: string
  model: FastTextModel | null = null

  static formatLang(raw: string) {
    const identifyLang = raw.replace('__label__', '') as RawIdentifyLang
    return BaseLanguageIdentificationModel.normalizeIdentifyLang(identifyLang)
  }

  /**
   * fastText [language identification model](https://fasttext.cc/docs/en/language-identification.html)
   * result is based on [List of Wikipedias](https://en.wikipedia.org/wiki/List_of_Wikipedias) `WP code`
   *
   * This lib provide a normalize method to transform `WP code` to ISO 639-3 as much as possible.
   *
   * More detail refer to [languages scripts](https://github.com/yunsii/fasttext.wasm.js/tree/master/scripts/languages).
   *
   * Notice: ISO 639 provides two and three-character codes for representing names of languages. ISO 3166 provides two and three-character codes for representing names of countries.
   */
  static normalizeIdentifyLang(lang: RawIdentifyLang): {
    /**
     * The three-letter 639-3 identifier.
     *
     * Attentions:
     *
     * - `eml` is retired in ISO 639-3
     * - `bih` and `nah` are ISO 639-2 codes, but not standard ISO 639-3 codes
     */
    alpha3: string
    alpha2: string | null
    /** refName: manually normalize rawLanguage fit https://iso639-3.sil.org/code_tables/download_tables */
    refName: string
  } {
    return languages[lang]
  }

  constructor(options: BaseLanguageIdentificationModelOptions) {
    const { getFastTextModule, wasmPath, modelPath } = options

    if (!modelPath) {
      throw new Error('No model path provided.')
    }

    this.getFastTextModule = getFastTextModule
    this.wasmPath = wasmPath
    this.modelPath = modelPath
  }

  /**
   * Use `lid.176.ftz` as default model
   */
  async load() {
    if (!this.model) {
      const FastText = await getFastTextClass({
        getFastTextModule: () => {
          return this.getFastTextModule({
            wasmPath: this.wasmPath,
          })
        },
      })
      const fastText = new FastText()
      const modelHref = this.modelPath
      this.model = await fastText.loadModel(modelHref)
    }
    return this.model
  }

  /** Return the top possibility language */
  async identify(text: string, top: number): Promise<IdentifyLangResult[]>
  /** Return the max possibility language */
  async identify(text: string): Promise<IdentifyLangResult>
  async identify(text: string, top?: number) {
    const minTop = Math.max(top || 1, 1)
    const limitTop = Math.min(LANGUAGES_LIMIT, minTop)

    const vector = (await this.load()).predict(text, limitTop, 0.0)

    if (typeof top === 'undefined') {
      return {
        ...BaseLanguageIdentificationModel.formatLang(vector.get(0)[1]),
        possibility: vector.get(0)[0],
      }
    }

    return Array.from({ length: vector.size() }).map((_, index) => {
      return {
        ...BaseLanguageIdentificationModel.formatLang(vector.get(index)[1]),
        possibility: vector.get(index)[0],
      }
    })
  }
}
