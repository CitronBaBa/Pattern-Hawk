import PatternSymbol from './PatternSymbol'

export interface PatternVisitor {
  visit?: (char: string, symbol: PatternSymbol) => void
  visitDigit?: (digit: number) => void
  visitChar?: (char: string) => void
}

export interface SequenceValidator extends PatternVisitor {
  yield?: () => void
}

export interface ResultValidator {
  validate: (rarsingResult: ParsingResult) => void
}

export class PatternValidationError extends Error {
  type = 'patternValidation'
  subject: string

  constructor(subject: string, message?: string) {
    super(message)
    this.subject = subject
  }
}

export type ParsingResult = {
  numericValue: number
  digits: number[]
  raw: string
}
