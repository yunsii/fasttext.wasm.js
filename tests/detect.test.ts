import { describe, expect, test } from 'vitest'

import 'cross-fetch/polyfill'

import {
  FastText,
  LanguageIdentifyModel,
  initializeFastTextModule,
} from '../src/main/node'

// ref: https://github.dev/facebookresearch/fastText/blob/166ce2c71a497ff81cb62ec151be5b569e1f1be6/webassembly/doc/examples/predict.html
test('language predict', async () => {
  await initializeFastTextModule()
  const fastText = new FastText()
  const modelHref = new URL('../src/models/lid.176.ftz', import.meta.url).href
  const model = await fastText.loadModel(modelHref)

  const tests = {
    'Bonjour à tous. Ceci est du français': '__label__fr',
    'Hello, world. This is english': '__label__en',
    'Merhaba dünya. Bu da türkçe': '__label__tr',
  }

  Object.keys(tests).forEach((item) => {
    const vector = model.predict(item, 5, 0.0)
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
  await initializeFastTextModule()
  const model = new LanguageIdentifyModel()
  await model.load()
  Object.keys(tests).forEach(async (item, index) => {
    test.concurrent(`language detect ${index}`, async () => {
      const lang = await model.identify(item)
      expect(lang).equals(tests[item as keyof typeof tests])
    })
  })
})
