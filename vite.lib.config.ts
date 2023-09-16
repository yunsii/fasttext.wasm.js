import path from 'node:path'

import fse from 'fs-extra'
import { mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'

import baseConfig from './vite.base.config'

import type { UserConfig } from 'vite'

const { peerDependencies = {}, dependencies = {} } =
  fse.readJsonSync('./package.json')

const externalPackages = Array.from(
  new Set([...Object.keys(peerDependencies), ...Object.keys(dependencies)]),
)

// Creating regexps of the packages to make sure subpaths of the
// packages are also treated as external
const regexpsOfPackages = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(/.*)?`),
)

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [dts()],
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // inspired from: https://github.com/vitejs/vite/discussions/1736#discussioncomment-2621441
      // preserveModulesRoot: https://rollupjs.org/guide/en/#outputpreservemodulesroot
      output: {
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].mjs',
      },
      external: [...regexpsOfPackages, /^node:.*$/],
    },
    target: 'esnext',
  },
} as UserConfig)
