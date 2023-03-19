import { ParsingResult } from '../../parsing/ParsingResult'
import {
  PatternValidationError,
  ResultValidator,
} from '../../parsing/ParsingValidator'

const possibleDaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// Validate month/day combination as 4 digits
export class MMDDValidator implements ResultValidator {
  validate = ({ digits }: ParsingResult) => {
    let valid = false

    if (digits.length === 4) {
      const month = 10 * digits[0] + digits[1]
      if (0 <= month && month <= 12) {
        const day = 10 * digits[2] + digits[3]
        if (0 < day && day <= possibleDaysInMonth[month]) {
          valid = true
        }
      }
    }

    if (!valid) {
      throw new PatternValidationError('MMDD', `MMDD check failed`)
    }
  }
}
