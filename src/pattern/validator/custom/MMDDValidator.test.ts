import { ValidationError } from '../../parsing/ParsingValidator'
import { MMDDValidator } from './MMDDValidator'

describe('Test TimesTableValidator', () => {
  it('should reject incorrect digits format', () => {
    expect(() => new MMDDValidator().validate({ digits: [1, 3, 4] })).toThrow(
      ValidationError,
    )
    expect(() =>
      new MMDDValidator().validate({ digits: [1, 3, 4, 6, 7] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [0, 0, 0, 0] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [0, 1, 0, 0] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [0, 0, 0, 1] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [1, 3, 0, 1] }),
    ).toThrow(ValidationError)
  })

  it('should validate against days in month', () => {
    expect(() =>
      new MMDDValidator().validate({ digits: [1, 2, 3, 2] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [1, 2, 3, 1] }),
    ).not.toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [1, 1, 3, 1] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [1, 1, 3, 0] }),
    ).not.toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [0, 2, 3, 0] }),
    ).toThrow(ValidationError)
    expect(() =>
      new MMDDValidator().validate({ digits: [0, 2, 2, 9] }),
    ).not.toThrow(ValidationError)
  })
})
