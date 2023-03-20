import { ValidationError, ResultValidator } from '../parsing/ParsingValidator'

export class ValueValidator implements ResultValidator {
  min: number | undefined
  max: number | undefined

  constructor({ min, max }: { min?: number; max?: number }) {
    this.min = min
    this.max = max
  }

  validate = ({ numericValue: val }: { numericValue: number }) => {
    const valid =
      (this.min === undefined || val >= this.min) &&
      (this.max === undefined || val <= this.max)
    if (!valid) {
      throw new ValidationError(
        'MinMax',
        `Min max check failed, min: ${this.min}, max: ${this.max}, given value ${val} `,
      )
    }
  }
}
