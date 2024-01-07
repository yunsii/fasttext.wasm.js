import React, { useState } from 'react'
import { useDebounceFn, useMount } from 'ahooks'

import { getLIDModel } from '../../src/main/common'

import type { IdentifyLangResult } from '../../src/main/common'

export default function Examples() {
  const [input, setInput] = useState('Hello, world.')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IdentifyLangResult[] | null>(null)

  const handleDetect = useDebounceFn(async () => {
    setLoading(true)
    const lidModel = await getLIDModel()
    await lidModel.load()
    const result = await lidModel.identify(input, 10)
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
        Lang:{' '}
        {loading
          ? 'loading...'
          : !result
          ? 'noop'
          : `${result[0].alpha3}/${result[0].alpha2}`}
      </p>
      {result && (
        <ul className='px-2 font-mono'>
          {result.map((item, index) => {
            return (
              <li key={item.alpha3}>
                <span>{index}.</span> {item.alpha3}/{item.alpha2} -{' '}
                {item.possibility}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
