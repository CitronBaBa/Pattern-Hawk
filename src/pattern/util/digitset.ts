export type DigitSet =
  | 'standard' // 0-9
  | 'AR'
  | 'CN'
  | 'JP'
  | 'hex'
  | 'FlagEmojiSet0'

export const getDigitSetCharLength = (digitSet: DigitSet) => {
  switch (digitSet) {
    case 'FlagEmojiSet0':
      return 4
    default:
      return 1
  }
}

export const getDigitValue = (
  char: string,
  digitSet: DigitSet,
): number | undefined => {
  switch (digitSet) {
    case 'JP':
      return JapaneseDigitMap[char]
    case 'AR':
      return ArabicDigitMap[char]
    case 'CN':
      return ChineseDigitMap[char]
    case 'FlagEmojiSet0':
      // TODO handle emoji char 🇺🇸
      throw Error('not implemented yet')
    case 'standard':
      if (/^[0-9]$/.test(char)) return parseInt(char)
      return undefined
    default:
      throw Error('Unsupported digit set')
  }
}

export const ChineseDigitMap = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
}

export const JapaneseDigitMap = {
  零: 0,
  壱: 1,
  弐: 2,
  参: 3,
  肆: 4,
  伍: 5,
  陸: 6,
  漆: 7,
  捌: 8,
  玖: 9,
}

export const ArabicDigitMap = {
  '٠': 0,
  '١': 1,
  '٢': 2,
  '٣': 3,
  '٤': 4,
  '٥': 5,
  '٦': 6,
  '٧': 7,
  '٨': 8,
  '٩': 9,
}
