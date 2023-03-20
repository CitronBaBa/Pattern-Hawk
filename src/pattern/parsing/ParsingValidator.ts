import { ParsingResult } from './ParsingResult'
import { ParsingVisitor } from './ParsingVisitor'

export interface SequenceValidator extends ParsingVisitor {
  yield?: () => void
}

export interface ResultValidator {
  validate: (rarsingResult: ParsingResult) => void
}

export class ValidationError extends Error {
  type = 'patternValidation'
  subject: string

  constructor(subject: string, message?: string) {
    super(message)
    this.subject = subject
  }
}
