import cld from 'cld'
import { eld } from 'eld'
import { franc } from 'franc'
import LanguageDetect from 'languagedetect'
import { bench, describe } from 'vitest'

// eslint-disable-next-line antfu/no-import-dist
import { getLIDModel } from '../../dist/main/node'
import { getPaplucaLanguageIdentificationTestData } from './data'

describe('papluca/language-identification/test', async () => {
  const paplucaLanguageIdentificationTestData
    = getPaplucaLanguageIdentificationTestData().slice(0, 500)
  const lidModel = await getLIDModel()
  const lngDetector = new LanguageDetect()

  bench('fasttext.wasm.js', async () => {
    for (const item of paplucaLanguageIdentificationTestData) {
      await lidModel.identify(item.text)
    }
  })

  bench('languagedetect', () => {
    paplucaLanguageIdentificationTestData.map((item) => {
      const detectResult = lngDetector.detect(item.text)
      if (!detectResult.length) {
        return null
      }
      return detectResult[0][0]
    })
  })

  bench('franc', () => {
    paplucaLanguageIdentificationTestData.map((item) => {
      const detectResult = franc(item.text)
      if (!detectResult.length) {
        return null
      }
      return detectResult
    })
  })

  bench('eld', () => {
    paplucaLanguageIdentificationTestData.map((item) => {
      const detectResult = eld.detect(item.text)
      if (!detectResult.language) {
        return null
      }
      return detectResult.language
    })
  })

  bench('cld', async () => {
    for (const item of paplucaLanguageIdentificationTestData) {
      try {
        await cld.detect(item.text)
      } catch (err) {
        // Failed to identify language
      }
    }
  })
})
