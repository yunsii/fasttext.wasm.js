import { fileURLToPath } from 'url'

import { fs, path } from 'zx'
import Papa from 'papaparse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getIsoCsv() {
  const isoCsv = Papa.parse<{
    Id: string
    Part2B: string
    Part2T: string
    Part1: string
    Scope: string
    Language_Type: string
    Ref_Name: string
    Comment: string
  }>(fs.readFileSync(path.join(__dirname, 'iso-639-3_20230123.tab'), 'utf-8'), {
    header: true,
  })

  return isoCsv
}
