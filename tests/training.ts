/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import * as ft from '../src/main/node'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const ft2 = new (await ft.getFastTextClass({ getFastTextModule: ft.getFastTextModule }))()

const trainingDataURI = URL.createObjectURL(
  new Blob([
    fs.readFileSync(path.join(__dirname, './fixtures/skipgram-data.txt')),
  ], { type: 'text/plain' }),
)

const model = await ft2.trainUnsupervised(trainingDataURI, 'skipgram', {
  lr: 0.1,
  epoch: 1,
  loss: 'ns',
  wordNgrams: 2,
  dim: 50,
  bucket: 200000,
}, (...args) => {
  console.log('args', ...args)
})

console.log('before getWordVector')
const result = model.getWordVector('deploy')
console.log('🚀 ~ file: training.ts:26 ~ result:', result)
