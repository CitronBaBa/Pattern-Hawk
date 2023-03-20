import { ParsingVisitor } from './parsing/ParsingVisitor'
import Pattern from './Pattern'
import { DigitPatternSymbol, digitSymbolWildcard } from './PatternSymbol'

describe('Test Pattern Expression', () => {
  it('should extract attributes', () => {
    expect(
      new Pattern('AAA[base:hex]').getAttributes().getBase(),
    ).toStrictEqual('hex')
    const p = new Pattern('AAA[base:hex;digitSet:CN]')
    expect(p.getAttributes().getBase()).toStrictEqual('hex')
    expect(p.getAttributes().getDigitSet()).toStrictEqual('CN')
  })

  it('should extract symbols', () => {
    const p = new Pattern(`A-B-lid-${digitSymbolWildcard}[base:hex]`)
    expect(p.getSymbols()[0].getType()).toStrictEqual('digit')
    expect(p.getSymbols()[1].getType()).toStrictEqual('static')
    expect(p.getSymbols()[2].getType()).toStrictEqual('digit')
    expect(
      (p.getSymbols()[8] as DigitPatternSymbol).isWildCard(),
    ).toStrictEqual(true)
  })
})

describe('Test Pattern Parse Input', () => {
  it('should parse well formatted input', () => {
    expect(new Pattern('AAA').parseInput('123')).toBe(true)
    expect(new Pattern('qwerABC').parseInput('qwer123')).toBe(true)
    expect(new Pattern('A-A-A').parseInput('1-2-3')).toBe(true)
  })

  it('should parse long emojis (multi-char unicode string) correctly', () => {
    expect(new Pattern('🧑‍🤝‍🧑🧑‍🤝‍🧑AAA').parseInput('🧑‍🤝‍🧑🧑‍🤝‍🧑123')).toBe(true)
    expect(new Pattern('🧑‍🤝‍🧑🧑‍🤝‍🧑AAAA🧑‍🤝‍🧑').parseInput('🧑‍🤝‍🧑🧑‍🤝‍🧑1234🧑‍🤝‍🧑')).toBe(true)
    expect(new Pattern('🧑‍🤝‍🧑🧑‍🤝‍🧑AAA').parseInput('🧑‍🤝‍🧑🧑‍🤝123')).toBe(false)
  })

  it('should parse alternative digitset', () => {
    expect(new Pattern('AAA[digitSet:CN]').parseInput('一二三')).toBe(true)
    expect(new Pattern('A-A-A[digitSet:CN]').parseInput('一-二-三')).toBe(true)
    expect(new Pattern('A-A-A[digitSet:AR]').parseInput('٤-٤-٢')).toBe(true)
    expect(new Pattern('A🧑‍🤝‍🧑A-A[digitSet:CN]').parseInput('一🧑‍🤝‍🧑二-三')).toBe(
      true,
    )
  })

  it('should parse emoji digitset', () => {
    expect(
      new Pattern('AAA[digitSet:FlagEmojiSet0]').parseInput('🇺🇸🇨🇳🇦🇪'),
    ).toBe(true)
    expect(
      new Pattern('A-A-A[digitSet:FlagEmojiSet0]').parseInput('🇺🇸-🇺🇸-🇨🇳'),
    ).toBe(true)
  })

  it('should invoke visitors', () => {
    const p = new Pattern('qwerABC')
    const visitor: ParsingVisitor = {
      visit: jest.fn(),
      visitChar: jest.fn(),
      visitDigit: jest.fn(),
    }
    p.parseInput('qwer123', [visitor])
    expect(visitor.visit).toHaveBeenCalledTimes(7)
    expect(visitor.visitChar).toHaveBeenCalledTimes(4)
    expect(visitor.visitDigit).toHaveBeenCalledTimes(3)
  })
})
