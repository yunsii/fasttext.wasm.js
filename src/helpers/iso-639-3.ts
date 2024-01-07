import data from '../assets/iso-639-3.json'

export function getIso639_3Data(id: string): typeof data[0]
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
