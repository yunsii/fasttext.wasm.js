import { fs, path } from 'zx'

import { getIsoCsv } from './helpers'
import {
  fixAlpha3CodeMap,
  fixRefNameMap,
  rawLanguageMap,
  refNameMap,
} from './raw-data'

const isoCsv = getIsoCsv()

const json = Object.keys(rawLanguageMap).reduce((previous, current) => {
  const targetIsoRecord = isoCsv.data.find((item) => {
    return (
      item.Ref_Name === fixRefNameMap[current] ||
      item.Ref_Name === rawLanguageMap[current] ||
      item.Ref_Name === refNameMap[current]
    )
  })

  return {
    ...previous,
    [current]: {
      alpha3Code: targetIsoRecord?.Id || fixAlpha3CodeMap[current] || current,
      refName: (targetIsoRecord?.Ref_Name ||
        refNameMap[current] ||
        rawLanguageMap[current]) as string,
    },
  }
}, {})

fs.writeJsonSync(
  path.join(
    process.cwd(),
    'src/models/language-identification/assets/languages.json',
  ),
  json,
  {
    spaces: 2,
  },
)
