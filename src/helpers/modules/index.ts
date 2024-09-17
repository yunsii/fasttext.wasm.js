import type { FastTextModule } from '@/core/fastText'

import { IS_BROWSER, IS_WORKER } from '../../constants'

import type { InitializeFastTextModuleOptions } from './types'

let readFile: typeof import('node:fs/promises').readFile
let request: typeof import('node:http').request
let fileURLToPath: typeof import('node:url').fileURLToPath

export function buffer2Uin8Array(buf: Buffer) {
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.length)
}

export async function fetchFile(url: string): Promise<Uint8Array> {
  if (IS_BROWSER || IS_WORKER) {
    return new Uint8Array(await (await fetch(url)).arrayBuffer())
  }
  if (url.startsWith('file://')) {
    readFile ??= (await import('node:fs/promises')).readFile
    fileURLToPath ??= (await import('node:url')).fileURLToPath
    return buffer2Uin8Array(await readFile(fileURLToPath(url)))
  } else {
    request ??= (await import('node:http')).request
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      request(url, (res: any) =>
        res
          .on('close', () => resolve(buffer2Uin8Array(Buffer.concat(chunks))))
          .on('data', (chunk: any) => chunks.push(chunk as Buffer))
          .on('error', (err: Error) => reject(err)))
    })
  }
}

export type GetFastTextModule = (
  options?: InitializeFastTextModuleOptions,
) => Promise<FastTextModule>

export type InternalGetFastTextModule = () => Promise<FastTextModule>
