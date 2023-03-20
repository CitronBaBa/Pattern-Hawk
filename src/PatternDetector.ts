import { PatternGroup } from './PatternGroup'

export class PatternDetector {
  knownPatterns: Record<string, PatternGroup> = {}

  constructor(patternDefinitions: Record<string, string>) {
    for (const [name, expression] of Object.entries(patternDefinitions)) {
      this.knownPatterns[name] = new PatternGroup(expression)
    }
  }

  public detect(s: string): Set<string> {
    const result = new Set<string>()
    Object.entries(this.knownPatterns).forEach(([name, pg]) => {
      if (pg.validateInput(s)) {
        result.add(name)
      }
    })
    return result
  }

  public detectDotBitName(s: string): Set<string> {
    if (!s.endsWith('.bit')) throw new Error('Input must have a .bit suffix')
    return this.detect(s.slice(0, s.length - 4))
  }
}
