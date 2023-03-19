import PatternSymbol from '../PatternSymbol'

export interface ParsingVisitor {
  visit?: (char: string, symbol: PatternSymbol) => void
  visitDigit?: (digit: number) => void
  visitChar?: (char: string) => void
}
