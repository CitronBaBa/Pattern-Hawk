import { PatternGroup } from './PatternGroup'

describe('Test Pattern Group', () => {
  it('should parse or relationship', () => {
    const pg = new PatternGroup('(AABB)|(john)')
    expect(pg.getChildrenRelation()).toStrictEqual('or')
    expect(pg.validateInput('1144')).toStrictEqual(true)
    expect(pg.validateInput('john')).toStrictEqual(true)
    expect(pg.validateInput('1144john')).toStrictEqual(false)
  })

  it('should parse and relationship', () => {
    const pg = new PatternGroup('(AABB)(john)')
    expect(pg.getChildrenRelation()).toStrictEqual('and')
    expect(pg.validateInput('1144john')).toStrictEqual(true)
    expect(pg.validateInput('1144')).toStrictEqual(false)
    expect(pg.getLength()).toStrictEqual(8)
  })

  it('should handle brackets omitted', () => {
    const pg = new PatternGroup('AABB(john)')
    expect(pg.getChildrenRelation()).toStrictEqual('and')
    expect(pg.validateInput('1144john')).toStrictEqual(true)
    expect(pg.validateInput('john1144')).toStrictEqual(false)

    const pg2 = new PatternGroup('AABB|john')
    expect(pg2.getChildrenRelation()).toStrictEqual('or')
    expect(pg2.validateInput('1144')).toStrictEqual(true)
    expect(pg2.validateInput('john')).toStrictEqual(true)
    expect(pg2.validateInput('1144john')).toStrictEqual(false)
  })

  it('should reject incorrect expression', () => {
    expect(() => new PatternGroup('AABB)')).toThrow()
    expect(() => new PatternGroup('(AABB')).toThrow()
  })
})
