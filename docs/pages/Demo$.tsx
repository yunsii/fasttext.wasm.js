import React, { useState } from 'react'
import { useDebounceFn, useMount } from 'ahooks'

import { LanguageIdentificationModel } from '../../src/main/browser'
import { initializeFastTextModule } from '../../src/helpers/models/browser'

import type { DetectLang } from '../../src/tools/language-detect/types'

export default function Examples() {
  const [input, setInput] = useState('Hello, world.')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<
    | {
        lang: DetectLang
        possibility: number
      }[]
    | null
  >(null)

  const handleDetect = useDebounceFn(async () => {
    setLoading(true)
    await initializeFastTextModule()
    const model = new LanguageIdentificationModel({
      modelHref: '/models/lid.176.ftz',
    })
    await model.load()
    const result = await model.identifyVerbose(input)
    setResult(result)
    setLoading(false)
  })

  useMount(() => {
    handleDetect.run()
  })

  return (
    <div className='flex flex-col p-2 gap-2'>
      <textarea
        className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md px-2 py-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
        value={input}
        onChange={(event) => {
          setInput(event.target.value)
          handleDetect.run()
        }}
        rows={8}
      />
      <p className='px-2 py-2 font-semibold text-sm'>
        Lang: {loading ? 'loading...' : !result ? 'noop' : result[0].lang}
      </p>
      {result && (
        <ul className='px-2 font-mono'>
          {result.map((item, index) => {
            return (
              <li key={item.lang}>
                <span>{index}.</span> {item.lang} - {item.possibility}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
