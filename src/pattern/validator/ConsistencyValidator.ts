import PatternSymbol, { DigitPatternSymbol } from '../PatternSymbol'
import {
  PatternValidationError,
  SequenceValidator,
} from '../parsing/ParsingValidator'

/**
 *  Validate digit uniqueness based on 'ABCX' syntax
 * 'ABAB' => digits on 0,2 must be equal and digits on 1,3 must be equal
 * 'XX' => digits on 0,1 can be any digits
 *  */
export default class ConsistencyValidator implements SequenceValidator {
  symbolToDigitMap: Record<string, string> = {}
  digitSet: Set<string> = new Set()

  visit(nextChar: string, symbol: PatternSymbol) {
    if (symbol.getType() !== 'digit') return
    const digitSymbol = symbol as DigitPatternSymbol
    if (digitSymbol.isWildCard()) return

    const targetChar = this.symbolToDigitMap[digitSymbol.getChar()]
    if (targetChar === undefined) {
      if (this.digitSet.has(nextChar)) {
        throw new PatternValidationError(
          'Consistency',
          `'${nextChar}' digit already exits`,
        )
      }
      this.digitSet.add(nextChar)
      this.symbolToDigitMap[digitSymbol.getChar()] = nextChar
    } else if (nextChar !== targetChar) {
      throw new PatternValidationError(
        'Consistency',
        `'${nextChar}' digit is expected to be ${targetChar}`,
      )
    }
  }
}
