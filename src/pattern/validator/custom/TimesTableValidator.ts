import { ParsingResult } from '../../parsing/ParsingResult'
import {
  PatternValidationError,
  ResultValidator,
} from '../../parsing/ParsingValidator'

// Validate multiplication table as 4 digits
export class TimesTableValidator implements ResultValidator {
  validate = ({ digits }: ParsingResult) => {
    const valid =
      digits.length === 4 &&
      digits[0] * digits[1] === digits[2] * 10 + digits[3]
    if (!valid) {
      throw new PatternValidationError('TimesTable', `TimesTable check failed`)
    }
  }
}
