export { getFastTextClass } from '../FastText'
export { FastTextModel } from '../FastTextModel'
export { getFastTextModule } from '../helpers/modules/node'
export {
  getLanguageIdentificationModel,
  getLIDModel,
} from '../models/language-identification/node'

export type {
  IdentifyLangResult,
  IdentifyLangVector,
  RawIdentifyLang as IdentifyLang,
} from '../models/language-identification/types'
