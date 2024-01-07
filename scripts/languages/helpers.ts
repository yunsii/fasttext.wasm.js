import { fileURLToPath } from 'url'

import { fs, path } from 'zx'
import Papa from 'papaparse'

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
  }>(fs.readFileSync(path.join(__dirname, 'iso-639-3_20230123.tab'), 'utf-8'), {
    header: true,
  })

  return isoCsv
}
