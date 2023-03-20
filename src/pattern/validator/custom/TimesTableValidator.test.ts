import { ValidationError } from '../../parsing/ParsingValidator'
import { TimesTableValidator } from './TimesTableValidator'

describe('Test TimesTableValidator', () => {
  it('should reject incorrect digits format', () => {
    expect(() =>
      new TimesTableValidator().validate({ digits: [1, 3, 4] }),
    ).toThrow(ValidationError)
    expect(() =>
      new TimesTableValidator().validate({ digits: [1, 3, 4, 6, 7] }),
    ).toThrow(ValidationError)
    expect(() =>
      new TimesTableValidator().validate({ digits: [0, 0, 0, 0] }),
    ).toThrow(ValidationError)
    expect(() =>
      new TimesTableValidator().validate({ digits: [0, 1, 0, 0] }),
    ).toThrow(ValidationError)
  })

  it('should validate against times table', () => {
    expect(() =>
      new TimesTableValidator().validate({ digits: [1, 2, 0, 3] }),
    ).toThrow(ValidationError)
    expect(() =>
      new TimesTableValidator().validate({ digits: [1, 2, 0, 2] }),
    ).not.toThrow(ValidationError)
    expect(() =>
      new TimesTableValidator().validate({ digits: [7, 9, 6, 2] }),
    ).toThrow(ValidationError)
    expect(() =>
      new TimesTableValidator().validate({ digits: [7, 9, 6, 3] }),
    ).not.toThrow(ValidationError)
  })
})
