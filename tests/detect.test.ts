import { describe, expect, it } from 'vitest'

import { getLIDModel } from '../src/main/node'

import 'cross-fetch/polyfill'

// ref: https://github.dev/facebookresearch/fastText/blob/166ce2c71a497ff81cb62ec151be5b569e1f1be6/webassembly/doc/examples/predict.html
it('language predict', async () => {
  const lidModel = await getLIDModel()
  const fastTextModel = await lidModel.load()

  const tests = {
    'Bonjour à tous. Ceci est du français': '__label__fr',
    'Hello, world. This is english': '__label__en',
    'Merhaba dünya. Bu da türkçe': '__label__tr',
  }

  Object.keys(tests).forEach((item) => {
    const vector = fastTextModel.predict(item, 5, 0.0)
    expect(vector.get(0)[1]).equals(tests[item as keyof typeof tests])
  })
})

describe('language detect', async () => {
  const tests: Record<string, string> = {
    '你好, 世界！': 'zh',
    'Hello, world!': 'en',
    'Webassembly version of fastText': 'en',
    '乆乆乆, 一定是miHoYo干的': 'zh',
    '可爱い': 'ja',
    'В день уныния смирись': 'ru',
  }
  const lidModel = await getLIDModel()
  await lidModel.load()
  Object.keys(tests).forEach(async (item, index) => {
    it.concurrent(`language detect ${index}`, async () => {
      const lang = await lidModel.identify(item)
      expect(lang.alpha2).equals(tests[item as keyof typeof tests])
    })
  })
})
