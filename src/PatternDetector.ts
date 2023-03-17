import Pattern from './pattern/Pattern'

export class PatternDetector {
  patternMap: Record<string, Pattern> = {}

  constructor(patternDefinitions: Record<string, string>) {
    for (const [name, expression] of Object.entries(patternDefinitions)) {
      this.patternMap[name] = new Pattern(expression)
    }
  }

  public detect(s: string) {
    const result = new Set<string>()
    Object.entries(this.patternMap).forEach(([name, p]) => {
      if (p.validate(s)) {
        result.add(name)
      }
    })
    return result
  }
}
