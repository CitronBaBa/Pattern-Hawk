import ConsistencyValidator from './validator/ConsistencyValidator'
import { IsSequentialValidator } from './validator/IsSequentialValidator'
import { ValueValidator } from './validator/ValueValidator'
import PatternAttributeMap from './PatternAttribute'
import PatternSymbol, { DigitPatternSymbol } from './PatternSymbol'
import {
  PatternValidationError,
  ResultValidator,
  SequenceValidator,
} from './parsing/ParsingValidator'
import { ParsingResultRecorder } from './parsing/ParsingResult'
import { ParsingVisitor } from './parsing/ParsingVisitor'
import { MMDDValidator } from './validator/custom/MMDDValidator'
import { TimesTableValidator } from './validator/custom/TimesTableValidator'

/**
 * Use a standlone expression to define a pattern
 * examples: "XXX", "ABC", "ABC-DDDD°[min:0;max:360;base:decimal;charSet:NUM;]"
 */
export default class Pattern {
  static attributeRegex = /\[.*\]$/

  private patternLength: number

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
    this.patternLength = this.symbols.reduce(
      (sum, curr) => sum + curr.getStrLength(),
      0,
    )
  }

  public validateInput = (s: string): boolean => {
    const { seqValidators, resultValidators } = this.createValidators()
    const resultRecorder = new ParsingResultRecorder(
      this.attributeMap.getBase(),
    )

    try {
      const traverseSuccess = this.parseInput(s, [
        ...seqValidators,
        resultRecorder,
      ])
      if (!traverseSuccess) return false
      const result = resultRecorder.yield()
      resultValidators.forEach((v) => v.validate(result))
    } catch (e) {
      if (typeof e === 'object') {
        const errObj = e as PatternValidationError
        if (errObj.type === 'patternValidation') {
          return false
        }
      }
      throw e
    }

    return true
  }

  /**
   * Parse an input string with symbols
   * return false if parsing failed
   *
   * @param s
   * @param visitors visitors can watch the digits/chars as they get parsed
   * @returns
   */
  private parseInput = (s: string, visitors?: ParsingVisitor[]): boolean => {
    if (s.length !== this.patternLength) return false

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

      visitors?.forEach((visitor) => visitor.visit?.(nextChar, symbol))

      if (symbol.getType() === 'static') {
        visitors?.forEach((visitor) => visitor.visitChar?.(nextChar))
      }

      if (symbol.getType() === 'digit') {
        const value = (symbol as DigitPatternSymbol).getValue(nextChar)
        if (value !== undefined) {
          visitors?.forEach((visitor) => visitor.visitDigit?.(value))
        }
      }

      strIdx += symbol.getStrLength()
    }

    return true
  }

  private createValidators = () => {
    const seqValidators: SequenceValidator[] = []
    const resultValidators: ResultValidator[] = []

    // Consistency
    seqValidators.push(new ConsistencyValidator())

    // min max
    const min = this.attributeMap.getMin()
    const max = this.attributeMap.getMax()
    if (min !== undefined || max !== undefined) {
      resultValidators.push(new ValueValidator({ min, max }))
    }

    // isSequential
    if (this.attributeMap.getIsSequential()) {
      seqValidators.push(new IsSequentialValidator())
    }

    // Custom rules
    if (this.attributeMap.get('_CUSTOM_MMDD') !== undefined) {
      resultValidators.push(new MMDDValidator())
    }
    if (this.attributeMap.get('_CUSTOM_TimesTable') !== undefined) {
      resultValidators.push(new TimesTableValidator())
    }

    return { seqValidators, resultValidators }
  }

  getLength = () => this.patternLength
}
