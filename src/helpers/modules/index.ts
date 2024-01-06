import { IS_BROWSER, IS_WORKER } from '../../constants'

import type { InitializeFastTextModuleOptions } from './types'

let readFile: typeof import('node:fs/promises').readFile
let request: typeof import('node:http').request
let fileURLToPath: typeof import('node:url').fileURLToPath

export const buffer2Uin8Array = (buf: Buffer) =>
  new Uint8Array(buf.buffer, buf.byteOffset, buf.length)

export const fetchFile = async (url: string): Promise<Uint8Array> => {
  if (IS_BROWSER || IS_WORKER) {
    return new Uint8Array(await (await fetch(url)).arrayBuffer())
  }
  if (url.startsWith('file://')) {
    readFile ??= (await import('fs/promises')).readFile
    fileURLToPath ??= (await import('url')).fileURLToPath
    return buffer2Uin8Array(await readFile(fileURLToPath(url)))
  } else {
    request ??= (await import('http')).request
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      request(url, (res: any) =>
        res
          .on('close', () => resolve(buffer2Uin8Array(Buffer.concat(chunks))))
          .on('data', (chunk: any) => chunks.push(chunk as Buffer))
          .on('error', (err: Error) => reject(err)),
      )
    })
  }
}

export async function getFastTextModule(
  options: InitializeFastTextModuleOptions = {},
) {
  if (IS_BROWSER || IS_WORKER) {
    const { initializeFastTextModule } = await import('./common')
    return await initializeFastTextModule(options)
  }
  const { initializeFastTextModule } = await import('./node')
  return await initializeFastTextModule(options)
}
