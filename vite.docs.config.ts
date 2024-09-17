import path from 'node:path'

import { mergeConfig } from 'vite'
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'

import type { UserConfig } from 'vite'

import baseConfig from './vite.base.config'

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [
    pages({
      pagesDir: path.join(__dirname, 'docs/pages'),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (pagesDir, helpers) => {
          const srcPath = path.join(__dirname, './src')
          // show all component demos
          helpers.watchFiles(
            srcPath,
            '**/demos/**/*.{[tj]sx,md?(x)}',
            async (file, api) => {
              const { relative, path: absolute } = file
              const match = relative.match(/(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/)
              if (!match) {
                throw new Error(`unexpected file: ${absolute}`)
              }
              const [, componentName, demoName] = match
              const pageId = `/${componentName}`
              // set page data
              const runtimeDataPaths = api.getRuntimeData(pageId)
              // the ?demo query will wrap the module with useful demoInfo
              runtimeDataPaths[demoName] = `${absolute}?demo`
            },
          )

          // find all component README
          helpers.watchFiles(srcPath, '**/README.md?(x)', async (file, api) => {
            const { relative, path: absolute } = file
            const match = relative.match(/(.*)\/README\.mdx?$/)
            if (!match) {
              throw new Error(`unexpected file: ${absolute}`)
            }
            const [, componentName] = match
            const pageId = `/${componentName}`
            // set page data
            const runtimeDataPaths = api.getRuntimeData(pageId)
            runtimeDataPaths.main = absolute
            // set page staticData
            const staticData = api.getStaticData(pageId)
            staticData.main = await helpers.extractStaticData(file)
          })
        },
      }),
    }),
  ],
  build: {
    outDir: 'dist-docs',
  },
} as UserConfig)
