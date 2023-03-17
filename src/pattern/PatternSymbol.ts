import {
  DigitSet,
  getDigitSetCharLength,
  getDigitValue,
} from '../util/digitset'

/**
 * use letter A-G to represents unique digits, use X as wildcards
   others as static non-digit string
   can be expanded to include more or escape these letters 
 */
const digitSymbolRegex = /^[A-G,X]$/
const digitSymbolWildcard = 'X'
export type SymbolType = 'digit' | 'static'

export default class PatternSymbol {
  protected char: string

  /**
   *  Static characters that are beyond the Unicode BMP like '🧑‍🤝‍🧑'
   *  will be stored as multiple static symbols
   * */
  static createFromExpr = (expr: string, digitSet: DigitSet) => {
    return [...expr].map((char) => {
      if (digitSymbolRegex.test(char)) {
        return new DigitPatternSymbol({ char, digitSet })
      } else {
        return new PatternSymbol({ char })
      }
    })
  }

  constructor({ char }: { char: string }) {
    this.char = char
  }

  isCompatibleChar = (char: string) => char === this.char

  getChar = () => this.char
  getType = (): SymbolType => 'static'
  getStrLength = () => this.char.length
}

export class DigitPatternSymbol extends PatternSymbol {
  digitSet: DigitSet
  constructor({ char, digitSet }: { char: string; digitSet: DigitSet }) {
    super({ char })
    this.digitSet = digitSet
  }

  isCompatibleChar = (char: string) => {
    return this.getValue(char) !== undefined
  }

  getType = (): SymbolType => 'digit'
  isWildCard = () => this.char === digitSymbolWildcard
  getStrLength = () => getDigitSetCharLength(this.digitSet)
  getValue = (char: string): number | undefined =>
    getDigitValue(char, this.digitSet)
}
