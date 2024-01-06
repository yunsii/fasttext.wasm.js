import { $, fs, path } from 'zx'

console.log('build core start')

await $`xmake -P build`

const targetDir = path.join(process.cwd(), './src/core')
const dtsPath = getCorePath('fastText.d.ts')
const commonDtsPath = getCorePath('fastText.common.d.ts')
const nodeDtsPath = getCorePath('fastText.node.d.ts')

function getCorePath(...paths: string[]) {
  return path.join(targetDir, ...paths)
}

;[commonDtsPath, nodeDtsPath].forEach((item) => {
  if (
    fs.existsSync(item) &&
    fs.readFileSync(item, 'utf-8') === fs.readFileSync(dtsPath, 'utf-8')
  ) {
    return
  }
  fs.copyFileSync(dtsPath, item)
})

console.log('build core done')
