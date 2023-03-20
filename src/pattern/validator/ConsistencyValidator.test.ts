import { ValidationError } from '../parsing/ParsingValidator'
import PatternSymbol, { DigitPatternSymbol } from '../PatternSymbol'
import ConsistencyValidator from './ConsistencyValidator'

describe('Test ConsistencyValidator', () => {
  it('should reject duplicated digits', () => {
    const validator = new ConsistencyValidator()
    letHimVisitDigit(validator, '1', 'A')
    expect(() => letHimVisitDigit(validator, '2', 'A')).toThrow(ValidationError)
  })

  it('should reject duplicated digits 2', () => {
    const validator = new ConsistencyValidator()
    letHimVisitDigit(validator, '1', 'A')
    expect(() => letHimVisitDigit(validator, '1', 'B')).toThrow(ValidationError)
  })

  it('should reject duplicated digits 3', () => {
    const validator = new ConsistencyValidator()
    letHimVisitDigit(validator, '1', 'A')
    letHimVisitDigit(validator, '2', 'B')
    expect(() => letHimVisitDigit(validator, '3', 'B')).toThrow(ValidationError)
  })

  it('should not reject wildcard symbol', () => {
    const validator = new ConsistencyValidator()
    letHimVisitDigit(validator, '1', 'A')
    letHimVisitDigit(validator, '1', 'A')
    expect(() => letHimVisitDigit(validator, '1', 'X')).not.toThrow()
  })

  it('should not reject static symbol', () => {
    const validator = new ConsistencyValidator()
    letHimVisitDigit(validator, '1', 'A')
    expect(() => letHimVisitStatic(validator, '1', '1')).not.toThrow()
  })
})

// convenient function
const letHimVisitDigit = (
  validator: ConsistencyValidator,
  inputChar: string,
  symbolChar: string,
) => {
  validator.visit(
    inputChar,
    new DigitPatternSymbol({ char: symbolChar, digitSet: 'standard' }),
  )
}

const letHimVisitStatic = (
  validator: ConsistencyValidator,
  inputChar: string,
  symbolChar: string,
) => {
  validator.visit(inputChar, new PatternSymbol({ char: symbolChar }))
}
