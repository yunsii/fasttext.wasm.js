## Language Code Normalize

- https://github.com/facebookresearch/fastText/issues/482
- https://github.com/facebookresearch/fastText/issues/1305
- https://en.wikipedia.org/wiki/List_of_Wikipedias

Data script for https://en.wikipedia.org/wiki/List_of_Wikipedias

```js
const langs = [
  'af',
  'als',
  'am',
  'an',
  'ar',
  'arz',
  'as',
  'ast',
  'av',
  'az',
  'azb',
  'ba',
  'bar',
  'bcl',
  'be',
  'bg',
  'bh',
  'bn',
  'bo',
  'bpy',
  'br',
  'bs',
  'bxr',
  'ca',
  'cbk',
  'ce',
  'ceb',
  'ckb',
  'co',
  'cs',
  'cv',
  'cy',
  'da',
  'de',
  'diq',
  'dsb',
  'dty',
  'dv',
  'el',
  'eml',
  'en',
  'eo',
  'es',
  'et',
  'eu',
  'fa',
  'fi',
  'fr',
  'frr',
  'fy',
  'ga',
  'gd',
  'gl',
  'gn',
  'gom',
  'gu',
  'gv',
  'he',
  'hi',
  'hif',
  'hr',
  'hsb',
  'ht',
  'hu',
  'hy',
  'ia',
  'id',
  'ie',
  'ilo',
  'io',
  'is',
  'it',
  'ja',
  'jbo',
  'jv',
  'ka',
  'kk',
  'km',
  'kn',
  'ko',
  'krc',
  'ku',
  'kv',
  'kw',
  'ky',
  'la',
  'lb',
  'lez',
  'li',
  'lmo',
  'lo',
  'lrc',
  'lt',
  'lv',
  'mai',
  'mg',
  'mhr',
  'min',
  'mk',
  'ml',
  'mn',
  'mr',
  'mrj',
  'ms',
  'mt',
  'mwl',
  'my',
  'myv',
  'mzn',
  'nah',
  'nap',
  'nds',
  'ne',
  'new',
  'nl',
  'nn',
  'no',
  'oc',
  'or',
  'os',
  'pa',
  'pam',
  'pfl',
  'pl',
  'pms',
  'pnb',
  'ps',
  'pt',
  'qu',
  'rm',
  'ro',
  'ru',
  'rue',
  'sa',
  'sah',
  'sc',
  'scn',
  'sco',
  'sd',
  'sh',
  'si',
  'sk',
  'sl',
  'so',
  'sq',
  'sr',
  'su',
  'sv',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'tk',
  'tl',
  'tr',
  'tt',
  'tyv',
  'ug',
  'uk',
  'ur',
  'uz',
  'vec',
  'vep',
  'vi',
  'vls',
  'vo',
  'wa',
  'war',
  'wuu',
  'xal',
  'xmf',
  'yi',
  'yo',
  'yue',
  'zh',
]

function normalizeLang(lang) {
  return lang.split('\n')[0].split('(')[0].trim()
}

function find(name) {
  return Array.from(document.querySelectorAll('td')).find((item) => {
    return normalizeLang(item.innerText) === name
  })
}

const result = langs.reduce((prev, current) => {
  const target = find(current)
  return {
    ...prev,
    [current]: target
      ? normalizeLang(target.previousSibling.previousSibling.innerText)
      : null,
  }
}, {})

console.log(result)
```

## ISO 639-3

- https://iso639-3.sil.org/code_tables/download_tables

```
CREATE TABLE [ISO_639-3] (
         Id      char(3) NOT NULL,  -- The three-letter 639-3 identifier
         Part2B  char(3) NULL,      -- Equivalent 639-2 identifier of the bibliographic applications
                                    -- code set, if there is one
         Part2T  char(3) NULL,      -- Equivalent 639-2 identifier of the terminology applications code
                                    -- set, if there is one
         Part1   char(2) NULL,      -- Equivalent 639-1 identifier, if there is one
         Scope   char(1) NOT NULL,  -- I(ndividual), M(acrolanguage), S(pecial)
         Type    char(1) NOT NULL,  -- A(ncient), C(onstructed),
                                    -- E(xtinct), H(istorical), L(iving), S(pecial)
         Ref_Name   varchar(150) NOT NULL,   -- Reference language name
         Comment    varchar(150) NULL)       -- Comment relating to one or more of the columns
```
