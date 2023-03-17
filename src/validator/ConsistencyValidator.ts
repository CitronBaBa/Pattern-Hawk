import PatternSymbol, { DigitPatternSymbol } from '../pattern/PatternSymbol'
import {
  PatternValidationError,
  SequenceValidator,
} from '../pattern/PatternValidator'

export default class ConsistencyValidator implements SequenceValidator {
  symbolToDigitMap: Record<string, string> = {}
  digitSet: Set<string> = new Set()

  visit(nextChar: string, symbol: PatternSymbol) {
    if (!symbol.isCompatibleChar(nextChar)) {
      throw new PatternValidationError('Consistency', '')
    }

    if (symbol.getType() !== 'digit') return
    const digitSymbol = symbol as DigitPatternSymbol
    if (digitSymbol.isWildCard()) return

    const targetChar = this.symbolToDigitMap[digitSymbol.getChar()]
    if (targetChar === undefined) {
      if (this.digitSet.has(nextChar)) {
        throw new PatternValidationError('Consistency', '')
      }
      this.digitSet.add(nextChar)
      this.symbolToDigitMap[digitSymbol.getChar()] = nextChar
    } else if (nextChar !== targetChar) {
      throw new PatternValidationError('Consistency', '')
    }
  }
}
