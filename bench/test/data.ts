import pathe from 'pathe'
import papaparse from 'papaparse'
import { fs } from 'zx'

export function getPaplucaLanguageIdentificationTestData() {
  const paplucaLanguageIdentificationTestCSVPath = pathe.join(
    __dirname,
    '../data/papluca_language-identification/test.csv',
  )

  const result = papaparse.parse<[string, string]>(
    fs.readFileSync(paplucaLanguageIdentificationTestCSVPath, 'utf-8').trim(),
  )

  const data = result.data.map((item) => {
    return {
      lang: item[0],
      text: item[1],
    }
  })

  return data
}
