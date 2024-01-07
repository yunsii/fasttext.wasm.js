import { fixRefNameMap, rawLanguageMap, refNameMap } from './raw-data'
import { getIsoCsv } from './helpers'

const isoCsv = getIsoCsv()

const result = Object.keys(rawLanguageMap).filter((item) => {
  return !isoCsv.data.some(
    (isoItem) => isoItem.Ref_Name === rawLanguageMap[item],
  )
})

const filteredResult = result
  .filter((item) => {
    return !refNameMap[item]
  })
  .filter((item) => {
    return !fixRefNameMap[item]
  })

if (filteredResult.length) {
  console.log(
    filteredResult
      .map((item) => {
        return `${item} - ${rawLanguageMap[item]}`
      })
      .join('\n'),
  )
  console.log('Some names need to extracted to fix.')
} else {
  console.log('No more names need to extracted to fix.')
}
