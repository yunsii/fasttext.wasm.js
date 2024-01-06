import { expect, test } from 'vitest'

import { getFastTextClass, getFastTextModule } from '../src/main/node'

const FastText = await getFastTextClass({
  getFastTextModule,
})
const fastText = new FastText()

test('file system', () => {
  const data = new Uint8Array([11, 45, 14, 19, 19, 81, 0])
  fastText.fs.writeFile('/test.bin', data)
  expect(fastText.fs.readFile('/test.bin')).toStrictEqual(data)
  fastText.fs.unlink('/test.bin')
})

test('memory alloc', () => {
  const ptr = fastText.core._malloc(64)
  fastText.core._free(ptr)
})
