import { DigitObserver, ValueObserver } from './DigitObserver'
import PatternAttributeMap, { NumberBase } from './PatternAttribute'

export interface DigitValidator extends DigitObserver {
  isValid: () => boolean
}

export const createValidators = (attributes: PatternAttributeMap) => {
  const validators: DigitValidator[] = []

  // min max
  const min = attributes.getMin()
  const max = attributes.getMax()
  if (min !== undefined && max !== undefined) {
    validators.push(
      new MinMaxValidator({ base: attributes.getBase(), min, max }),
    )
  }

  // isSequential
  if (attributes.getIsSequential()) {
    validators.push(new SequentialValidator())
  }

  return validators
}

export class MinMaxValidator extends ValueObserver implements DigitValidator {
  min: number
  max: number
  constructor({
    base,
    min,
    max,
  }: {
    base: NumberBase
    min: number
    max: number
  }) {
    super(base)
    this.min = min
    this.max = max
  }
  isValid: () => boolean = () => {
    const val = this.yield()
    return this.min <= val && val <= this.max
  }
}

export class SequentialValidator implements DigitValidator {
  private prev: number | undefined = undefined
  private isSequential: boolean = true

  observe = (digit: number) => {
    if (this.prev === undefined) {
      this.prev = digit
      return
    }
    if (digit - this.prev !== 1) {
      this.isSequential = false
    }
    this.prev = digit
  }

  isValid = () => this.isSequential
}
