import { fileURLToPath } from 'url'

import { fs, path } from 'zx'
import Papa from 'papaparse'

import data from './iso-639-3.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getIsoCsv() {
  const isoCsv = Papa.parse<{
    /** The three-letter 639-3 identifier */
    Id: string
    /**
     * Equivalent 639-2 identifier of the bibliographic applications code set, if there is one
     *
     * The three-letter 639-3 identifier
     */
    Part2B: string | null
    /**
     * Equivalent 639-2 identifier of the terminology applications code set, if there is one
     *
     * The three-letter 639-3 identifier
     */
    Part2T: string | null
    /**
     * Equivalent 639-1 identifier, if there is one
     *
     * The two-letter 639-3 identifier
     */
    Part1: string | null
    /** I(ndividual), M(acrolanguage), S(pecial) */
    Scope: 'I' | 'M' | 'S'
    /** A(ncient), C(onstructed), E(xtinct), H(istorical), L(iving), S(pecial) */
    Language_Type: 'A' | 'C' | 'E' | 'H' | 'L' | 'S'
    Ref_Name: string
    Comment: string | null
  }>(
    fs.readFileSync(
      path.join(
        __dirname,
        './iso-639-3_Code_Tables_20231220/iso-639-3_20231220.tab',
      ),
      'utf-8',
    ),
    {
      header: true,
      transformHeader(header) {
        const result = header.replace(/ +/g, '_')

        if (result === 'Part2b') {
          return 'Part2B'
        }
        if (result === 'Part2t') {
          return 'Part2T'
        }
        return result
      },
      transform(value, field) {
        if (
          typeof field === 'string' &&
          ['Part2B', 'Part2T', 'Part1', 'Comment'].includes(field)
        ) {
          return value || null
        }
        return value
      },
    },
  )

  return isoCsv
}

export function getIso639_3Data(id: string): typeof data[0] | null
export function getIso639_3Data(): typeof data
export function getIso639_3Data(id?: string) {
  if (id) {
    return data.find((item) => item.Id === id) || null
  }

  return data
}

export function getIso639_3DataBy639_2Id(id: string) {
  return data.find((item) => item.Part2B === id || item.Part2T === id) || null
}

export function getIso639_3DataBy639_1Id(id: string) {
  return data.find((item) => item.Part1 === id) || null
}
