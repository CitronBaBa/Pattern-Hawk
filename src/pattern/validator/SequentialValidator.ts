import { ValidationError, SequenceValidator } from '../parsing/ParsingValidator'

/**
 * Validate consecutive digits are in an ascending sequence
 */
export class SequentialValidator implements SequenceValidator {
  private prev: number | undefined = undefined

  visitDigit = (digit: number) => {
    if (this.prev === undefined) {
      this.prev = digit
      return
    }
    if (digit - this.prev !== 1) {
      throw new ValidationError('Sequential', 'Input is not sequential')
    }
    this.prev = digit
  }
}
