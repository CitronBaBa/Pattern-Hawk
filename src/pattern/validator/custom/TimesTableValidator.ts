import { ParsingResult } from '../../parsing/ParsingResult'
import {
  PatternValidationError,
  ResultValidator,
} from '../../parsing/ParsingValidator'

// Validate multiplication table as 4 digits
export class TimesTableValidator implements ResultValidator {
  validate = ({ digits }: ParsingResult) => {
    let valid = false
    if (
      digits.length === 4 &&
      digits[0] > 0 &&
      digits[1] > 0 &&
      digits[0] * digits[1] === digits[2] * 10 + digits[3]
    ) {
      valid = true
    }

    if (!valid) {
      throw new PatternValidationError('TimesTable', `TimesTable check failed`)
    }
  }
}
