import { PatternGroup } from './PatternGroup'

export class PatternDetector {
  patternMap: Record<string, PatternGroup> = {}

  constructor(patternDefinitions: Record<string, string>) {
    for (const [name, expression] of Object.entries(patternDefinitions)) {
      this.patternMap[name] = new PatternGroup(expression)
    }
  }

  public detect(s: string) {
    const result = new Set<string>()
    Object.entries(this.patternMap).forEach(([name, pg]) => {
      if (pg.validateInput(s)) {
        result.add(name)
      }
    })
    return result
  }
}
