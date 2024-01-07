import { fs, path } from 'zx'

import { getIsoCsv } from './helpers'

const isoCsv = getIsoCsv()

fs.writeJsonSync(
  path.join(process.cwd(), 'src/assets/iso-639-3.json'),
  isoCsv.data,
  {
    spaces: 2,
  },
)
