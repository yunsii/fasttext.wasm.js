import path from 'node:path'

import fse from 'fs-extra'
import { mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import type { UserConfig } from 'vite'

import baseConfig from './vite.base.config'

const { peerDependencies = {}, dependencies = {} }
  = fse.readJsonSync('./package.json')

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
  plugins: [
    dts(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/core/*',
          dest: 'core',
        },
        {
          src: 'src/models/language-identification/assets/*',
          dest: 'models/language-identification/assets',
        },
      ],
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: [
        path.resolve(__dirname, 'src/main/node.ts'),
        path.resolve(__dirname, 'src/main/common.ts'),
      ],
    },
    rollupOptions: {
      // inspired from: https://github.com/vitejs/vite/discussions/1736#discussioncomment-2621441
      // preserveModulesRoot: https://rollupjs.org/guide/en/#outputpreservemodulesroot
      output: [
        {
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          format: 'es',
          dynamicImportInCjs: true,
        },
        {
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          format: 'cjs',
        },
      ],
      external: [
        ...regexpsOfPackages,
        /^node:.*$/,
        'url',
        'fs/promises',
        'http',
        /core\/fastText\..*\.js/,
      ],
    },
    target: 'esnext',
  },
} as UserConfig)
