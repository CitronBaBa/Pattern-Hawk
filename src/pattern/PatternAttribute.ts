import { DigitSet, getDigitSetCharLength } from '../util/digitset'

export type PatternAttributeKey =
  | 'base'
  | 'digitSet'
  | 'isSequential'
  | 'min'
  | 'max'
  | `_CUSTOM_${string}`

export type NumberBase = 'decimal' | 'hex'

const defaultMap: Partial<Record<PatternAttributeKey, string>> = {
  base: 'decimal',
  digitSet: 'standard',
}

export default class PatternAttributeMap {
  map: Partial<Record<PatternAttributeKey, string>> = { ...defaultMap }

  constructor()
  constructor(expression: string)
  constructor(expression?: string) {
    if (expression) {
      try {
        this.parseExpression(expression)
      } catch (e: unknown) {
        console.error(`Invalid PatternAttributeMap expression: ${expression}`)
        throw e
      }
    }
  }

  parseExpression = (s: string) => {
    s = s.slice(1, s.length - 1)
    s.split(';')
      .filter((segment) => !!segment)
      .forEach((attrStr) => {
        const [name, value] = attrStr.split(':')
        this.map[name] = value
      })
  }

  getBase = () => this.map.base as NumberBase
  getDigitSet = () => this.map.digitSet as DigitSet
  getDigitLength = () => getDigitSetCharLength(this.getDigitSet())
  getMin = () =>
    this.map.min !== undefined ? parseInt(this.map.min) : undefined
  getMax = () =>
    this.map.max !== undefined ? parseInt(this.map.max) : undefined
  getIsSequential = () => this.map.isSequential === 'true'
  get = (key: PatternAttributeKey) => this.map[key]
}
