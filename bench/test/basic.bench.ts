import { bench, describe } from 'vitest'
import LanguageDetect from 'languagedetect'
import { franc } from 'franc'

import { getLIDModel } from '../../dist/main/node'

import { getPaplucaLanguageIdentificationTestData } from './data'

const data = getPaplucaLanguageIdentificationTestData().slice(0, 500)

describe('basic', async () => {
  const lidModel = await getLIDModel()
  const lngDetector = new LanguageDetect()

  bench('fasttext.wasm.js', async () => {
    for (const item of data) {
      await lidModel.identify(item.text)
    }
  })

  bench('languagedetect', () => {
    data.map((item) => {
      const detectResult = lngDetector.detect(item.text)
      if (!detectResult.length) {
        return null
      }
      return detectResult[0][0]
    })
  })

  bench('franc', () => {
    data.map((item) => {
      const detectResult = franc(item.text)
      if (!detectResult.length) {
        return null
      }
      return detectResult
    })
  })
})
