import { NumberBase } from '../PatternAttribute'
import { ParsingVisitor } from './ParsingVisitor'

export type ParsingResult = {
  numericValue: number
  digits: number[]
}

export class ParsingResultRecorder implements ParsingVisitor {
  private baseNum = 10
  private digits: number[] = []

  constructor(base: NumberBase) {
    switch (base) {
      case 'decimal':
        this.baseNum = 10
        break
      case 'hex':
        this.baseNum = 16
        break
    }
  }

  visitDigit = (digit: number) => {
    this.digits.push(digit)
  }

  yield = (): ParsingResult => {
    const numericValue = this.digits.reduce(
      (sum, curr, index) =>
        sum + curr * Math.pow(this.baseNum, this.digits.length - index - 1),
      0,
    )
    return {
      numericValue,
      digits: this.digits,
    }
  }
}
