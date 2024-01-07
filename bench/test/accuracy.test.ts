/* eslint-disable no-console */
import { describe, test } from 'vitest'
import LanguageDetect from 'languagedetect'
import { franc } from 'franc'
import pLimit from 'p-limit'
import papaparse from 'papaparse'
import { fs } from 'zx'
import path from 'pathe'

import { getLIDModel } from '../../src/main/node'
import { getIso639_3DataBy639_1Id } from '../../src/helpers/iso-639-3'

import { getPaplucaLanguageIdentificationTestData } from './data'

const data = getPaplucaLanguageIdentificationTestData()

interface BasicResultItem {
  lang: string
  langIso639_3?: string | null
  fastText?: string | null
  languageDetect?: string | null
  franc?: string | null
  text: string
}

describe('basic', async () => {
  const lidModel = await getLIDModel()
  const lngDetector = new LanguageDetect()
  lngDetector.setLanguageType('iso3')

  const limit = pLimit(200)
  const input: Promise<BasicResultItem>[] = []

  data.forEach((item) => {
    input.push(
      limit(async () => {
        const fastTextIdentified = await lidModel.identify(item.text)
        const languageDetectIdentified = lngDetector.detect(item.text)
        const francIdentified = franc(item.text)

        return {
          lang: item.lang,
          langIso639_3: getIso639_3DataBy639_1Id(item.lang)?.Id || null,
          fastText:
            lidModel.normalizeIdentifyLang(fastTextIdentified).alpha3Code,
          languageDetect: languageDetectIdentified.length
            ? languageDetectIdentified[0][0]
            : null,
          franc: francIdentified.length ? francIdentified : null,
          text: item.text,
        }
      }),
    )
  })
  const result = await Promise.all(input)

  fs.writeFile(
    path.join(__dirname, 'fixtures/accuracy.csv'),
    papaparse.unparse(result),
    'utf-8',
  )

  const errStat = {
    fastText: 0,
    languageDetect: 0,
    franc: 0,
  }

  result.forEach((item) => {
    Object.keys(errStat).forEach((libName) => {
      if (item[libName] !== item.langIso639_3) {
        errStat[libName] += 1
      }
    })
  })

  console.table(
    Object.keys(errStat).map((item) => {
      return {
        'Name': item,
        'Error Rate': (errStat[item] / data.length).toFixed(2),
        'Accuracy': ((data.length - errStat[item]) / data.length).toFixed(2),
        'Total': data.length,
      }
    }),
  )

  test.todo('Todo')
})
