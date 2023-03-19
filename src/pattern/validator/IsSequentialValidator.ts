import {
  PatternValidationError,
  SequenceValidator,
} from '../parsing/ParsingValidator'

/**
 * Validate consecutive digits are in an ascending sequence
 */
export class IsSequentialValidator implements SequenceValidator {
  private prev: number | undefined = undefined

  visitDigit = (digit: number) => {
    if (this.prev === undefined) {
      this.prev = digit
      return
    }
    if (digit - this.prev !== 1) {
      throw new PatternValidationError(
        'IsSequential',
        'Input is not sequential',
      )
    }
    this.prev = digit
  }
}
