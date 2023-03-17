import { NumberBase } from './PatternAttribute'

export interface DigitObserver {
  observe: (digit: number) => void
}

export class ValueObserver implements DigitObserver {
  private baseNum: number = 10
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

  observe = (digit: number) => {
    this.digits.push(digit)
  }

  yield = () => {
    return this.digits.reduce(
      (sum, curr, index) =>
        sum + curr * Math.pow(this.baseNum, this.digits.length - index - 1),
      0,
    )
  }
}
