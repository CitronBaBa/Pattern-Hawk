import { ValidationError } from '../parsing/ParsingValidator'
import { SequentialValidator } from './SequentialValidator'

describe('Test SequentialValidator', () => {
  it('should reject non-sequential input', () => {
    const validator = new SequentialValidator()
    validator.visitDigit(0)
    expect(() => validator.visitDigit(2)).toThrow(ValidationError)
  })
  it('should reject descending input', () => {
    const validator = new SequentialValidator()
    validator.visitDigit(1)
    expect(() => validator.visitDigit(0)).toThrow(ValidationError)
  })
  it('should pass ascending input', () => {
    const validator = new SequentialValidator()
    validator.visitDigit(4)
    expect(() => validator.visitDigit(5)).not.toThrow()
  })
})
