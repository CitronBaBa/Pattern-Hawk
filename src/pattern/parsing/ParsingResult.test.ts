import { ParsingResultRecorder } from './ParsingResult'

describe('Test ParsingResultRecorder', () => {
  it('should record digits', () => {
    const recorder = new ParsingResultRecorder('decimal')
    recorder.visitDigit(0)
    recorder.visitDigit(3)
    const result = recorder.yield()
    expect(result.digits.length).toStrictEqual(2)
    expect(result.digits[0]).toStrictEqual(0)
    expect(result.digits[1]).toStrictEqual(3)
  })

  it('should calculate numeric value in base 10', () => {
    const recorder = new ParsingResultRecorder('decimal')
    recorder.visitDigit(9)
    recorder.visitDigit(3)
    const result = recorder.yield()
    expect(result.numericValue).toStrictEqual(93)
  })
  it('should calculate numeric value in base 16', () => {
    const recorder = new ParsingResultRecorder('hex')
    recorder.visitDigit(9)
    recorder.visitDigit(3)
    const result = recorder.yield()
    expect(result.numericValue).toStrictEqual(147)
  })
})
