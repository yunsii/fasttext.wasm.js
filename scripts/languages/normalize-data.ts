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
      item.Ref_Name
      && (item.Ref_Name === fixRefNameMap[current]
        || item.Ref_Name === rawLanguageMap[current]
        || item.Ref_Name === refNameMap[current])
    )
  })

  if (targetIsoRecord) {
    return {
      ...previous,
      [current]: {
        alpha3: targetIsoRecord.Id,
        alpha2: targetIsoRecord.Part1,
        refName: targetIsoRecord.Ref_Name,
      },
    }
  }

  // `eml` retired in ISO 639-3
  // `bih` and `nah` are ISO 639-2 codes, but not standard ISO 639-3 codes
  const alpha3 = fixAlpha3CodeMap[current] || current

  return {
    ...previous,
    [current]: {
      alpha3,
      alpha2: alpha3 === 'bih' ? 'bh' : null,
      refName: refNameMap[current] || rawLanguageMap[current],
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
