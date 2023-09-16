import { $, fs, path } from 'zx'

console.log('build core start')

await $`xmake -P build`

const targetDir = path.join(process.cwd(), './src/core')
const dtsPath = getCorePath('fastText.d.ts')
const browserDtsPath = getCorePath('fastText.browser.d.ts')
const nodeDtsPath = getCorePath('fastText.node.d.ts')

function getCorePath(...paths: string[]) {
  return path.join(targetDir, ...paths)
}
;[browserDtsPath, nodeDtsPath].forEach((item) => {
  if (fs.existsSync(item)) {
    return
  }
  fs.copyFileSync(dtsPath, item)
})

console.log('build core done')
