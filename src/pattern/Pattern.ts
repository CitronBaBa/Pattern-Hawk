import { DigitObserver, ValueObserver } from './DigitObserver'
import { createValidators, DigitValidator } from './DigitValidator'
import PatternAttributeMap from './PatternAttribute'
import PatternSymbol, { DigitPatternSymbol } from './PatternSymbol'

/**
 * Use a standlone expression to define a pattern
 * examples: "XXX", "ABC", "ABC-DDDD°[min:0;max:360;base:decimal;charSet:NUM;]"
 */
export default class Pattern {
  static attributeRegex = /\[.*\]$/

  private expectedLength: number

  private symbols: PatternSymbol[]

  private attributeMap: PatternAttributeMap

  constructor(expression: string) {
    try {
      this.parseExpression(expression)
    } catch (e: unknown) {
      console.error(`Invalid Pattern expression: ${expression}`)
      throw e
    }
  }

  parseExpression = (expr: string) => {
    const result = Pattern.attributeRegex.exec(expr)
    if (!result) {
      this.attributeMap = new PatternAttributeMap()
      this.symbols = PatternSymbol.createFromExpr(
        expr,
        this.attributeMap.getDigitSet(),
      )
    } else {
      this.attributeMap = new PatternAttributeMap(expr.slice(result.index))
      this.symbols = PatternSymbol.createFromExpr(
        expr.slice(0, result.index),
        this.attributeMap.getDigitSet(),
      )
    }
    this.expectedLength = this.symbols.reduce(
      (sum, curr) => sum + curr.getStrLength(),
      0,
    )
  }

  public validate = (s: string): boolean => {
    const validators: DigitValidator[] = createValidators(this.attributeMap)

    const parseSuccess = this.parseInput(s, validators)
    if (!parseSuccess) return false
    if (validators.some((v) => !v.isValid())) return false
    return true
  }

  /**
   * Parse an input string, check whether it conforms to symbols
   * return false if parsing failed
   *
   * @param s
   * @param digitObservers observers can watch the digits as they get parsed
   * @returns
   */
  public parseInput = (
    s: string,
    digitObservers?: DigitObserver[],
  ): boolean => {
    if (s.length !== this.expectedLength) return false

    const symbolToDigitMap: Record<string, string> = {}
    const digitSet: Set<string> = new Set()
    for (
      let symbolIdx = 0, strIdx = 0;
      symbolIdx < this.symbols.length;
      symbolIdx++
    ) {
      const symbol = this.symbols[symbolIdx]
      const nextChar = s.slice(strIdx, strIdx + symbol.getStrLength())
      if (!symbol.isCompatibleChar(nextChar)) {
        return false
      }

      switch (symbol.getType()) {
        case 'static':
          break
        case 'digit':
          const digitSymbol = symbol as DigitPatternSymbol
          if (!digitSymbol.isWildCard()) {
            const targetChar = symbolToDigitMap[digitSymbol.getChar()]
            if (targetChar === undefined) {
              if (digitSet.has(nextChar)) return false
              digitSet.add(nextChar)
              symbolToDigitMap[digitSymbol.getChar()] = nextChar
            } else if (nextChar !== targetChar) {
              return false
            }
          }
          const value = digitSymbol.getValue(nextChar)
          if (value !== undefined) {
            digitObservers?.forEach((o) => o.observe(value))
          }
          break
      }

      strIdx += symbol.getStrLength()
    }

    return true
  }

  getLength = () => this.expectedLength
}
